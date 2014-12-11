package de.java.BankTutorial.crud.iface;

import java.util.List;
import javax.ejb.Remote;
import javax.persistence.EntityManager;
import de.java.BankTutorial.entity.AbstractAccount;
import de.java.BankTutorial.entity.Bank;
import de.java.BankTutorial.entity.Customer;

@Remote
public interface IAccountCRUD {
	
	public EntityManager getEntityManager();
	
	/**
	 * Erstellt eine neue Instanz
	 * Da keine Instanz eines AbstractAccount erstellt werden kann, wird hier
	 * eine Standardinstanz erstellt
	 * @return neue Instanz
	 */
	public AbstractAccount createInstance();
	
	/**
	 * Speichert ein Objekt in die Datenbank (mit einem Interceptor)
	 * @param instance zu speichernde Instanz
	 */
	public void save(AbstractAccount instance);
	
	/**
	 * Gibt eine Liste aller Accounts einer Bank zurueck
	 * @return Liste
	 */
	public List<AbstractAccount> getListByBank(Bank bank);
	
	/**
	 * Gibt eine Liste aller Accounts eines Customer zurueck
	 * @return Liste
	 */
	public List<AbstractAccount> getListByCustomer(Customer customer);
	
	/**
	 * Sucht einen Account anhand der Bankleitzahl und der Kontonummer
	 * @return Liste
	 */
	public AbstractAccount getByNumber(Long accountNumber, Long bankNumber);
	
	/**
	 * Laed eine Instanz aus der Datenbank.
	 * @param id ID der zu ladenden Instanz
	 */
	public AbstractAccount loadInstance(Long id);
	
	/**
	 * Entfernt ein Objekt aus der Datenbank
	 * @param instance zu loeschende Instanz
	 */
	public void delete(AbstractAccount instance);

	/**
	 * Gibt alle Objekte des Typs T zurueck.
	 * @return Liste aller Objekte
	 */
	public List<AbstractAccount> getList();
	
	/**
	 * Prueft, ob ein Objekt peristent/managed ist
	 * @param instance zu pruefende Instanz
	 * @return true wenn managed, sonst false true
	 */
	public boolean isManaged(AbstractAccount instance);
}