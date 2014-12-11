package de.java.BankTutorial.producer;

import java.util.Random;

import javax.enterprise.inject.Produces;

import de.java.BankTutorial.qualifier.RandomSortCode;

/**
 * Producer, der Zufallsbankleitzahlen erstellt
 * @author MARCEL SCHOTT
 *
 */
public class BankSortCodeGenerator {
	private Random random = new Random(System.currentTimeMillis());
	
	@Produces
	@RandomSortCode
	public int getNumber() {
		return random.nextInt(100000000);
	}
}
