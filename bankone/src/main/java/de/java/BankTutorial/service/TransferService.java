package de.java.BankTutorial.service;

import javax.ejb.LocalBean;
import javax.ejb.Stateful;
import javax.inject.Inject;

import de.java.BankTutorial.crud.AccountCRUD;
import de.java.BankTutorial.entity.AbstractAccount;
import de.java.BankTutorial.qualifier.StatementGenerator;
import de.java.BankTutorial.service.iface.ITransferService;

/**
 * Service-Klasse mit speziellen Funktionen bzgl. der Customer
 * @author MARCEL SCHOTT
 *
 */
@Stateful
@LocalBean
public class TransferService implements ITransferService {
	@Inject
	AccountCRUD accountCRUD; // CRUD-Objekt für Konten

	
	/**
	 * Zahlt einen Betrag auf ein Konto
	 * @param account Konto
	 * @param balance Betrag
	 */
	@StatementGenerator
	public void deposit(AbstractAccount account, float balance) {
		account.setBalance(account.getBalance() + balance);
		accountCRUD.save(account);
	}
	
	/**
	 * Zahlt einen Betrag von einem Konto aus
	 * @param account Konto
	 * @param balance Betrag
	 */
	@StatementGenerator
	public void withdraw(AbstractAccount account, float balance) {
		account.setBalance(account.getBalance() - balance);
		accountCRUD.save(account);
	}
	
	/**
	 * überweist einen Betrag von einem Konto auf ein anderes
	 * @param account Ursprungskonto
	 * @param otherAccount Zielkonto
	 */
	@StatementGenerator
	public void transfer(AbstractAccount account, AbstractAccount otherAccount, float balance) {
		account.setBalance(account.getBalance() - balance);
		otherAccount.setBalance(otherAccount.getBalance() + balance);
		accountCRUD.save(account);
		accountCRUD.save(otherAccount);
	}
}
