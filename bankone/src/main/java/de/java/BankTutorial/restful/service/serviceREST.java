package de.java.BankTutorial.restful.service;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import java.io.Serializable;

import javax.enterprise.context.ConversationScoped;
import javax.inject.Inject;
import javax.inject.Named;

import de.java.BankTutorial.service.InterestService;
import de.java.BankTutorial.entity.Bank;
import de.java.BankTutorial.service.InterestService;
/**
 * 
 * @author Martin Petzold
 * REST Service Klasse des Zinsüberweisungservice
 */


@Path("/ServiceREST")
@Produces({ MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON })
@Consumes({ MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON })
@Stateless
public class serviceREST {
	@Inject
	private InterestService interestService;
	/**
	 * REST-Methode zum Starten des Zinsüberweisungservice
	 * @return Rückantwort des Startvorganges
	 */
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	@Path("/start")
	public String start() {
		interestService.startTimers();
		return String.valueOf(true);
	}
	
	/**
	 * REST-Methode zum Stoppen des Zinsüberweisungservice
	 * @return Rückantwort des Stopvorganges
	 */
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	@Path("/stop")
	public String stop() {
		interestService.stopTimers();;
		return String.valueOf(false);
	}
	/**
	 * REST-Methode zur Abfrage des Status des Zinsüberweisungservice
	 * @return Status des Zinsüberweisungservice als String
	 */
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	@Path("/isActive")
	public String isActive() {
		return String.valueOf(interestService.isTimerActive());
	}
}
