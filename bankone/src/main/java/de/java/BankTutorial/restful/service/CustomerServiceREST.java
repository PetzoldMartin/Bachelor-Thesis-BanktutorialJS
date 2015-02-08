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

import de.java.BankTutorial.entity.Customer;
/**
 * 
 * @author Martin Petzold
 * REST Service Klasse dEr Customer
 */
@Path("/customerREST")
@Produces({ MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON })
@Consumes({ MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON })
@Stateless
public class CustomerServiceREST {

	@PersistenceContext
	// (unitName="LibraryServer_JAXRS")
	EntityManager entityManager;
	@Context
	private UriInfo uriInfo;
	/**
	 * REST-Methode zum Speichern eines Customers
	 * @param customer Customerdaten
	 * @return Rückantwort der Speicherung
	 */
	@POST
	public Response createCustomer(Customer customer) {
		System.out.println("nun in create mit ID=" + customer.getId());

		entityManager.persist(customer);
		URI uri = uriInfo.getAbsolutePathBuilder()
				.path(Long.toString(customer.getId())).build();
		return Response.created(uri).build();
	}
	/**
	 * REST-Methode zum Update eines Customers
	 * @param customer Customerdaten
	 * @return Rückantwort des Updates
	 */
	@PUT
	public Response updateCustomer(Customer customer) {
		System.out.println("nun in update mit ID=" + customer.getId());
		entityManager.merge(customer);
		
		URI uri = uriInfo.getAbsolutePathBuilder()
				.path(Long.toString(customer.getId())).build();
		return Response.created(uri).build();
	}
	/**
	 * REST-Methode zum Löschen eines Customers anhand einer Identifikationsnummer
	 * @param id Identifikationsnummer des Customers
	 * @return Rückantwort der Speicherung
	 */
	@DELETE
	@Path("{id}")
	public Response deleteCustomer(@PathParam("id") long id) {
		System.out.println("nun in delete mit ID=" + id);
		Customer customer=entityManager.find(Customer.class, id);
		
		entityManager.remove(customer);
		return Response.noContent().build();
	}
	/**
	 * REST-Methode zur Abfrage eines Customers anhand einer Identifikationsnummer
	 * @param id Identifikationsnummer des Customers
	 * @return Rückantwort der Abfrage
	 */
	@GET
	@Path("{id}")
	public Response getCustomer(@PathParam("id") long id) {
		System.out.println("in getCustomer");
		Customer customer = entityManager.find(Customer.class, id);
		if (customer == null) {
			throw new NotFoundException();
		}
		
		Hibernate.initialize(customer.getContact());
		Hibernate.initialize(customer.getBanks());
	
		return Response.ok(customer).build();
	}
	/**
	 * REST-Methode zur Abfrage ener Liste aller Customer
	 * @return Rückantwort der Abfrage
	 */
	@SuppressWarnings("unchecked")
	@GET
	public Response getCustomers() {

		TypedQuery<Customer> query = entityManager.createQuery(
				"SELECT b FROM Customer b ORDER BY b.id", Customer.class);
		List<Customer> customers = new ArrayList<Customer>(query.getResultList());
		for (Customer b : customers) {
			Hibernate.initialize(b.getBanks());
			Hibernate.initialize(b.getContact());
		}
		GenericEntity<List<Customer>> entity = new GenericEntity<List<Customer>>(customers) {
		};
		return Response.ok(entity).build();
	}

}