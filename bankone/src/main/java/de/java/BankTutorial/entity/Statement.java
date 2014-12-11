package de.java.BankTutorial.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * repräsentiert einen Kontoauszug bzw. den Log einer Transaktion
 * 
 */
@Entity
public class Statement implements IEntityBase, Serializable, Comparable<Statement> {
	private static final long serialVersionUID = 1L;
	
	// Primärschlüssel
	@Id @GeneratedValue 
	private long id;
	
	// Datum der Transaktion
	private Date date;
	
	// Resultat der Transaktion in Textform
	private String content;
		
	// -- generated constructors --------------------------------------------
	/**
	 * Default-Konstruktor
	 */
	public Statement() {
	}
	
	// -- generated association + attribute accessors -----------------------
	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
	public long getId() {
		return id;
	}
	
	public void setId(long id) {
		this.id = id;
	}
	
	// -- generated method stubs for implementations + derived attributes ---
	/**
	 * Datum des Kontoauszugs festlegen
	 */
	public void initiateDate() {
		date = new Date(new Date().getTime());
	}
		
	// -- generated code of other cartridges --------------------------------
	public boolean equals( Object obj ) 
	{ 
	  if ( obj instanceof Statement ) { 
		  Statement st = (Statement) obj; 
	    return (this.id == st.getId());   
	  } 
	  return super.equals( obj ); 
	}

	/**
	 * Sortierung mit frühestem Datum zuerst
	 * @param otherStatement Statement zum Vergleichen
	 */
	@Override
	public int compareTo(Statement otherStatement) {
        if (otherStatement.getDate() == null && this.getDate() == null) {
            return 0;
        }
        if (this.getDate() == null) {
            return 1;
        }
        if (otherStatement.getDate() == null) {
            return -1;
        }
        return this.getDate().compareTo(otherStatement.getDate());
	}

}
