package de.java.BankTutorial.service.iface;

import javax.ejb.Remote;
import de.java.BankTutorial.entity.Customer;

/**
 * Service-Klasse mit speziellen Funktionen bzgl. der Customer
 * @author MARCEL SCHOTT
 *
 */
@Remote
public interface ICustomerService {

	/**
	 * Gibt den Betrag aus den ein Customer insgesamt hat
	 * @param customer Person
	 * @return Betrag aller Konten
	 */
	public float getMoneyOfACustomer(Customer customer);
}
