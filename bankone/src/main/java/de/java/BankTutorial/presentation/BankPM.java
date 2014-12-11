package de.java.BankTutorial.presentation;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import javax.enterprise.context.ConversationScoped;
import javax.inject.Inject;
import javax.inject.Named;

import de.java.BankTutorial.crud.BankCRUD;
import de.java.BankTutorial.crud.ContactCRUD;
import de.java.BankTutorial.entity.Address;
import de.java.BankTutorial.entity.Bank;
import de.java.BankTutorial.entity.Contact;
import de.java.BankTutorial.qualifier.RandomSortCode;

/**
 * Zugriffs-Objekt für Banken
 * @author MARCEL SCHOTT
 *
 */
@ConversationScoped
@Named
public class BankPM extends AbstractCRUDPMBean<Bank, BankCRUD> implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Inject 
	private BankCRUD crud; // CRUD-Objekt für Banken
	
	@Inject
	private ContactCRUD contactCRUD;
	
	@Inject
	@RandomSortCode
	private int sortCode;
	
	private List<Address> kontakt = new LinkedList<Address>();
	
	public BankCRUD getCRUD() {
		return crud;
	}
	
	/**
	 * Setzt vor dem Neuanlegen der Bank einen SortCode von einem Producer
	 */
	@Override
	public void save() {
		if (!crud.isManaged(instance)) {
			instance.setSortCode(sortCode);
		}
		super.save();
	}
	
	public String changeBank(long id) {
//		initConversation();
//		setId(id);
		loadInstance(id);
//		this.setSelectBG(0);
//		this.setSelectBG(getInstance().getBankgroup().getId());
		return "changeBank";
	}
	
	public String newBank() {
//		initConversation();
//		setId(id);
		createInstance();
//		this.setSelectBG(0);
//		this.setSelectBG(getInstance().getBankgroup().getId());
		return "newBank";
	}
	
	public List<Address> getKontakt() {
		for (Address l: crud.getKontakt(getInstance().getId()))
				{System.out.println("list = " +l.getCity());}
		kontakt = crud.getKontakt(getInstance().getId());
		return kontakt;

	}
	
	
}