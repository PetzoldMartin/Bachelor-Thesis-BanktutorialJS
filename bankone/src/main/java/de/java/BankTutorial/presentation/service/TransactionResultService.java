package de.java.BankTutorial.presentation.service;

import java.io.Serializable;

import javax.enterprise.context.SessionScoped;
import javax.inject.Named;

/**
 * SessionScoped-Klasse, welche den Transaktionsstatus bereit hält
 * @author MARCEL SCHOTT
 *
 */
@Named
@SessionScoped
public class TransactionResultService implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private TransactionResult transactionResult;
	
	public void setTransactionResult(TransactionResult result) {
		transactionResult = result;
	}
	
	public TransactionResult getTransactionResult() {
		return transactionResult;
	}

	/**
	 * Gibt das Ergebnis der Transaktion zurück
	 * @return Ergebnis der Transaktion als String
	 */
	public String getTransactionResultString() {
		if (transactionResult == null) {
			return "";
		}
		String result = transactionResult.toString();
		return result;
	}
	
	/**
	 * Setzt den Transaktions-Status auf null
	 */
	public void resetTransactionResult() {
		transactionResult = null;
	}
}
