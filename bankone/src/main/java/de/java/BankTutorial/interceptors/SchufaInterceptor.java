package de.java.BankTutorial.interceptors;


import java.io.Serializable;

import javax.inject.Inject;
import javax.interceptor.AroundInvoke;
import javax.interceptor.Interceptor;
import javax.interceptor.InvocationContext;

import de.java.BankTutorial.entity.AbstractAccount;
import de.java.BankTutorial.entity.Customer;
import de.java.BankTutorial.presentation.service.TransactionResult;
import de.java.BankTutorial.presentation.service.TransactionResultService;
import de.java.BankTutorial.qualifier.SchufaChecker;
import de.java.BankTutorial.service.CustomerService;

/**
 * Interceptor der die Kreditwürdigkeit des Customers ermittelt (anhand des Gesamtbetrags der Konten eines Customers)
 * @author MARCEL SCHOTT
 *
 */
@SchufaChecker
@Interceptor
public class SchufaInterceptor implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Inject
	CustomerService service;
	
	@Inject
	TransactionResultService transactionResultService;
	
	@AroundInvoke
	public Object onMethodCall(InvocationContext context) throws Exception {		
		// Parameter überprüfen
		if (context.getParameters().length != 1 ||
			!context.getParameters()[0].getClass().getSuperclass().getSimpleName().toLowerCase().equals("abstractaccount")) { 
			return null;
		}

		try {
			AbstractAccount account = (AbstractAccount)context.getParameters()[0];
			
			// Prüfen, ob der Account an einen Benutzer gebunden ist
			if (account.getOwner() == null) {
				return null;
			}
			
			Customer customer = account.getOwner();

			// Geld der Person abfragen
			if (service.getMoneyOfACustomer(customer) >= 0) {
				return context.proceed();
			}
			
			transactionResultService.setTransactionResult(TransactionResult.SCHUFA_FAILED);
			return null;
		} finally {}
	}
}
