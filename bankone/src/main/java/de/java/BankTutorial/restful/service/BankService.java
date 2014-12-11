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

	@POST
	public Response createBank(Bank bank) {
		entityManager.persist(bank);
		URI uri = uriInfo.getAbsolutePathBuilder()
				.path(Long.toString(bank.getId())).build();
		return Response.created(uri).build();
	}
	
	@PUT
	public Response updateBank(Bank bank) {
		System.out.println("nun in update mit ID=" + bank.getId());
		entityManager.merge(bank);
		
		URI uri = uriInfo.getAbsolutePathBuilder()
				.path(Long.toString(bank.getId())).build();
		return Response.created(uri).build();
	}

	@DELETE
	@Path("{id}")
	public Response deleteBank(@PathParam("id") long id) {
		System.out.println("nun in delete mit ID=" + id);
		entityManager.remove(entityManager.find(Bank.class, id));
		return Response.noContent().build();
	}

	@GET
	@Path("{id}")
	public Response getBank(@PathParam("id") long id) {
		System.out.println("in getBank");
		Bank bank = entityManager.find(Bank.class, id);
		if (bank == null) {
			throw new NotFoundException();
		}
		Hibernate.initialize(bank.getContacts());

		
		
		return Response.ok(bank).build();
	}

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