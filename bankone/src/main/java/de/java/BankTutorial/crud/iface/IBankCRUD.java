package de.java.BankTutorial.crud.iface;

import java.util.List;
import javax.ejb.Remote;
import javax.persistence.EntityManager;
import de.java.BankTutorial.entity.Bank;

@Remote
public interface IBankCRUD {

	public EntityManager getEntityManager();

	/**
	 * Laed eine Instanz aus der Datenbank.
	 * @param id ID der zu ladenden Instanz
	 */
	public Bank loadInstance(Long id);
	
	/**
	 * Speichert ein Objekt in die Datenbank
	 * @param instance zu speichernde Instanz
	 */
	public void save(Bank instance);
	
	/**
	 * Entfernt ein Objekt aus der Datenbank
	 * @param instance zu loeschende Instanz
	 */
	public void delete(Bank instance);

	/**
	 * Gibt alle Objekte des Typs T zurueck.
	 * @return Liste aller Objekte
	 */
	public List<Bank> getList();
	
	/**
	 * Prueft, ob ein Objekt peristent/managed ist
	 * @param instance zu pruefende Instanz
	 * @return true wenn managed, sonst false true
	 */
	public boolean isManaged(Bank instance);
	
	/**
	 * Erstellt eine neue Instanz
	 * @return neue Instanz
	 */
	public Bank createInstance();
}