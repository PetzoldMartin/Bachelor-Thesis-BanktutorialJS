package de.java.BankTutorial.service.iface;

import javax.ejb.Remote;
import javax.ejb.Timeout;
import javax.ejb.Timer;

import de.java.BankTutorial.entity.AbstractAccount;
import de.java.BankTutorial.qualifier.StatementGenerator;

/**
 * Service inklusive Timer, der in gewissen Abstaenden eine Zinsberechnung durchfuehrt
 * @author MARCEL SCHOTT
 *
 */
@Remote
public interface IInterestService {
	
	/**
	 * Startet die Timer anhand der Periode in den Accounts
	 */
	public void startTimers();
	
	/**
	 * Beendet alle laufenden Timer
	 */
	public void stopTimers();
	
	/**
	 * Prueft, ob Timer am Laufen sind
	 * @return
	 */
	public boolean isTimerActive();
	
	/**
	 * Fuehrt die Timermethode aus (Zinsueberweisung und Kontoauszug)
	 * @param timer Timer
	 */
	@Timeout
	public void tick(Timer timer);
	
	@StatementGenerator
	public void depositInterest(AbstractAccount account, float balance);
}
