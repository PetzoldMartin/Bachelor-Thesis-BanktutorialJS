package de.java.BankTutorial.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Girokonto für tägliche Transaktionen mit einer niedrigen Zinsrate von 0,75%. 
 * Die Bank überweist die Zinsen alle 3 Minuten.
 * 
 */
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
@Entity
public class CheckingAccount extends AbstractAccount implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * Default-Konstruktor
	 */
	public CheckingAccount() {
		setInterestPeriod(3*60);
		setInterestRate((float)0.75);
	}
}
