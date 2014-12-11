package de.java.BankTutorial.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Sparkonto mit einer festen Zinsrate von 2,75% unter langer Zinsperiode.
 * Die Bank überweist die Zinsen alle 5 Minuten.
 * 
 */
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
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
