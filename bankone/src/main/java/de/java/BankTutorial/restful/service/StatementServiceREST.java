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
import de.java.BankTutorial.entity.Statement;
/**
 * 
 * @author Martin Petzold
 * REST Service Klasse der Statements
 */
@Path("/statementREST")
@Produces({ MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON })
@Consumes({ MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON })
@Stateless
public class StatementServiceREST {
	
	@PersistenceContext
	// (unitName="LibraryServer_JAXRS")
	EntityManager entityManager;
	@Context
	private UriInfo uriInfo;
	/**
	 * REST-Methode zur Speicherung eines Statements
	 * @param statement Statementdaten
	 * @return Rückantwort der Speicherung
	 */
	@POST
	public Response createStatement(Statement statement) {
		entityManager.persist(statement);
		URI uri = uriInfo.getAbsolutePathBuilder()
				.path(Long.toString(statement.getId())).build();
		return Response.created(uri).build();
	}
	/**
	 * REST-Methode zum Update eines Statements
	 * @param statement Statementdaten
	 * @return Rückantwort ded Updates
	 */
	@PUT
	public Response updateStatement(Statement statement) {
		System.out.println("nun in update mit ID=" + statement.getId());
		entityManager.merge(statement);
		
		URI uri = uriInfo.getAbsolutePathBuilder()
				.path(Long.toString(statement.getId())).build();
		return Response.created(uri).build();
	}
	/**
	 * REST-Methode zum Löschen eines Statements anhand einer Identifikationsnummer
	 * @param id Identifikationsnummer des Statements
	 * @return Rückantwort des Löschvorganges
	 */
	@DELETE
	@Path("{id}")
	public Response deleteStatement(@PathParam("id") long id) {
		System.out.println("nun in delete mit ID=" + id);
		entityManager.remove(entityManager.find(Statement.class, id));
		return Response.noContent().build();
	}
	/**
	 * REST-Methode zur Abfrage eines Statements anhand einer Identifikationsnummer
	 * @param id Identifikationsnummer des Statements
	 * @return Rückantwort der Abfrage
	 */
	@GET
	@Path("{id}")
	public Response getStatement(@PathParam("id") long id) {
		System.out.println("in getBank");
		Statement statement = entityManager.find(Statement.class, id);
		if (statement == null) {
			throw new NotFoundException();
		}

		
		
		return Response.ok(statement).build();
	}
	
@SuppressWarnings("unchecked")
	/**
	 * REST-Methode zur Abdfrage einer Liste aller Statements
	 * @return Rückantwort der Abfrage
	 */
	@GET
	public Response getStatements() {

		TypedQuery<Statement> query = entityManager.createQuery(
				"SELECT a FROM Statement a ORDER BY a.id", Statement.class);
		List<Statement> statements = new ArrayList<Statement>(query.getResultList());
		for (Statement s : statements) {
			//Hibernate.initialize();
		}
		GenericEntity<List<Statement>> entity = new GenericEntity<List<Statement>>(statements) {
		};
		return Response.ok(entity).build();
	}
}
