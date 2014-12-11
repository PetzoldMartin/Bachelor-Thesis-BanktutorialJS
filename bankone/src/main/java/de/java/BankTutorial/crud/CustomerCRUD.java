package de.java.BankTutorial.crud;

import java.util.List;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.hibernate.Hibernate;
import de.java.BankTutorial.crud.iface.ICustomerCRUD;
import de.java.BankTutorial.entity.AbstractAccount;
import de.java.BankTutorial.entity.Bank;
import de.java.BankTutorial.entity.Customer;

@Stateless
@LocalBean
public class CustomerCRUD extends AbstractCRUDBean<Customer, EntityManager> implements ICustomerCRUD {
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
	public void delete(Customer instance) {
		if (isManaged(instance)) {
			instance = loadInstance(instance.getId());
			
			for (AbstractAccount account : accountCRUD.getListByCustomer(instance)) {
				entityManager.remove(entityManager.merge(account));
			}
			
			getEntityManager().remove(getEntityManager().merge(instance));
		}		
	}
	
	/**
	 * Entfernt ein den Kunden von der Bank und löscht alle zugehörigen Accounts
	 * @param customer Customer
	 */
	public void removeFromBank(Bank bank, Customer customer) {
		bank = entityManager.find(Bank.class, bank.getId());
		customer = loadInstance(customer.getId());
		
		bank.removeFromCustomers(customer);
		entityManager.merge(bank);
		
		for (AbstractAccount account : accountCRUD.getListByCustomer(customer)) {
			if (account.getBank().getId() == bank.getId()) {
			entityManager.remove(entityManager.merge(account));
			}
		}
	}
	
	@Override
	public List<Customer> getList() {
		getEntityManager().flush();
		@SuppressWarnings("unchecked")
		List<Customer> o = getEntityManager().createQuery("select OBJECT(o) from Customer o order by o.id").getResultList();
		
		for (Customer c : o) {
			Hibernate.initialize(c.getBanks());
		}
		
		return o;
	}
}