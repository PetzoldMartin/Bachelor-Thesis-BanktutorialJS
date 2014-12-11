package de.java.BankTutorial.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Tagesgeldkonto mit variabler Zinsrate durch mögliche Zinsentwicklung.
 * Für die erste Zinsrate kann ein Satz von 3,5% verwendet werden.
 * Die Bank überweist die Zinsen jede Minute.
 * 
 */
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
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
