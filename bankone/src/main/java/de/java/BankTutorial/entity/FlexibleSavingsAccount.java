package de.java.BankTutorial.entity;

import java.io.Serializable;

import javax.persistence.Entity;

/**
 * Tagesgeldkonto mit variabler Zinsrate durch mögliche Zinsentwicklung.
 * Für die erste Zinsrate kann ein Satz von 3,5% verwendet werden.
 * Die Bank überweist die Zinsen jede Minute.
 * 
 */
@Entity
public class FlexibleSavingsAccount extends AbstractAccount implements Serializable {
	private static final long serialVersionUID = 1L;
	
	/**
	 * Default-Konstruktor
	 */
	public FlexibleSavingsAccount() {
		setInterestPeriod(60);
		setInterestRate((float)3.5);
	}

}
