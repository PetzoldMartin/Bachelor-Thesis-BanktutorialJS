package de.java.BankTutorial.crud;

import java.util.LinkedList;
import java.util.List;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.Hibernate;

import de.java.BankTutorial.crud.iface.IBankCRUD;
import de.java.BankTutorial.entity.AbstractAccount;
import de.java.BankTutorial.entity.Address;
import de.java.BankTutorial.entity.Bank;
import de.java.BankTutorial.entity.Contact;
import de.java.BankTutorial.entity.Customer;

@Stateless
@LocalBean
public class BankCRUD extends AbstractCRUDBean<Bank, EntityManager> implements IBankCRUD {
	private static final long serialVersionUID = 1L;
	
	@PersistenceContext
	private EntityManager entityManager;

	@Inject
	private AccountCRUD accountCRUD;
	
	
	
	@Override
	public EntityManager getEntityManager() {
		return entityManager;
	}
	
	/**
	 * Entfernt ein Objekt aus der Datenbank und löscht alle zugehörigen Accounts
	 * @param instance zu speichernde Instanz
	 */
	@Override
	public void delete(Bank instance) {
		if (isManaged(instance)) {
			instance = loadInstance(instance.getId());
			
			for (AbstractAccount account : accountCRUD.getListByBank(instance)) {
				entityManager.remove(entityManager.merge(account));
			}
			
			getEntityManager().remove(getEntityManager().merge(instance));
		}		
	}
	
	@Override
	public List<Bank> getList() {
		getEntityManager().flush();
		@SuppressWarnings("unchecked")
		List<Bank> o = getEntityManager().createQuery("select OBJECT(o) from Bank o order by o.id").getResultList();
		
		for (Bank b : o) {
			Hibernate.initialize(b.getContacts());
			Hibernate.initialize(b.getCustomers());
		}
		
		return o;
	}
	
	public List<Address> getKontakt(long id) {
LinkedList<Address> kontakt = new LinkedList<Address>();
		Bank bank = getEntityManager().find(Bank.class, id);
		for (Contact c : bank.getContacts()) {
			System.out.println("contac= " + c.getAddress().getCity());
			kontakt.add(c.getAddress());
		}
		
		return kontakt;
	}
	
	
}