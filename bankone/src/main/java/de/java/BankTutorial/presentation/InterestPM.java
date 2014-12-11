package de.java.BankTutorial.presentation;

import java.io.Serializable;

import javax.enterprise.context.ConversationScoped;
import javax.inject.Inject;
import javax.inject.Named;

import de.java.BankTutorial.service.InterestService;

/**
 * Zugriffs-Objekt für Accounts der Banken
 * @author MARCEL SCHOTT
 *
 */
@ConversationScoped
@Named
public class InterestPM extends AbstractPMBean implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Inject
	private InterestService interestService;	// ServiceObjekt für Zinsen

	/**
	 * Startet die Zinsüberweisung
	 */
	public void startInterest() {
		interestService.startTimers();
	}
	
	/**
	 * Stoppt die Zinsüberweisung
	 */
	public void stopInterest() {
		interestService.stopTimers();
	}
	
	/**
	 * Prüft ob Zinsüberweisung im Gange
	 * @return ist eine Zinsüberweisung im Gange?
	 */
	public boolean isInterestActive() {
		return interestService.isTimerActive();
	}
}
