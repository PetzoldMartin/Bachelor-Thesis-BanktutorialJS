package de.java.BankTutorial.presentation;


import java.io.Serializable;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ConversationScoped;
import javax.inject.Inject;
import javax.inject.Named;

import de.java.BankTutorial.crud.BankCRUD;
import de.java.BankTutorial.crud.ContactCRUD;
import de.java.BankTutorial.entity.Address;
import de.java.BankTutorial.entity.Bank;
import de.java.BankTutorial.entity.Contact;
import de.java.BankTutorial.presentation.service.TransactionResult;

/**
 * Zugriffs-Objekt für Bankfilialen
 * @author MARCEL SCHOTT
 *
 */
@ConversationScoped
@Named
public class BranchPM extends AbstractPMBean implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Bank bank;				 // Bank, der die Filialen zu zugeordnet sind
	private Contact instance;		 // Filiale zum Bearbeiten
	
	@Inject
	private ContactCRUD contactCrud; // CRUD-Objekt für Filialen
	
	@Inject
	private BankCRUD bankCrud;		 // CRUD-Objekt für Banken

	/**
	 * Initialisierungsmethode: Erstellt eine neue Instanz
	 */
	@PostConstruct
	public void reset() {
		instance = new Contact();
		instance.setAddress(new Address());
	}
	
	public Bank getBank() {
		return bank;
	}

	public void setBank(Bank bank) {
		this.bank = bank;
	}
	
	public Contact getInstance() {
		return instance;
	}

	/**
	 * Startet die Conversation zum Bearbeiten der Bankfilialen
	 * @param bankId ID der Bank
	 * @return Stringwert ob Bank geladen wurde
	 */
	public String startWithBank(Long bankId) {
		beginConversation();
		reset();
		loadBankInstance(bankId);
		if (bank != null) {
			return "branch";
		}
		return "";
	}
	
	/**
	 * L�d eine Instanz der Bank aus der Datenbank
	 * @param bankId ID der Bank
	 */
	public void loadBankInstance(Long bankId) {
		bank = bankCrud.loadInstance(bankId);
	}
	
	/**
	 * L�d eine Instanz der Filiale aus der Datenbank
	 * @param id ID der Filiale
	 */
	public void loadInstance(Long id) {
		instance = contactCrud.loadInstance(id);
		if (instance != null) {
			transactionResultService.setTransactionResult(TransactionResult.LOADED);
		}
	}
	
	/**
	 * Speichert ein Objekt in die Datenbank
	 */		
	public void save() {
		if (!isManaged()) {
			bank.insertInContacts(instance);
			bankCrud.save(bank);
		} else {
			contactCrud.save(instance);
		}
		transactionResultService.setTransactionResult(TransactionResult.SAVED);
		reset();
	}
	
	/**
	 * Entfernt ein Objekt aus der Datenbank
	 */
	public void delete() {
		bank.removeFromContacts(instance);
		bankCrud.save(bank);
		contactCrud.delete(instance);
		transactionResultService.setTransactionResult(TransactionResult.REMOVED);
		reset();
	}
	
	/**
	 * Pr�ft, ob der Contact peristent/managed ist
	 * @return true wenn managed, sonst false true
	 */
	public boolean isManaged() {
		return contactCrud.isManaged(instance);
	}
}