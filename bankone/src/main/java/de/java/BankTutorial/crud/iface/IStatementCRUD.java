package de.java.BankTutorial.crud.iface;

import java.util.List;
import javax.ejb.Remote;
import javax.persistence.EntityManager;
import de.java.BankTutorial.entity.Statement;

@Remote
public interface IStatementCRUD {

	public EntityManager getEntityManager();
	
	/**
	 * Laed eine Instanz aus der Datenbank.
	 * @param id ID der zu ladenden Instanz
	 */
	public Statement loadInstance(Long id);
	
	/**
	 * Speichert ein Objekt in die Datenbank
	 * @param instance zu speichernde Instanz
	 */
	public void save(Statement instance);
	
	/**
	 * Entfernt ein Objekt aus der Datenbank
	 * @param instance zu loeschende Instanz
	 */
	public void delete(Statement instance);

	/**
	 * Gibt alle Objekte des Typs T zurueck.
	 * @return Liste aller Objekte
	 */
	public List<Statement> getList();
	
	/**
	 * Prueft, ob ein Objekt peristent/managed ist
	 * @param instance zu pruefende Instanz
	 * @return true wenn managed, sonst false true
	 */
	public boolean isManaged(Statement instance);
	
	/**
	 * Erstellt eine neue Instanz
	 * @return neue Instanz
	 */
	public Statement createInstance();
}