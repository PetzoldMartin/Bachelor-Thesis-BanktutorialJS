package de.java.BankTutorial.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlInlineBinaryData;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 * repräsentiert eine Adresse
 * 
 */
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
@Entity
public class Address implements Serializable {
	private static final long serialVersionUID = 1L;
	
	// Primärschlüssel
	@Id @GeneratedValue 
	private long id;
	
	// State
	private String street;
	
	// Hausnummer
	private String houseNumber;
	
	// Postleitzahl
	private String zipCode;
	
	// Ort
	private String city;
	
	// Kontaktdaten
	@OneToOne(mappedBy="address")
	@XmlTransient
	private Contact contact;
	
	// -- generated constructors --------------------------------------------
	/**
	 * Default-Konstruktor
	 */
	public Address() {
	}
	
	// -- generated association + attribute accessors -----------------------
	public String getStreet() {
		return street;
	}
	
	public void setStreet(String street) {
		this.street = street;
	}
	
	public String getHouseNumber() {
		return houseNumber;
	}
	
	public void setHouseNumber(String houseNumber) {
		this.houseNumber = houseNumber;
	}
	
	public String getZipCode() {
		return zipCode;
	}
	
	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}
	
	public String getCity() {
		return city;
	}
	
	public void setCity(String city) {
		this.city = city;
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
	
	// -- generated code of other cartridges --------------------------------
	public boolean equals( Object obj ) 
	{ 
	  if ( obj instanceof Address) { 
		  Address ad = (Address) obj; 
	    return (this.id == ad.getId());   
	  } 
	  return super.equals( obj ); 
	}

}
