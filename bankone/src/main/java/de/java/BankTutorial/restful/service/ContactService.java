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

import de.java.BankTutorial.entity.Contact;
/**
 * 
 * @author Martin Petzold
 * REST Service Klasse Contacte
 */
@Path("/contactREST")
@Produces({ MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON })
@Consumes({ MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON })
@Stateless
public class ContactService {

	@PersistenceContext
	// (unitName="LibraryServer_JAXRS")
	EntityManager entityManager;
	@Context
	private UriInfo uriInfo;
	/**
	 * REST-Methode zur Erstellung eines Contacts
	 * @param contact Contactdaten
	 * @return Rückantwort der Erstellung
	 */
	@POST
	public Response createContact(Contact contact) {
		entityManager.persist(contact);
		URI uri = uriInfo.getAbsolutePathBuilder()
				.path(Long.toString(contact.getId())).build();
		return Response.created(uri).build();
	}
	/**
	 * REST-Methode zum Update eines Contacts
	 * @param contact Contactdaten
	 * @return Rückantwort des Updates
	 */
	@PUT
	public Response updateContact(Contact contact) {
		System.out.println("nun in update mit ID=" + contact.getId());
		entityManager.merge(contact);
		
		URI uri = uriInfo.getAbsolutePathBuilder()
				.path(Long.toString(contact.getId())).build();
		return Response.created(uri).build();
	}
	/**
	 * REST-Methode zum Löschen eines Contacts anhand einer Identifikationsnummer
	 * @param id Identifikationsnummer des Contacts
	 * @return Rückantwort des Löschvorganges
	 */
	@DELETE
	@Path("{id}")
	public Response deleteContact(@PathParam("id") long id) {
		System.out.println("nun in delete mit ID=" + id);
		entityManager.remove(entityManager.find(Contact.class, id));
		return Response.noContent().build();
	}
	/**
	 * REST-Methode zur Abfrage eines Contacts anhand einer Identifikationsnummer
	 * @param id Identifikationsnummer des Contacts
	 * @return Rückantwort der Abfrage
	 */
	@GET
	@Path("{id}")
	public Response getContact(@PathParam("id") long id) {
		System.out.println("in getBank");
		Contact contact = entityManager.find(Contact.class, id);
		if (contact == null) {
			throw new NotFoundException();
		}

		
		
		return Response.ok(contact).build();
	}
	/**
	 * REST-Methode zur Abfrage einer Liste aller Contacts
	 * @return Rückantwort der Abfrage
	 */
	@SuppressWarnings("unchecked")
	@GET
	public Response getContacts() {

		TypedQuery<Contact> query = entityManager.createQuery(
				"SELECT a FROM Contact a ORDER BY a.id", Contact.class);
		List<Contact> contacts = new ArrayList<Contact>(query.getResultList());
		for (Contact a : contacts) {
			Hibernate.initialize(a.getAddress());
		}
		GenericEntity<List<Contact>> entity = new GenericEntity<List<Contact>>(contacts) {
		};
		return Response.ok(entity).build();
	}

}