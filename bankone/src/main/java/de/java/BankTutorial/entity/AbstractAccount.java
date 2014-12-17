package de.java.BankTutorial.entity;

import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * abstrakte Klasse für ein Konto
 * 
 */
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
@Entity
public abstract class AbstractAccount implements IEntityBase, Serializable {
	private static final long serialVersionUID = 1L;

	// Primärschlüssel
	@Id @GeneratedValue 
	private long id;
	
	// Kontostand
	private float balance;
	
	// Zinssatz in Prozent
	private float interestRate;
	
	// Zinsperiode
	private long interestPeriod;
	
	//Accountype
	private String accountType;
	
	// zugehörige Bank
	@ManyToOne
	private Bank bank;
	
	// zugehöriger Kunde
	@ManyToOne 
	private Customer owner;
	
	// Kontoauszüge
	@OneToMany(cascade = CascadeType.REMOVE)
	private  List<Statement> statements = new LinkedList<Statement>();
	
	// -- generated constructors --------------------------------------------
	/**
	 * Default-Konstruktor
	 */
	public AbstractAccount() {
		accountType=this.getClass().getSimpleName();
	}
	
	// -- generated association + attribute accessors -----------------------
	public float getBalance() {
		return balance;
	}
	
	public void setBalance(float balance) {
		this.balance = balance;
	}
	
	public float getInterestRate() {
		return interestRate;
	}
	
	public void setInterestRate(float interestRate) {
		this.interestRate = interestRate;
	}
	
	public long getInterestPeriod() {
		return interestPeriod;
	}
	
	public void setInterestPeriod(long interestPeriod) {
		this.interestPeriod = interestPeriod;
	}
	
	public long getId() {
		return id;
	}
	
	public void setId(long id) {
		this.id = id;
	}
		
	public Bank getBank() {
		return bank;
	}
	
	public void setBank(Bank bank) {
		this.bank = bank;
	}
	
	public Customer getOwner() {
		return owner;
	}
	
	public void setOwner(Customer owner) {
		this.owner = owner;
	}
	
	public List<Statement> getStatements() {
		return this.statements;
	}
	
	/**
	 * fügt einen Kontoauszug hinzu
	 * @param statement Kontoauszug
	 */
	public void insertInStatements(Statement statement) {
		if (this.statements.contains(statement)) {
			return;
		}
		this.statements.add(statement);
	}
	
	/**
	 * entfernt einen Kontoauszug
	 * @param statement
	 */
	public void removeFromStatements(Statement statement) {
		if (!this.statements.contains(statement)) {
			return;
		}
		this.statements.remove(statement);
	}
	
	/**
	 * gibt den AccountTyp zurück
	 * @return AccountTyp
	 */
	public String getAccountType() {
		accountType=this.getClass().getSimpleName();
		return this.getClass().getSimpleName();
	}
	
	// -- generated code of other cartridges --------------------------------
	
	public boolean equals( Object obj ) 
	{ 
		if(this == obj) {  
            return true;
        }
        if(!(obj instanceof AbstractAccount)) {  
            return false;
        }
        AbstractAccount acc = (AbstractAccount) obj; 
	    return (this.id == acc.getId());    
	}
}
