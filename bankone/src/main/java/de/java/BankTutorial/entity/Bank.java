package de.java.BankTutorial.entity;

import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 * repräsentiert eine Bank
 * 
 */
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
@Entity
public class Bank implements IEntityBase, Serializable {
	private static final long serialVersionUID = 1L;
	
	// Primärschlüssel
	@Id @GeneratedValue 
	private long id;
	
	// Name der Bank
	private String name;
	
	// SortCode
	private int sortCode;
	
	// Kontaktdaten der Bank
	@ManyToMany(cascade = {CascadeType.ALL})
	private List<Contact> contacts = new LinkedList<Contact>();
	
	// Kunden
	@ManyToMany(cascade = {CascadeType.MERGE, CascadeType.REFRESH})
	@XmlTransient
	private List<Customer> customers = new LinkedList<Customer>();
	
	// -- generated constructors --------------------------------------------
	/**
	 * Default-Konstruktor
	 */
	public Bank() {
	}
	
	// -- generated association + attribute accessors -----------------------
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public int getSortCode() {
		return sortCode;
	}
	
	public void setSortCode(int sortCode) {
		this.sortCode = sortCode;
	}
	
	public long getId() {
		return id;
	}
	
	public void setId(long id) {
		this.id = id;
	}
	
	public List<Contact> getContacts() {
		return this.contacts;
	
	}
	
	public void insertInContacts(Contact contact) {
		if (this.contacts.contains(contact)) {
			return;
		}
		this.contacts.add(contact);
	}
	
	public void removeFromContacts(Contact contact) {
		if (!this.contacts.contains(contact)) {
			return;
		}
		this.contacts.remove(contact);
	}
	
	public List<Customer> getCustomers() {
		return this.customers;
	}
	
	/**
	 * fügt einen Kunden hinzu
	 * @param customer Kunde
	 */
	public void insertInCustomers(Customer customer) {
		if (this.customers.contains(customer)) {
			return;
		}
		this.customers.add(customer);
		if (!customer.getBanks().contains(this)) {
			customer.insertInBanks(this);
		}
	}
	
	/**
	 * entfernt einen Kunden
	 * @param customer Kunde
	 */
	public void removeFromCustomers(Customer customer) {
		if (!this.customers.contains(customer)) {
			return;
		}
		this.customers.remove(customer);
		if (customer.getBanks().contains(this)) {
			customer.removeFromBanks(this);
		}
	}
	
	// -- generated code of other cartridges --------------------------------
	
	public boolean equals( Object obj ) 
	{ 
		if(this == obj) {  
            return true;
        }
        if(!(obj instanceof Bank)) {  
            return false;
        }
		  Bank ba = (Bank) obj; 
	    return (this.id == ba.getId());   
	}
}
