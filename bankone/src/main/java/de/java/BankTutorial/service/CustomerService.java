package de.java.BankTutorial.service;

import java.util.List;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;

import de.java.BankTutorial.crud.AccountCRUD;
import de.java.BankTutorial.entity.AbstractAccount;
import de.java.BankTutorial.entity.Customer;
import de.java.BankTutorial.service.iface.ICustomerService;

/**
 * Service-Klasse mit speziellen Funktionen bzgl. der Customer
 * @author MARCEL SCHOTT
 *
 */
@Stateless
@LocalBean
public class CustomerService implements ICustomerService {
	@Inject
	AccountCRUD accountCRUD;   // CRUD-Objekt für Konten
	
	/**
	 * Gibt den Betrag aus den ein Customer insgesamt hat
	 * @param customer Person
	 * @return Betrag aller Konten
	 */
	public float getMoneyOfACustomer(Customer customer) {
		List<AbstractAccount> accountList = accountCRUD.getListByCustomer(customer);
		float money = 0;
		for(AbstractAccount account: accountList) {
			money += account.getBalance();
		}
		return money;
	}
}
