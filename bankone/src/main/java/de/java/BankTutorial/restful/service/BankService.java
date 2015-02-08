package de.java.BankTutorial.restful.service;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import org.hibernate.Hibernate;

import de.java.BankTutorial.entity.Bank;
import de.java.BankTutorial.entity.Contact;
import de.java.BankTutorial.entity.Customer;
/**
 * 
 * @author Martin Petzold
 * REST Service Klasse der Banken
 */
@Path("/bankREST")
@Produces({ MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON })
@Consumes({ MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON })
@Stateless
public class BankService {

	@PersistenceContext
	// (unitName="LibraryServer_JAXRS")
	EntityManager entityManager;
	@Context
	private UriInfo uriInfo;
	/**
	 * REST-Methode zum Speichern einer Bank
	 * @param bank Bankdaten
	 * @return Rückantwort der Speicherung
	 */
	@POST
	public Response createBank(Bank bank) {
		System.out.println("nun in create mit ID=" + bank.getName());

		entityManager.persist(bank);
		URI uri = uriInfo.getAbsolutePathBuilder()
				.path(Long.toString(bank.getId())).build();
		return Response.created(uri).build();
	}
	/**
	 * REST-Methode zum Updaten einer Bank
	 * @param bank Bankdaten
	 * @return Rückantwort des Updates
	 */
	@PUT
	public Response updateBank(Bank bank) {
		System.out.println("nun in update mit ID=" + bank.getId());
		entityManager.merge(bank);
		
		URI uri = uriInfo.getAbsolutePathBuilder()
				.path(Long.toString(bank.getId())).build();
		return Response.created(uri).build();
	}
	/**
	 * REST-Methode zum Löschen einer Bank
	 * @param id Identifikationsnummer der zu löschenden Bank
	 * @return Rückantwort des Löschvorgangs
	 */
	@DELETE
	@Path("{id}")
	public Response deleteBank(@PathParam("id") long id) {
		System.out.println("nun in delete mit ID=" + id);
		Bank bank=entityManager.find(Bank.class, id);
		
		entityManager.remove(bank);
		return Response.noContent().build();
	}
	/**
	 * REST-Methode zur Abfrage der Bankdaten einer bestimmten bank anhand einer Identifikationsnummer 
	 * @param id Identifikationsnummer der Bank
	 * @return Rückantwort der Abfrage
	 */
	@GET
	@Path("{id}")
	public Response getBank(@PathParam("id") long id) {
		System.out.println("in getBank");
		Bank bank = entityManager.find(Bank.class, id);
		if (bank == null) {
			throw new NotFoundException();
		}
		
		Hibernate.initialize(bank.getContacts());
		Hibernate.initialize(bank.getCustomers());
	
		return Response.ok(bank).build();
	}
	/**
	 * REST-Methode zur Abfrage einer Liste aller Banken
	 * @return Rückantwort der Abfrage
	 */
	@SuppressWarnings("unchecked")
	@GET
	public Response getBanks() {

		TypedQuery<Bank> query = entityManager.createQuery(
				"SELECT b FROM Bank b ORDER BY b.id", Bank.class);
		List<Bank> banks = new ArrayList<Bank>(query.getResultList());
		for (Bank b : banks) {
			Hibernate.initialize(b.getContacts());
			Hibernate.initialize(b.getCustomers());
		}
		GenericEntity<List<Bank>> entity = new GenericEntity<List<Bank>>(banks) {
		};
		return Response.ok(entity).build();
	}

}