package de.java.BankTutorial.entity;

import java.io.Serializable;

import javax.persistence.Entity;

/**
 * Sparkonto mit einer festen Zinsrate von 2,75% unter langer Zinsperiode.
 * Die Bank überweist die Zinsen alle 5 Minuten.
 * 
 */
@Entity
public class SavingsAccount extends AbstractAccount implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * Default-Konstruktor
	 */
	public SavingsAccount() {
		setInterestPeriod(5*60);
		setInterestRate((float)2.75);
	}
}
