package de.java.BankTutorial.service.iface;

import javax.ejb.Remote;
import de.java.BankTutorial.entity.AbstractAccount;
import de.java.BankTutorial.entity.Statement;

/**
 * Service, welcher Statements erstellt
 * @author MARCEL SCHOTT
 *
 */
@Remote
public interface IStatementService {
	
	/**
	 * erstellt einen Kontoauszug
	 * @param account Account
	 * @param statement Kontoauszug
	 */
	public void generateStatement(AbstractAccount account, Statement statement);
}
