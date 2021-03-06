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

import de.java.BankTutorial.entity.Address;
import javax.xml.bind.annotation.XmlRootElement;
/**
 * 
 * @author Martin Petzold
 * REST Service Klasse der Adressen
 */
@Path("/addressREST")
@Produces({ MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON })
@Consumes({ MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON })
@Stateless
public class AdressService {
	//@XmlRootElement in entity

	@PersistenceContext
	// (unitName="LibraryServer_JAXRS")
	EntityManager entityManager;
	@Context
	private UriInfo uriInfo;
	/**
	 * REST-Methode zum erstellen einer Adresse
	 * @param address Adressdaten
	 * @return Rückantwort der Adressenerstellung
	 */
	@POST
	public Response createAddress(Address address) {
		entityManager.persist(address);
		URI uri = uriInfo.getAbsolutePathBuilder()
				.path(Long.toString(address.getId())).build();
		return Response.created(uri).build();
	}
	/**
	 * REST-Methode zum updaten einer Adresse
	 * @param address Adressdaten
	 * @return Rückantwort eines Adressenupdates
	 */
	@PUT
	public Response updateAddress(Address address) {
		System.out.println("nun in update mit ID=" + address.getId());
		entityManager.merge(address);
		
		URI uri = uriInfo.getAbsolutePathBuilder()
				.path(Long.toString(address.getId())).build();
		return Response.created(uri).build();
	}
	/**
	 * REST-Methode zum löschen einer Adresse
	 * @param id Identifikationsnummer der Adresse
	 * @return Rückantwort einer Adressenlöschung
	 */
	@DELETE
	@Path("{id}")
	public Response deleteAddress(@PathParam("id") long id) {
		System.out.println("nun in delete mit ID=" + id);
		entityManager.remove(entityManager.find(Address.class, id));
		return Response.noContent().build();
	}
	/**
	 * Methode zum Abrufen einer speziellen Adresse anhand ihrer Identifikationsummer
	 * @param id Identifikationsummer der anzuzeigenden Adresse
	 * @return Rückantwort bei Abfrage einer Adresse
	 */
	@GET
	@Path("{id}")
	public Response getAddress(@PathParam("id") long id) {
		System.out.println("in getBank");
		Address address = entityManager.find(Address.class, id);
		if (address == null) {
			throw new NotFoundException();
		}

		
		
		return Response.ok(address).build();
	}

	@SuppressWarnings("unchecked")
	
	/**
	 * REST-Methode zum Abruf einer Liste aller adressen
	 * @return Rückantwort bei der Abfrage der Adressenliste 
	 */
	@GET
	public Response getAddresss() {

		TypedQuery<Address> query = entityManager.createQuery(
				"SELECT a FROM Address a ORDER BY a.id", Address.class);
		List<Address> addresss = new ArrayList<Address>(query.getResultList());
		for (Address a : addresss) {
//			Hibernate.initialize(a.getContact());
		}
		GenericEntity<List<Address>> entity = new GenericEntity<List<Address>>(addresss) {
		};
		return Response.ok(entity).build();
	}

}