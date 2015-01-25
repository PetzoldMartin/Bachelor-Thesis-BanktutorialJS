package de.java.BankTutorial.entity;

import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 * repräsentiert eine Person (bspw. einen Kunden einer Bank)
 * 
 */
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
@Entity
public class Customer implements IEntityBase, Serializable {
	private static final long serialVersionUID = 1L;
	
	// Primärschlüssel
	@Id @GeneratedValue 
	private long id;

	// Vorname
	private String firstname;
	
	// Nachname
	private String surname;

	// Kontaktadresse
	@OneToOne(cascade=CascadeType.ALL)
	private Contact contact;
	
	// Banken bei der die Person Kunde ist
	@ManyToMany(mappedBy="customers", cascade=CascadeType.ALL)
	@XmlTransient
	private List<Bank> banks = new LinkedList<Bank>();
	
	// -- generated constructors --------------------------------------------
	/**
	 * Default-Konstruktor
	 */
	public Customer() {
	}
	
	// -- generated association + attribute accessors -----------------------
	public String getFirstname() {
		return firstname;
	}
	
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	
	public String getSurname() {
		return surname;
	}
	
	public void setSurname(String surname) {
		this.surname = surname;
	}
	
	public long getId() {
		return id;
	}
	
	public void setId(long id) {
		this.id = id;
	}
	
	public Contact getContact() {
		return contact;
	}
	
	public void setContact(Contact contact) {
		this.contact = contact;
	}
			
	public List<Bank> getBanks() {
		return this.banks;
		
	}
	
	/**
	 * fügt eine Bank hinzu
	 * @param bank Bank
	 */
	public void insertInBanks(Bank bank) {
		if (this.banks.contains(bank)) {
			return;
		}
		this.banks.add(bank);
		if (!bank.getCustomers().contains(this)) {
			bank.insertInCustomers(this);
		}
	}
	
	/**
	 * entfernt eine Bank
	 * @param bank Bank
	 */
	public void removeFromBanks(Bank bank) {
		if (!this.banks.contains(bank)) {
			return;
		}
		this.banks.remove(bank);
		if (bank.getCustomers().contains(this)) {
			bank.removeFromCustomers(this);
		}
	}
	
	// -- generated code of other cartridges --------------------------------
	public boolean equals( Object obj ) 
	{ 
		if(this == obj) {  
            return true;
        }
        if(!(obj instanceof Customer)) {  
            return false;
        }
		  Customer cu = (Customer) obj; 
	    return (this.id == cu.getId());   
	}
}
