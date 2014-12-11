package de.java.BankTutorial.crud.iface;

import java.util.List;
import javax.ejb.Remote;
import javax.persistence.EntityManager;
import de.java.BankTutorial.entity.Bank;
import de.java.BankTutorial.entity.Customer;

@Remote
public interface ICustomerCRUD {
		
	public EntityManager getEntityManager();
	
	/**
	 * Entfernt ein Objekt aus der Datenbank und loescht alle zugehoerigen Accounts
	 * @param instance zu speichernde Instanz
	 */
	public void delete(Customer instance);
	
	/**
	 * Entfernt ein den Kunden von der Bank und loescht alle zugehoerigen Accounts
	 * @param customer Customer
	 */
	public void removeFromBank(Bank bank, Customer customer);
	
	/**
	 * Laed eine Instanz aus der Datenbank.
	 * @param id ID der zu ladenden Instanz
	 */
	public Customer loadInstance(Long id);
	
	/**
	 * Speichert ein Objekt in die Datenbank
	 * @param instance zu speichernde Instanz
	 */
	public void save(Customer instance);

	/**
	 * Gibt alle Objekte des Typs T zurueck.
	 * @return Liste aller Objekte
	 */
	public List<Customer> getList();
	
	/**
	 * Prueft, ob ein Objekt peristent/managed ist
	 * @param instance zu pruefende Instanz
	 * @return true wenn managed, sonst false true
	 */
	public boolean isManaged(Customer instance);
	
	/**
	 * Erstellt eine neue Instanz
	 * @return neue Instanz
	 */
	public Customer createInstance();
}