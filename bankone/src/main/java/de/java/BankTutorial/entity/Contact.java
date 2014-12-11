package de.java.BankTutorial.entity;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

/**
 * repräsentiert die Kontaktdaten einer Person oder einer Bank
 * 
 */
@Entity
public class Contact implements IEntityBase, Serializable {
	private static final long serialVersionUID = 1L;
	
	// Primärschlüssel
	@Id @GeneratedValue 
	private long id;
		
	// Telefonnummer
	private String phone;
	
	// Mobilfunknummer
	private String mobilePhone;
	
	// Faxnummer
	private String telefax;
	
	// Email-Adresse
	private String email;
	
	// Adressdaten
	@OneToOne(cascade=CascadeType.ALL)
	private Address address;

		
	// -- generated constructors --------------------------------------------
	/**
	 * Default-Konstruktor
	 */
	public Contact() {
	}
	
	// -- generated association + attribute accessors -----------------------
	public String getPhone() {
		return phone;
	}
	
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	public String getMobilePhone() {
		return mobilePhone;
	}
	
	public void setMobilePhone(String mobilePhone) {
		this.mobilePhone = mobilePhone;
	}
	
	public String getTelefax() {
		return telefax;
	}
	
	public void setTelefax(String telefax) {
		this.telefax = telefax;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public long getId() {
		return id;
	}
	
	public void setId(long id) {
		this.id = id;
	}
	
	public Address getAddress() {
		return address;
	}
	
	public void setAddress(Address address) {
		this.address = address;
	}
	
	// -- generated code of other cartridges --------------------------------
	public boolean equals( Object obj ) 
	{ 
	  if ( obj instanceof Contact) { 
		  Contact co = (Contact) obj; 
	    return (this.id == co.getId());   
	  } 
	  return super.equals( obj ); 
	}


}
