package de.java.BankTutorial.remote.iface;

import javax.ejb.Remote;
import javax.ejb.Stateless;

import de.java.BankTutorial.entity.AbstractAccount;
import de.java.BankTutorial.entity.Bank;
import de.java.BankTutorial.entity.Contact;
import de.java.BankTutorial.entity.Customer;
import de.java.BankTutorial.presentation.service.TransactionResult;

/**
 * Dieser Bean bietet Methoden zum Ausfuehren von sessionabhaengigen
 * Aktionen, deren Ergebnisse zurueckerwartet werden. 
 * @author Eric Worm
 */
@Stateless
@Remote
public interface ISessionScopedBeanHandler {
	
	/**
	 * Fuehre eine Geldeinzahlung aus und liefere das Ergebnis der Transaction zurueck.
	 * @param account - Das Konto, auf dem das Geld eingezahlt werden soll.
	 * @param balance - Menge an Geld, die eingezahlt werden soll.
	 * @return Ergebnis der Transaction.
	 */
	public TransactionResult deposit(AbstractAccount account, float balance);
	
	/**
	 * Fuehre eine Geldauszahlung aus und liefere das Ergebnis der Transaction zurueck.
	 * @param account - Das Konto, von dem das Geld abgehoben werden soll.
	 * @param balance - Menge an Geld, die ausgezahlt werden soll.
	 * @return Ergebnis der Transaction.
	 */
	public TransactionResult withdraw(AbstractAccount account, float balance);
	
	/**
	 * Ueberweise Geld zwischen zwei Konten und liefere das Ergebnis der Transaction zurueck.
	 * @param senderAccount - Das Konto, von dem das Geld abgehen soll.
	 * @param receiverAccount - Das Konto, auf dem das Geld eingehen soll.
	 * @param balance - Menge an Geld, die ueberwiesen werden soll.
	 * @return Ergebnis der Transaction.
	 */
	public TransactionResult transfer(AbstractAccount senderAccount, AbstractAccount receiverAccount, float balance);
	
	/**
	 * Speichere eine Bank in der Datenbank und liefere das Ergebnis der Transaction zurueck.
	 * @param bank - die Bank.
	 * @return Ergebnis der Transaction.
	 */
	public TransactionResult saveBank(Bank bank);
	
	/**
	 * Entferne eine Bank aus der Datenbank und liefere das Ergebnis der Transaction zurueck.
	 * @param bank - die Bank.
	 * @return Ergebnis der Transaction.
	 */
	public TransactionResult deleteBank(Bank bank);
	
	/**
	 * Speichere einen Kunden in der Datenbank und liefere das Ergebnis der Transaction zurueck.
	 * @param customer - der Kunde.
	 * @return Ergebnis der Transaction.
	 */
	public TransactionResult saveCustomer(Customer customer);
	
	/**
	 * Entferne einen Kunden aus der Datenbank und liefere das Ergebnis der Transaction zurueck.
	 * @param customer - der Kunde.
	 * @return Ergebnis der Transaction.
	 */
	public TransactionResult deleteCustomer(Customer customer);
	
	/**
	 * Speichere ein Konto in der Datenbank und liefere das Ergebnis der Transaction zurueck.
	 * @param account - das Konto.
	 * @param owner - der Besitzer des Kontos.
	 * @param bank - die Bank, bei der das Konto registriert ist.
	 * @return Ergebnis der Transaction.
	 */
	public TransactionResult saveAccount(AbstractAccount account, Customer owner, Bank bank);
	
	/**
	 * Entferne ein Konto aus der Datenbank und liefere das Ergebnis der Transaction zurueck.
	 * @param account - das Konto.
	 * @return Ergebnis der Transaction.
	 */
	public TransactionResult deleteAccount(AbstractAccount account);
	
	/**
	 * Entferne einen Bankkontakt aus der Datenbank und liefere das Ergebnis der Transaction zurueck.
	 * @param contact - der Kontakt.
	 * @param bank - die Bank zu der der Kontakt gehoert.
	 * @return Ergebnis der Transaction.
	 */
	public TransactionResult deleteBankContact(Contact contact, Bank bank);
}
