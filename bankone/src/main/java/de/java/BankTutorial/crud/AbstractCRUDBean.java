package de.java.BankTutorial.crud;

import java.lang.reflect.ParameterizedType;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.persistence.EntityManager;

import de.java.BankTutorial.entity.AbstractAccount;
import de.java.BankTutorial.entity.Bank;
import de.java.BankTutorial.entity.Customer;
import de.java.BankTutorial.entity.IEntityBase;

/**
 * Home-Objekt mit CRUD-Funktionalitaet
 * @author MARCEL SCHOTT
 *
 * @param <T> beliebige Entity-Instanz
 * @param <E> Entity-Manager
 */
public abstract class AbstractCRUDBean<T extends IEntityBase, E extends EntityManager> implements IAbstractCRUDBean<T, E> {
	private static final long serialVersionUID = 1L;

	/**
	 * gibt den Entity-Manager zurueck
	 * @return EntityManager
	 */
	abstract E getEntityManager();
	
	/**
	 * Laed eine Instanz aus der Datenbank
	 * @param id ID der zu ladenden Instanz
	 * @return geladene Instanz
	 */
	@Override
	public T loadInstance(Long id) {
		T loadedInstance = getEntityManager().find(getClassType(), id);
		if (isManaged(loadedInstance)) {
			getEntityManager().refresh(loadedInstance);
			
			if (loadedInstance instanceof Bank) {
				((Bank)loadedInstance).getContacts().size();
				((Bank)loadedInstance).getCustomers().size();
			} else if (loadedInstance.getClass().getSuperclass().getSimpleName().toLowerCase().equals("abstractaccount")) {
				((AbstractAccount)loadedInstance).getStatements().size();
			} else if (loadedInstance instanceof Customer) {
				((Customer)loadedInstance).getBanks().size();
			}
		}
		return loadedInstance;
	}

	/**
	 * Speichert ein Objekt in die Datenbank
	 * @param instance zu speichernde Instanz
	 */
	@Override
	public void save(T instance) {
		if (isManaged(instance)) {
			getEntityManager().merge(instance);
		} else {
			getEntityManager().persist(instance);
		}
	}

	/**
	 * Entfernt ein Objekt aus der Datenbank
	 * @param instance zu loeschende Instanz
	 */
	@Override
	public void delete(T instance) {
		if (isManaged(instance)) {
			instance = loadInstance(instance.getId());
			getEntityManager().remove(getEntityManager().merge(instance));
		}
	}

	/**
	 * Gibt eine Liste aller Objekte zurueck
	 * @return Liste
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<T> getList() {
		getEntityManager().flush();
		return getEntityManager().createQuery(
				"select OBJECT(o) from " + getClassType().getSimpleName() + " o order by o.id")
				.getResultList();
	}
	
	/**
	 * Prueft, ob ein Objekt peristent/managed ist
	 * @param instance zu pruefende Instanz
	 * @return true wenn managed, sonst false true
	 */
	public boolean isManaged(T instance) {
		if (instance != null) {
			if (instance.getId() > 0) {
				return true;
			}
		} 
		return false;
	}

	/**
	 * Erstellt eine neue Instanz
	 * @return neue Instanz
	 */
	@Override
	public T createInstance() {
		try {
			return getClassType().newInstance();
		} catch (Exception e) {
			Logger.getLogger(AbstractCRUDBean.class.getSimpleName()).log(Level.ALL, e.getMessage());
		}
		return null;
	}

	/**
	 * Gibt den Klassentyp der Instanz zurueck
	 * @return Klassentyp
	 */
	@SuppressWarnings("unchecked")
	private Class<T> getClassType() {
		ParameterizedType parameterizedType = (ParameterizedType) getClass().getGenericSuperclass();
		return (Class<T>) parameterizedType.getActualTypeArguments()[0];
	}
}
