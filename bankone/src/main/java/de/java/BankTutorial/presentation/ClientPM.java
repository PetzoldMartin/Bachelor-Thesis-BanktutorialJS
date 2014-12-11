package de.java.BankTutorial.presentation;


import java.io.Serializable;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ConversationScoped;
import javax.inject.Inject;
import javax.inject.Named;

import de.java.BankTutorial.crud.BankCRUD;
import de.java.BankTutorial.crud.CustomerCRUD;
import de.java.BankTutorial.entity.Bank;
import de.java.BankTutorial.entity.Customer;
import de.java.BankTutorial.presentation.service.TransactionResult;

/**
 * Zugriffs-Objekt für Bankfilialen
 * @author MARCEL SCHOTT
 *
 */
@ConversationScoped
@Named
public class ClientPM extends AbstractPMBean implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Bank bank; 				   // Bank, der die Kunden zugeordnet sind
	private Customer instance; 		   // Kunde zum Bearbeiten
	
	@Inject
	private CustomerCRUD customerCrud; // CRUD-Objekt für Kunden
	
	@Inject
	private BankCRUD bankCrud;		   // CRUD-Objekt für Banken

	/**
	 * Initialisierungsmethode: Erstellt eine neue Instanz
	 */
	@PostConstruct
	public void reset() {
		instance = new Customer();
	}
	
	public Bank getBank() {
		return bank;
	}
	
	public void setBank(Bank bank) {
		this.bank = bank;
	}

	public Customer getInstance() {
		return instance;
	}

	/**
	 * Startet die Conversation zum Bearbeiten der Bankkunden
	 * @param bankId ID der Bank
	 * @return Stringwert ob Bank geladen wurde
	 */
	public String startWithBank(Long bankId) {
		beginConversation();
		reset();
		loadBankInstance(bankId);
		if (bank != null) {
			return "client";
		}
		return "";
	}
	
	/**
	 * Läd eine Instanz der Bank aus der Datenbank
	 * @param bankId ID der Bank
	 */
	public void loadBankInstance(Long bankId) {
		bank = bankCrud.loadInstance(bankId);
	}
	
	/**
	 * Läd eine Instanz des Kunden aus der Datenbank
	 * @param id ID des Customer
	 */
	public void loadInstance(Long id) {
		instance = customerCrud.loadInstance(id);
		if (instance != null) {
			transactionResultService.setTransactionResult(TransactionResult.LOADED);
		}
	}
	
	/**
	 * Entfernt ein den Kunden von der Bank
	 */
	public void removeFromBank() {
		customerCrud.removeFromBank(bank, instance);
		transactionResultService.setTransactionResult(TransactionResult.REMOVED);
		reset();
	}
	
	/**
	 * Prüft, ob der Customer peristent/managed ist
	 * @return true wenn managed, sonst false true
	 */
	public boolean isManaged() {
		return customerCrud.isManaged(instance);
	}
}