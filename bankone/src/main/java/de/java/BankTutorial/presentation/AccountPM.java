package de.java.BankTutorial.presentation;


import java.io.Serializable;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ConversationScoped;
import javax.inject.Inject;
import javax.inject.Named;

import de.java.BankTutorial.crud.AccountCRUD;
import de.java.BankTutorial.crud.BankCRUD;
import de.java.BankTutorial.crud.CustomerCRUD;
import de.java.BankTutorial.entity.AbstractAccount;
import de.java.BankTutorial.entity.Bank;
import de.java.BankTutorial.entity.CheckingAccount;
import de.java.BankTutorial.entity.Customer;
import de.java.BankTutorial.entity.FlexibleSavingsAccount;
import de.java.BankTutorial.entity.SavingsAccount;
import de.java.BankTutorial.presentation.service.TransactionResult;

/**
 * Zugriffs-Objekt für Accounts der Banken
 * @author MARCEL SCHOTT
 *
 */
@ConversationScoped
@Named
public class AccountPM extends AbstractPMBean implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Bank bank;					// Bank, der die Accounts zugewiesen sind
	private Customer customer;			// Kunde, der dem Konto zugewiesen wird
	private AbstractAccount instance; 	// Kontoinstanz zum Bearbeiten
    private boolean loadBox;            // sollen die Auswahlboxen gleich geladen werden?
	
	@Inject
	private CustomerCRUD customerCrud;  // CRUD-Objekt für Kunden
	
	@Inject
	private BankCRUD bankCrud;			// CRUD-Objekt für Banken
	
	@Inject
	private AccountCRUD accountCrud;	// CRUD-Objekt für Konten

	/**
	 * Initialisierungsmethode: Erstellt eine neue Instanz
	 */
	@PostConstruct
	protected void reset() {
		instance = null;
		customer = null;
	}
	
	public Bank getBank() {
		return bank;
	}
	
	public Customer getCustomer() {
		return customer;
	}
	
	public void setBank(Bank bank) {
		this.bank = bank;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public AbstractAccount getInstance() {
		return instance;
	}
	
	public void setInstance(AbstractAccount instance) {
		this.instance = instance;
	}
	
    public boolean isLoadBox() {
        return loadBox;
    }

    public void setLoadBox(boolean loadBox) {
        this.loadBox = loadBox;
    }
	
	/**
	 * Erstellt ein Sparkonto
	 */
	public void createSavingsAccount() {
		instance = new SavingsAccount();
	}
	
	/**
	 * Erstellt ein Tagesgeldkonto
	 */
	public void createFlexibleSavingsAccount() {
		instance = new FlexibleSavingsAccount();
	}
	
	/**
	 * Erstellt ein Girokonto
	 */
	public void createCheckingAccount() {
		instance = new CheckingAccount();
	}
	
	/**
	 * Startet die Conversation zum Bearbeiten der Accounts mittels einer Bank
	 * @param bankId ID der Bank
	 * @return String wenn Bank geladen wurde
	 */
	public String startWithBank(Long bankId) {
		beginConversation();
		reset();
		loadBank(bankId);
		if (bank != null) {
			return "account";
		}
		return "";
	}
	
	/**
	 * Startet die Conversation zum Bearbeiten der Accounts mittels eines Customer
	 * @param customerId ID des Customer
	 * @return String wenn Customer geladen wurde
	 */
	public String startWithCustomer(Long customerId) {
		beginConversation();
		reset();
		loadCustomer(customerId);
		if (customer != null) {
			return "customeraccount";
		}
		return "";
	}
	
	/**
	 * Startet die Conversation zum Bearbeiten der Accounts mittels einer Bank
	 * @param bankId ID der Bank
	 * @param customerId ID der 
	 * @return String wenn Bank geladen wurde
	 */
	public String startWithBankAndCustomer(Long bankId, Long customerId) {
		beginConversation();
		reset();
		loadBank(bankId);
		loadCustomer(customerId);
		if (bank != null && customer != null) {
			return "account";
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
			customer = instance.getOwner();
			bank = instance.getBank();
			transactionResultService.setTransactionResult(TransactionResult.LOADED);
		}
	}
	
	/**
	 * L�d eine Instanz der Bank aus der Datenbank
	 */
	public void loadBank(Long id) {
		bank = bankCrud.loadInstance(id);
	}
	
	/**
	 * L�d eine Instanz der Person aus der Datenbank
	 */
	public void loadCustomer(Long id) {
		customer = customerCrud.loadInstance(id);
	}
	
	/**
	 * Gibt eine Liste aller ACcounts einer Bank zur�ck
	 * @return Liste mit Banken
	 */
	public List<AbstractAccount> getListByBank() {
		return accountCrud.getListByBank(bank);
	}
	
	/**
	 * Gibt eine Liste aller Accounts eines Customers zur�ck
	 * @return Liste mit Banken
	 */
	public List<AbstractAccount> getListByCustomer() {
		return accountCrud.getListByCustomer(customer);
	}
	
	/**
	 * Gibt eine Liste aller Personen zur�ck
	 * @return Liste mit Personen
	 */
	public List<Customer> getCustomerList() {
		return customerCrud.getList();
	}
	
	/**
	 * Speichert ein Objekt in die Datenbank
	 */		
	public void save() {
		if (!isManaged()) {
			instance.setOwner(customer);
			instance.setBank(bank);
			accountCrud.save(instance);
			bank.insertInCustomers(customer);
			bankCrud.save(bank);
		} else {
			accountCrud.save(instance);
		}
		
		if (transactionResultService.getTransactionResult() != TransactionResult.SCHUFA_FAILED) {
			transactionResultService.setTransactionResult(TransactionResult.SAVED);
			reset();
		}
	}

	/**
	 * Entfernt ein Objekt aus der Datenbank
	 */
	public void delete() {
		accountCrud.delete(instance);	
		transactionResultService.setTransactionResult(TransactionResult.REMOVED);
		reset();
	}
	
	/**
	 * Pr�ft, ob der Account peristent/managed ist
	 * @return true wenn managed, sonst false true
	 */
	public boolean isManaged() {
		return accountCrud.isManaged(instance);
	}
}
