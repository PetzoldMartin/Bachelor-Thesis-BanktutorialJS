package de.java.BankTutorial.presentation;

import java.io.Serializable;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ConversationScoped;
import javax.inject.Inject;
import javax.inject.Named;

import de.java.BankTutorial.crud.CustomerCRUD;
import de.java.BankTutorial.entity.Address;
import de.java.BankTutorial.entity.Contact;
import de.java.BankTutorial.entity.Customer;

/**
 * Zugriffs-Objekt für Personen
 * @author MARCEL SCHOTT
 *
 */
@ConversationScoped
@Named
public class CustomerPM extends AbstractCRUDPMBean<Customer, CustomerCRUD> implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Inject 
	CustomerCRUD crud; // CRUD-Objekt für Personen
	
	@Override
	public CustomerCRUD getCRUD() {
		return crud;
	}
	
	/**
	 * Initialisierungsmethode: Erstellt eine neue Instanz inkl dem dazugehörigen Contactobjekt + Adresse
	 */
	@PostConstruct
	public void reset() {
		super.reset();
		instance.setContact(new Contact());
		instance.getContact().setAddress(new Address());
	}
}
