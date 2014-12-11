package de.java.BankTutorial.service;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

import javax.annotation.Resource;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.ejb.Timeout;
import javax.ejb.Timer;
import javax.ejb.TimerConfig;
import javax.ejb.TimerService;
import javax.inject.Inject;

import de.java.BankTutorial.crud.AccountCRUD;
import de.java.BankTutorial.crud.StatementCRUD;
import de.java.BankTutorial.entity.AbstractAccount;
import de.java.BankTutorial.qualifier.StatementGenerator;
import de.java.BankTutorial.service.iface.IInterestService;

/**
 * Service inklusive Timer, der in gewissen Abständen eine Zinsberechnung durchführt
 * @author MARCEL SCHOTT
 *
 */
@Stateless
@LocalBean
public class InterestService implements IInterestService, Serializable {
	private static final long serialVersionUID = 1L;

	@Resource
	private TimerService timerService;
	
	@Inject
	AccountCRUD accountCRUD;
	
	@Inject
	StatementCRUD statementCRUD;
	
	public static final int TIME = 1000;
	
	/**
	 * Startet die Timer anhand der Periode in den Accounts
	 */
	public void startTimers() {
		List<AbstractAccount> list = accountCRUD.getList();
		for (AbstractAccount account : list) {
			Long period = account.getInterestPeriod() * TIME;
			timerService.createIntervalTimer(0, period, new TimerConfig(account.getId(), false));
		}
	}
	
	/**
	 * Beendet alle laufenden Timer
	 */
	public void stopTimers() {
		Collection<Timer> allTimers = timerService.getTimers();
		for (Timer timer: allTimers) {
			timer.cancel();
		}
	}
	
	/**
	 * Prüft, ob Timer am Laufen sind
	 * @return
	 */
	public boolean isTimerActive() {
		Collection<Timer> allTimers = timerService.getTimers();
		if (allTimers.size() > 0) {
			return true;
		}
		return false;
	}
	
	/**
	 * Fährt die Timermethode aus (Zinsüberweisung und Kontoauszug)
	 * @param timer Timer
	 */
	@Timeout
	public void tick(Timer timer) {
		AbstractAccount account = accountCRUD.loadInstance((Long)timer.getInfo());
		float balance = (account.getInterestRate()/100) * account.getBalance();
		depositInterest(account, balance);
		
//		// Betrag Formatieren
//	    NumberFormat numberFormat = new DecimalFormat("0.00");
//	    numberFormat.setRoundingMode(RoundingMode.DOWN);
//		
//	    // Kontoauszug erstellen
//		Statement statement = new Statement();
//		statement.initiateDate();
//		
//		if (newBalance >= 0) { 
//			statement.setContent("<<< +" + numberFormat.format(newBalance - account.getBalance()) + "� (Zinsen)");
//		} else {
//			statement.setContent(">>> -" + numberFormat.format(-(newBalance - account.getBalance())) + "� (Zinsen)");
//		}
//		
//		account.setBalance(newBalance);
//		
//		statementCRUD.save(statement);
//		account.insertInStatements(statement);
//		accountCRUD.save(account);
	}
	
	@StatementGenerator
	public void depositInterest(AbstractAccount account, float balance) {
		account.setBalance(account.getBalance() + balance);
		accountCRUD.save(account);
	}
}
