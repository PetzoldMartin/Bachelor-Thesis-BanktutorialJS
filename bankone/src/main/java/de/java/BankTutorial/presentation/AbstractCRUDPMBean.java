package de.java.BankTutorial.presentation;


import java.util.List;

import javax.annotation.PostConstruct;

import de.java.BankTutorial.crud.AbstractCRUDBean;
import de.java.BankTutorial.entity.IEntityBase;
import de.java.BankTutorial.presentation.service.TransactionResult;

/**
 * Abstraktes Zugriffs-Objekt
 * @author MARCEL SCHOTT
 *
 */
@SuppressWarnings("rawtypes")
public abstract class AbstractCRUDPMBean<T extends IEntityBase, H extends AbstractCRUDBean> extends AbstractPMBean{
	protected T instance; // Instanz zum Bearbeiten
	
	/**
	 * Initialisierungsmethode: Erstellt eine neue Instanz
	 */
	@PostConstruct
	public void reset() {
		createInstance();
	}
	
	/**
	 * gibt die jeweilige Objekt aus der Datenschicht zurück
	 * @return HomeBean
	 */
	abstract H getCRUD();
	
	/**
	 * Gibt die aktuelle Instanz zur�ck
	 * @return Instanz
	 */
	public T getInstance() {
		return instance;
	}

	/**
	 * Erstellt eine neue Instanz
	 */
	@SuppressWarnings("unchecked")
	public void createInstance() {
		instance = (T)getCRUD().createInstance();
		endConversation();
	}
	
	/**
	 * Läd eine Instanz aus der Datenbank
	 * @param id ID der Instanz
	 */
	@SuppressWarnings("unchecked")
	public void loadInstance(Long id) {
		beginConversation();
		instance = (T)getCRUD().loadInstance(id);
		if (instance != null) {
			transactionResultService.setTransactionResult(TransactionResult.LOADED);
		}
	}
		
	/**
	 * Speichert ein Objekt in die Datenbank
	 */		
	@SuppressWarnings("unchecked")
	public void save() {
		getCRUD().save(instance);
		transactionResultService.setTransactionResult(TransactionResult.SAVED);
		reset();
	}
	
	/**
	 * Entfernt ein Objekt aus der Datenbank
	 */
	@SuppressWarnings("unchecked")
	public void delete() {
		getCRUD().delete(instance);
		transactionResultService.setTransactionResult(TransactionResult.REMOVED);
		reset();
	}
	
	/**
	 * Gibt eine Liste aller Objekte zurück
	 * @return Liste
	 */
	@SuppressWarnings("unchecked")
	public List<T> getList() {
		return getCRUD().getList();
	}
	
	/**
	 * Prüft, ob ein Objekt persistent/managed ist
	 * @return true wenn managed, sonst false true
	 */
	@SuppressWarnings("unchecked")
	public boolean isManaged() {
		return getCRUD().isManaged(instance);
	}
}
