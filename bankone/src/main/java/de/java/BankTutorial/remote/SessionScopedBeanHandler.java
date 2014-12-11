package de.java.BankTutorial.remote;

import java.util.HashMap;
import java.util.Map;

import javax.ejb.Stateless;
import javax.inject.Inject;

import org.jboss.weld.context.bound.Bound;
import org.jboss.weld.context.bound.BoundConversationContext;
import org.jboss.weld.context.bound.BoundRequest;
import org.jboss.weld.context.bound.BoundSessionContext;
import org.jboss.weld.context.bound.MutableBoundRequest;

import de.java.BankTutorial.crud.BankCRUD;
import de.java.BankTutorial.crud.CustomerCRUD;
import de.java.BankTutorial.entity.AbstractAccount;
import de.java.BankTutorial.entity.Bank;
import de.java.BankTutorial.entity.Contact;
import de.java.BankTutorial.entity.Customer;
import de.java.BankTutorial.presentation.AccountPM;
import de.java.BankTutorial.presentation.BankPM;
import de.java.BankTutorial.presentation.BranchPM;
import de.java.BankTutorial.presentation.CustomerPM;
import de.java.BankTutorial.presentation.TransferPM;
import de.java.BankTutorial.presentation.service.TransactionResult;
import de.java.BankTutorial.presentation.service.TransactionResultService;
import de.java.BankTutorial.remote.iface.ISessionScopedBeanHandler;

/**
 * Dieser Bean bietet Methoden zum Ausfuehren von sessionabhaengigen
 * Aktionen, deren Ergebnisse zurueckerwartet werden. 
 * @author Eric Worm
 */
@Stateless
public class SessionScopedBeanHandler implements ISessionScopedBeanHandler {

	/** Variable zum anlegen einer Session (fuer den TransactionResultService) */
	@Inject private BoundSessionContext sessionContext;
	/** Variable zum anlegen einer Conversation (fuer die Praesentation-Beans). */
	@Inject @Bound private BoundConversationContext conversationContext;
	private BoundRequest boundRequest;
	
	@Inject private TransactionResultService transactionResultService;
	
	@Inject private BankCRUD bankCRUD;
	@Inject private CustomerCRUD customerCRUD;
	
	/* verwende die Praesentation-Beans, da diese bereits das Setzen des TransactionResults uebernehmen. */
	@Inject private TransferPM transferPM;
	@Inject private BankPM bankPM;
	@Inject private CustomerPM customerPM;
	@Inject private AccountPM accountPM;
	@Inject private BranchPM branchPM;
	
	/**
	 * Fuehre eine Geldeinzahlung aus und liefere das Ergebnis der Transaction zurueck.
	 * @param account - Das Konto, auf dem das Geld eingezahlt werden soll.
	 * @param balance - Menge an Geld, die eingezahlt werden soll.
	 * @return Ergebnis der Transaction.
	 */
	public TransactionResult deposit(AbstractAccount account, float balance) {
		startSession();
		transferPM.setInstance(account);
		transferPM.setBalance(balance);
		transferPM.deposit();
		return finishTransaction();
	}
	
	/**
	 * Fuehre eine Geldauszahlung aus und liefere das Ergebnis der Transaction zurueck.
	 * @param account - Das Konto, von dem das Geld abgehoben werden soll.
	 * @param balance - Menge an Geld, die ausgezahlt werden soll.
	 * @return Ergebnis der Transaction.
	 */
	public TransactionResult withdraw(AbstractAccount account, float balance) {
		startSession();
		transferPM.setInstance(account);
		transferPM.setBalance(balance);
		transferPM.withdraw();
		return finishTransaction();
	}
	
	/**
	 * Ueberweise Geld zwischen zwei Konten und liefere das Ergebnis der Transaction zurueck.
	 * @param senderAccount - Das Konto, von dem das Geld abgehen soll.
	 * @param receiverAccount - Das Konto, auf dem das Geld eingehen soll.
	 * @param balance - Menge an Geld, die ueberwiesen werden soll.
	 * @return Ergebnis der Transaction.
	 */
	public TransactionResult transfer(AbstractAccount senderAccount, AbstractAccount receiverAccount, float balance) {
		startSession();
		transferPM.setInstance(senderAccount);
		transferPM.setAccountNumber(receiverAccount.getId());
		transferPM.setBankNumber(receiverAccount.getBank().getSortCode());
		transferPM.setBalance(balance);
		transferPM.transfer();
		return finishTransaction();
	}
	
