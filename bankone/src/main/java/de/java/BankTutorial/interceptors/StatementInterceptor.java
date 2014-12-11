package de.java.BankTutorial.interceptors;

import java.io.Serializable;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.text.NumberFormat;

import javax.inject.Inject;
import javax.interceptor.AroundInvoke;
import javax.interceptor.Interceptor;
import javax.interceptor.InvocationContext;

import de.java.BankTutorial.entity.AbstractAccount;
import de.java.BankTutorial.entity.Statement;
import de.java.BankTutorial.qualifier.StatementGenerator;
import de.java.BankTutorial.service.StatementService;

/**
 * Interceptor für Kontoauszüge
 * @author MARCEL SCHOTT
 *
 */
@StatementGenerator
@Interceptor
public class StatementInterceptor implements Serializable {
	private static final long serialVersionUID = -3964422088511931189L;

	@Inject
	StatementService service;
	
	//@PersistenceContext
	//private EntityManager entityManager;
	
	@AroundInvoke
	public Object onMethodCall(InvocationContext context) throws Exception {
		if (context.getParameters().length == 2) {
			if (!context.getParameters()[0].getClass().getSuperclass().getSimpleName().toLowerCase().equals("abstractaccount") ||
				!context.getParameters()[1].getClass().getSimpleName().toLowerCase().equals("float")) { 
				return null;
			}
		} else if (context.getParameters().length == 3) {
			if (!context.getParameters()[0].getClass().getSuperclass().getSimpleName().toLowerCase().equals("abstractaccount") ||
				!context.getParameters()[1].getClass().getSuperclass().getSimpleName().toLowerCase().equals("abstractaccount") ||
				!context.getParameters()[2].getClass().getSimpleName().toLowerCase().equals("float")) { 
				return null;
				}
		} else {
			return null;
		}
		
		try {			
			AbstractAccount account = (AbstractAccount)context.getParameters()[0];
			
			// Betrag Formatieren
			float balance;
		    NumberFormat numberFormat = new DecimalFormat("0.00");
		    numberFormat.setRoundingMode(RoundingMode.DOWN);
			
			Statement statement = new Statement();
			statement.initiateDate();
			
			// Content erstellen
			if (context.getMethod().getName().equals("deposit")) {
				balance = (Float)context.getParameters()[1];
				statement.setContent("<<< +" + numberFormat.format(balance) + "� (Einzahlung)");
			} else if (context.getMethod().getName().equals("withdraw")) {
				balance = (Float)context.getParameters()[1];
				statement.setContent(">>> -" + numberFormat.format(balance) + "� (Auszahlung)");
			} else if (context.getMethod().getName().equals("transfer")) {		
				// Auszug f�r anderes Konto
				AbstractAccount otherAccount = (AbstractAccount)context.getParameters()[1];
				balance = (Float)context.getParameters()[2];
				
				Statement otherStatement = new Statement();
				otherStatement.initiateDate();
				otherStatement.setContent("<<< +" + numberFormat.format(balance) + "� (�berweisung)");
				
				service.generateStatement(otherAccount, otherStatement);
				
				//entityManager.persist(otherStatement);
				//otherAccount.insertInStatements(otherStatement);
				//entityManager.merge(otherAccount);
				
				statement.setContent(">>> -" + numberFormat.format(balance) + "� (�berweisung)");
			} else if (context.getMethod().getName().equals("depositInterest")) {
				balance = (Float)context.getParameters()[1];
				statement.setContent(">>> +" + numberFormat.format(balance) + "� (Zins�berweisung)");
			}
			
			service.generateStatement(account, statement);
			
			//entityManager.persist(statement);
			//account.insertInStatements(statement);
			//entityManager.merge(account);
			
			return context.proceed();
		} finally {}
	}
}
