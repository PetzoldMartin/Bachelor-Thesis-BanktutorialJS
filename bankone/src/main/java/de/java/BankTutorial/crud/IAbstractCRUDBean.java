package de.java.BankTutorial.crud;

import java.io.Serializable;
import java.util.List;

import javax.persistence.EntityManager;

import de.java.BankTutorial.entity.IEntityBase;

/**
 * Interface fuer das Home-Objekt
 * @author MARCEL SCHOTT
 * 
 * @param <T> beliebige Entity-Instanz
 * @param <E> Entity-Manager
 */
public interface IAbstractCRUDBean<T extends IEntityBase, E extends EntityManager> extends Serializable {
	/**
	 * Laed eine Instanz aus der Datenbank
	 * @param id ID der zu ladenden Instanz
	 */
	public T loadInstance(Long id);
	
	/**
	 * Speichert ein Objekt in die Datenbank
	 * @param instance zu speichernde Instanz
	 */
	public void save(T instance);
	
	/**
	 * Entfernt ein Objekt aus der Datenbank
	 * @param instance zu loeschende Instanz
	 */
	public void delete(T instance);

	/**
	 * Gibt alle Objekte des Typs T zurueck.
	 * @return Liste aller Objekte
	 */
	public List<T> getList();
	
	/**
	 * Prueft, ob ein Objekt peristent/managed ist
	 * @param instance zu pruefende Instanz
	 * @return true wenn managed, sonst false true
	 */
	public boolean isManaged(T instance);
	
	/**
	 * Erstellt eine neue Instanz
	 * @return neue Instanz
	 */
	public T createInstance();
}