	/**
	 * Speichere eine Bank in der Datenbank und liefere das Ergebnis der Transaction zurueck.
	 * @param bank - die Bank.
	 * @return Ergebnis der Transaction.
	 */
	public TransactionResult saveBank(Bank bank) {
		startSession();
		/** Entitaet speichern und "haendisch" das Ergebnis setzen. Diese Variante wurde von BankPM (AbstractCRUDPMBean) uebernommen. */
		bankCRUD.save(bank);
		transactionResultService.setTransactionResult(TransactionResult.SAVED);
		return finishTransaction();
	}
	
	/**
	 * Entferne eine Bank aus der Datenbank und liefere das Ergebnis der Transaction zurueck.
	 * @param bank - die Bank.
	 * @return Ergebnis der Transaction.
	 */
	public TransactionResult deleteBank(Bank bank) {
		startSession();
		bankPM.loadInstance(bank.getId());
		bankPM.delete();
		return finishTransaction();
	}
	
	/**
	 * Speichere einen Kunden in der Datenbank und liefere das Ergebnis der Transaction zurueck.
	 * @param customer - der Kunde.
	 * @return Ergebnis der Transaction.
	 */
	public TransactionResult saveCustomer(Customer customer) {
		startSession();
		/** Entitaet speichern und "haendisch" das Ergebnis setzen. Diese Variante wurde von CustomerPM (AbstractCRUDPMBean) uebernommen. */
		customerCRUD.save(customer);
		transactionResultService.setTransactionResult(TransactionResult.SAVED);
		return finishTransaction();
	}

	/**
	 * Entferne einen Kunden aus der Datenbank und liefere das Ergebnis der Transaction zurueck.
	 * @param customer - der Kunde.
	 * @return Ergebnis der Transaction.
	 */
	public TransactionResult deleteCustomer(Customer customer) {
		startSession();
		customerPM.loadInstance(customer.getId());
		customerPM.delete();
		return finishTransaction();
	}
	
	/**
	 * Speichere ein Konto in der Datenbank und liefere das Ergebnis der Transaction zurueck.
	 * @param account - das Konto.
	 * @param owner - der Besitzer des Kontos.
	 * @param bank - die Bank, bei der das Konto registriert ist.
	 * @return Ergebnis der Transaction.
	 */
	public TransactionResult saveAccount(AbstractAccount account, Customer owner, Bank bank) {
		startSession();
		accountPM.setInstance(account);
		accountPM.setCustomer(owner);
		accountPM.setBank(bank);
		accountPM.save();
		return finishTransaction();
	}
	
	/**
	 * Entferne ein Konto aus der Datenbank und liefere das Ergebnis der Transaction zurueck.
	 * @param account - das Konto.
	 * @return Ergebnis der Transaction.
	 */
	public TransactionResult deleteAccount(AbstractAccount account) {
		startSession();
		accountPM.setInstance(account);
		accountPM.delete();
		return finishTransaction();
	}
	
	/**
	 * Entferne einen Bankkontakt aus der Datenbank und liefere das Ergebnis der Transaction zurueck.
	 * @param contact - der Kontakt.
	 * @param bank - die Bank zu der der Kontakt gehoert.
	 * @return Ergebnis der Transaction.
	 */
	public TransactionResult deleteBankContact(Contact contact, Bank bank) {
		startSession();
		branchPM.loadInstance(contact.getId());
		branchPM.loadBankInstance(bank.getId());
		branchPM.delete();
		return finishTransaction();
	}
	
	/** Starte eine Session. */
	private void startSession() {
		Map<String,Object> session = new HashMap<String,Object>();
		sessionContext.associate(session);
		sessionContext.activate();
        
		Map<String, Object> request = new HashMap<String, Object>();
		boundRequest = new MutableBoundRequest(request, session);
        
		conversationContext.associate(boundRequest);
		conversationContext.activate();
	}
	
	/** Beende die Session. */
	private void stopSession() {
		sessionContext.invalidate();
		sessionContext.deactivate();
        
		conversationContext.invalidate();
		conversationContext.deactivate();
	}
	
	/**
	 * Beende die Session und liefere das letzte Ergebnis einer Transaction zurueck
	 * @return letztes Ergebnis einer Transaction.
	 */
	private TransactionResult finishTransaction() {
		TransactionResult result = transactionResultService.getTransactionResult();
		stopSession();
		return result;
	}
	
}
