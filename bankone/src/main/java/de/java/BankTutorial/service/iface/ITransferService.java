package de.java.BankTutorial.service.iface;

import javax.ejb.Remote;
import de.java.BankTutorial.entity.AbstractAccount;
import de.java.BankTutorial.qualifier.StatementGenerator;

/**
 * Service-Klasse mit speziellen Funktionen bzgl. der Customer
 * @author MARCEL SCHOTT
 *
 */
@Remote
public interface ITransferService {

	/**
	 * Zahlt einen Betrag auf ein Konto
	 * @param account Konto
	 * @param balance Betrag
	 */
	@StatementGenerator
	public void deposit(AbstractAccount account, float balance);
	
	/**
	 * Zahlt einen Betrag von einem Konto aus
	 * @param account Konto
	 * @param balance Betrag
	 */
	@StatementGenerator
	public void withdraw(AbstractAccount account, float balance);
	
	/**
	 * Ueberweist einen Betrag von einem Konto auf ein anderes
	 * @param account Ursprungskonto
	 * @param otherAccount Zielkonto
	 */
	@StatementGenerator
	public void transfer(AbstractAccount account, AbstractAccount otherAccount, float balance);
}
