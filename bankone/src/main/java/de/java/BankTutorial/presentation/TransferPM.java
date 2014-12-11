package de.java.BankTutorial.presentation;


import java.io.Serializable;
import java.util.Collections;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ConversationScoped;
import javax.inject.Inject;
import javax.inject.Named;
import javax.validation.constraints.Digits;
import javax.validation.constraints.Min;

import de.java.BankTutorial.crud.AccountCRUD;
import de.java.BankTutorial.entity.AbstractAccount;
import de.java.BankTutorial.entity.Statement;
import de.java.BankTutorial.presentation.service.TransactionResult;
import de.java.BankTutorial.presentation.service.TransferMode;
import de.java.BankTutorial.service.TransferService;

/**
 * Zugriffs-Objekt f�r Transaktionen
 * @author MARCEL SCHOTT
 *
 */
@ConversationScoped
@Named
public class TransferPM extends AbstractPMBean implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private AbstractAccount instance;			// Kontoinstance zum Bearbeiten
	private AbstractAccount otherInstance;		// Zielkonto f�r die �berweisung
	
	private TransferMode transferMode;			// Transfermodus (�berweisung, Auszahlung, Einzahlung)
	private long bankNumber, accountNumber;		// Bankleitzahl und Kontonummer
	
	@Digits(fraction=2, integer=10)
	@Min(value=0)
	private float balance;						// Betrag f�r den Transfer
	
	@Inject
	private AccountCRUD accountCrud;			// CRUD-Objekt f�r Accounts
	
	@Inject
	private TransferService transferService;	// Service-Objekt f�r die Transferfunktionen
	

	/**
	 * Initialisierungsmethode: Setzt Variablen zur�ck
	 */
	@PostConstruct
	public void reset() {
		otherInstance = null;
		balance = 0;
		bankNumber = 0;
		accountNumber = 0;
	}
	
	public AbstractAccount getInstance() {
		return instance;
	}
	
	public void setInstance(AbstractAccount instance) {
		this.instance = instance;
	}
	
	public AbstractAccount getOtherInstance() {
		return otherInstance;
	}

	public void setOtherInstance(AbstractAccount otherInstance) {
		this.otherInstance = otherInstance;
	}

	public float getBalance() {
		return balance;
	}

	public void setBalance(float balance) {
		this.balance = balance;
	}
	
	public long getBankNumber() {
		return bankNumber;
	}

	public void setBankNumber(long bankNumber) {
		this.bankNumber = bankNumber;
	}

	public long getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(long accountNumber) {
		this.accountNumber = accountNumber;
	}

	public TransferMode getTransferMode() {
		return transferMode;
	}
	
	public void resetTransferMode() {
		transferMode = null;
	}

	public void startDeposit() {
		transferMode = TransferMode.DEPOSIT;
		reset();
	}
	
	public void startWithdraw() {
		transferMode = TransferMode.WITHDRAW;
		reset();
	}
	
	public void startTransfer() {
		transferMode = TransferMode.TRANSFER;
		reset();
	}
	
	/**
	 * Startet eine Einzahlung 
	 * @param accountId ID des Accounts
	 * @return String wenn Bank geladen wurde
	 */
	public String startDeposit(Long accountId) {
		startDeposit();
		return startWithAccount(accountId);
	}
	
	/**
	 * Startet eine Auszahlung 
	 * @param accountId ID des Accounts
	 * @return String wenn Bank geladen wurde
	 */
	public String startWithdraw(Long accountId) {
		startWithdraw();
		return startWithAccount(accountId);
	}
	
	/**
	 * Startet eine �berweisung 
	 * @param accountId ID des Accounts
	 * @return String wenn Bank geladen wurde
	 */
	public String startTransfer(Long accountId) {
		startTransfer();
		return startWithAccount(accountId);
	}
	
	/**
	 * Startet die Conversation f�r eine Transaktion mittels eines Accounts
	 * @param accountId ID der Bank
	 * @return String wenn Bank geladen wurde
	 */
	public String startWithAccount(Long accountId) {
		beginConversation();
		loadInstance(accountId);
		if (instance != null) {
			return "transfer";
		}
		return "";
	}
	
	/**
	 * L�d eine Instanz des Kontos aus der Datenbank
	 * @param id ID des Accounts
	 */
	public void loadInstance(Long id) {
		instance = accountCrud.loadInstance(id);
		if (instance != null) {
			transactionResultService.setTransactionResult(TransactionResult.LOADED);
		}
	}
	
	/**
	 * Zahlt einen Betrag auf ein Konto ein
	 */
	public void deposit() {
		transferService.deposit(instance, balance);
		transactionResultService.setTransactionResult(TransactionResult.SAVED);
		reset();
	}
	
	/**
	 * Zahlt einen Betrag von einem Konto aus
	 */
	public void withdraw() {
		transferService.withdraw(instance, balance);
		transactionResultService.setTransactionResult(TransactionResult.SAVED);
		reset();
	}
	

	/**
	 * Sucht das Konto zum �berweisen f�r die eigentliche �berweisung
	 */
	public void transfer() {
		otherInstance = accountCrud.getByNumber(accountNumber, bankNumber);
		if (otherInstance == null) {
			transactionResultService.setTransactionResult(TransactionResult.NOT_SAVED);
		} else {
			transferService.transfer(instance, otherInstance, balance);
			transactionResultService.setTransactionResult(TransactionResult.SAVED);
		}
		reset();
	}
	
	/**
	 * Pr�ft, ob der Account peristent/managed ist
	 * @return true wenn managed, sonst false true
	 */
	public boolean isManaged() {
		return accountCrud.isManaged(instance);
	}
	
	/**
	 * Gibt die Liste nach Datum absteigend sortiert aus
	 * @return
	 */
	public List<Statement> getStatementList() {
		List<Statement> statements = instance.getStatements(); 
		Collections.sort(statements);
		Collections.reverse(statements);
		return statements;
	}
}
