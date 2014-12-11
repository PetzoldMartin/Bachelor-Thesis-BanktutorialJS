package de.java.BankTutorial.service;

import javax.ejb.LocalBean;
import javax.ejb.Stateful;
import javax.inject.Inject;

import de.java.BankTutorial.crud.AccountCRUD;
import de.java.BankTutorial.crud.StatementCRUD;
import de.java.BankTutorial.entity.AbstractAccount;
import de.java.BankTutorial.entity.Statement;
import de.java.BankTutorial.service.iface.IStatementService;

/**
 * Service, welcher Statements erstellt
 * @author MARCEL SCHOTT
 *
 */
@Stateful
@LocalBean
public class StatementService implements IStatementService {
	@Inject
	AccountCRUD accountCRUD; // CRUD-Objekt für Konten
	@Inject
	StatementCRUD statementCRUD; // CRUD-Objekt für Kontoauszüge
	
	/**
	 * erstellt einen Kontoauszug
	 * @param account Account
	 * @param statement Kontoauszug
	 */
	public void generateStatement(AbstractAccount account, Statement statement) {
		statementCRUD.save(statement);
		account.insertInStatements(statement);
		accountCRUD.save(account);
	}
}
