package de.java.BankTutorial.crud;

import java.util.List;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import de.java.BankTutorial.crud.iface.IAccountCRUD;
import de.java.BankTutorial.entity.AbstractAccount;
import de.java.BankTutorial.entity.Bank;
import de.java.BankTutorial.entity.Customer;
import de.java.BankTutorial.entity.SavingsAccount;
import de.java.BankTutorial.qualifier.SchufaChecker;

@Stateless
@LocalBean
public class AccountCRUD extends AbstractCRUDBean<AbstractAccount, EntityManager> implements IAccountCRUD {
	private static final long serialVersionUID = 1L;
	
	@PersistenceContext
	private EntityManager entityManager;
	
	@Override
	public EntityManager getEntityManager() {
		return entityManager;
	}
	
	/**
	 * Erstellt eine neue Instanz
	 * Da keine Instanz eines AbstractAccount erstellt werden kann, wird hier
	 * eine Standardinstanz erstellt
	 * @return neue Instanz
	 */
	@Override
	public AbstractAccount createInstance() {
		return new SavingsAccount();
	}
	
	/**
	 * Speichert ein Objekt in die Datenbank (mit einem Interceptor)
	 * @param instance zu speichernde Instanz
	 */
	@Override
	@SchufaChecker
	public void save(AbstractAccount instance) {
		super.save(instance);
	}
	
	/**
	 * Gibt eine Liste aller Accounts einer Bank zurück
	 * @return Liste
	 */
	@SuppressWarnings("unchecked")
	public List<AbstractAccount> getListByBank(Bank bank) {
		if (bank == null) {
			return null;
		}
		getEntityManager().flush();
		return getEntityManager().createQuery(
				"select OBJECT(o) from AbstractAccount o where o.bank.id = " + bank.getId() + " order by o.id")
				.getResultList();
	}
	
	/**
	 * Gibt eine Liste aller Accounts eines Customer zur�ck
	 * @return Liste
	 */
	@SuppressWarnings("unchecked")
	public List<AbstractAccount> getListByCustomer(Customer customer) {
		if (customer == null) {
			return null;
		}
		getEntityManager().flush();
		return getEntityManager().createQuery(
				"select OBJECT(o) from AbstractAccount o where o.owner.id = " + customer.getId() + " order by o.id")
				.getResultList();
	}
	
	/**
	 * Sucht einen Account anhand der Bankleitzahl und der Kontonummer
	 * @return Liste
	 */
	public AbstractAccount getByNumber(Long accountNumber, Long bankNumber) {
		getEntityManager().flush();
		try {
			return getEntityManager().createQuery(
					"select OBJECT(o) from AbstractAccount o where o.id = " + accountNumber + 
					" and o.bank.sortCode = " + bankNumber + " order by o.id", AbstractAccount.class)
					.getResultList().get(0);
		} catch (Exception e) {
			return null;
		}
	}
}