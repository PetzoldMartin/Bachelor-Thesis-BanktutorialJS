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

import de.java.BankTutorial.entity.AbstractAccount;
import de.java.BankTutorial.entity.CheckingAccount;
import de.java.BankTutorial.entity.FlexibleSavingsAccount;
import de.java.BankTutorial.entity.SavingsAccount;

import javax.xml.bind.annotation.XmlRootElement;
/**
 * 
 * @author Martin Petzold
 * REST Service Klasse der Abstractaccounts und der einzelnen Abstractaccountimplementierungen
 */
@Path("/abstractAccountREST")
@Produces({ MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON })
@Consumes({ MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON })
@Stateless
public class AbstractAccountService {
	//@XmlRootElement in entity

	@PersistenceContext
	// (unitName="LibraryServer_JAXRS")
	EntityManager entityManager;
	@Context
	private UriInfo uriInfo;
	
	/**
	 * REST-Methode zum Speichern eines CheckingAccounts
	 * @param checkingAccount Daten des Checkingaccounts
	 * @return Rückantwort der Speicherung
	 */
	@POST
	@Path("CheckingAccount")
	public Response createCheckingAccount(CheckingAccount checkingAccount) {
		entityManager.persist(checkingAccount);
		URI uri = uriInfo.getAbsolutePathBuilder()
				.path(Long.toString(checkingAccount.getId())).build();
		return Response.created(uri).build();
	}
	/**
	 * REST-Methode zum Updaten eines CheckingAccounts
	 * @param checkingAccount Daten des Checkingaccounts
	 * @return Rückantwort des Updates
	 */
	@PUT
	@Path("CheckingAccount")
	public Response updateCheckingAccount(CheckingAccount checkingAccount) {
		System.out.println("nun in update mit ID=" + checkingAccount.getId());
		entityManager.merge(checkingAccount);
		
		URI uri = uriInfo.getAbsolutePathBuilder()
				.path(Long.toString(checkingAccount.getId())).build();
		return Response.created(uri).build();
	}
	/**
	 * REST-Methode zum Speichern eines savingsAccounts
	 * @param savingsAccount Daten des SavingAccounts
	 * @return Rückantwort der Speicherung
	 */
	@POST
	@Path("SavingsAccount")
	public Response createSavingsAccount(SavingsAccount savingsAccount) {
		entityManager.persist(savingsAccount);
		URI uri = uriInfo.getAbsolutePathBuilder()
				.path(Long.toString(savingsAccount.getId())).build();
		return Response.created(uri).build();
	}
	/**
	 * REST-Methode zum Updaten eines savingsAccounts
	 * @param savingsAccount Daten des SavingAccounts
	 * @return Rückantwort des Updates
	 */
	@PUT
	@Path("SavingsAccount")
	public Response updateSavingsAccount(SavingsAccount savingsAccount) {
		System.out.println("nun in update mit ID=" + savingsAccount.getId());
		entityManager.merge(savingsAccount);
		
		URI uri = uriInfo.getAbsolutePathBuilder()
				.path(Long.toString(savingsAccount.getId())).build();
		return Response.created(uri).build();
	}
	/**
	 * REST-Methode zum Speichern eines flexibleSavingsAccounts
	 * @param flexibleSavingsAccount
	 * @return Rückantwort der Speicherung
	 */
	@POST
	@Path("FlexibleSavingsAccount")
	public Response createFlexibleSavingsAccount(FlexibleSavingsAccount flexibleSavingsAccount) {
		entityManager.persist(flexibleSavingsAccount);
		URI uri = uriInfo.getAbsolutePathBuilder()
				.path(Long.toString(flexibleSavingsAccount.getId())).build();
		return Response.created(uri).build();
	}
	/**
	 * REST-Methode zum Updaten eines flexibleSavingsAccounts
	 * @param flexibleSavingsAccount
	 * @return Rückantwort des Updates
	 */
	@PUT
	@Path("FlexibleSavingsAccount")
	public Response updateFlexibleSavingsAccount(FlexibleSavingsAccount flexibleSavingsAccount) {
		System.out.println("nun in update mit ID=" + flexibleSavingsAccount.getId());
		entityManager.merge(flexibleSavingsAccount);
		
		URI uri = uriInfo.getAbsolutePathBuilder()
				.path(Long.toString(flexibleSavingsAccount.getId())).build();
		return Response.created(uri).build();
	}
	

	/**
	 * REST-Methode zum löschen eines Abstractaccounts
	 * @param id Identifikationsnummer des Abstractaccounts
	 * @return Rückantwort	beim Löschen eines AbstractAccounts
	 */
	@DELETE
	@Path("{id}")
	public Response deleteAbstractAccount(@PathParam("id") long id) {
		System.out.println("nun in delete mit ID=" + id);
		entityManager.remove(entityManager.find(AbstractAccount.class, id));
		return Response.noContent().build();
	}
	/**
	 * REST-Methode zur Abfrage eines Abstractaccounts anhand seiner Identifikationsnummer
	 * @param id Identifikationsummer des Abstractaccounts
	 * @return Rückantwort bei der Abfrage eines Abstractaccounts
	 */
	@GET
	@Path("{id}")
	public Response getAbstractAccount(@PathParam("id") long id) {
		System.out.println("in getBank");
		AbstractAccount abstractAccount = entityManager.find(AbstractAccount.class, id);
		if (abstractAccount == null) {
			throw new NotFoundException();
		}
		Hibernate.initialize(abstractAccount.getStatements());
		Hibernate.initialize(abstractAccount.getBank());
		Hibernate.initialize(abstractAccount.getBank().getContacts());
		Hibernate.initialize(abstractAccount.getBank().getCustomers());
		Hibernate.initialize(abstractAccount.getAccountType());


		return Response.ok(abstractAccount).build();
	}

	@SuppressWarnings("unchecked")
	/**
	 * REST-Methode zur Abfrage einer Liste aller Abstractaccounts
	 * @return Rückantwort bei der Abfrage
	 */
	@GET
	public Response getAbstractAccounts() {

		TypedQuery<AbstractAccount> query = entityManager.createQuery(
				"SELECT a FROM AbstractAccount a ORDER BY a.id", AbstractAccount.class);
		List<AbstractAccount> abstractAccounts = new ArrayList<AbstractAccount>(query.getResultList());
		for (AbstractAccount a : abstractAccounts) {
			Hibernate.initialize(a.getStatements());
			Hibernate.initialize(a.getBank());
			Hibernate.initialize(a.getBank().getContacts());
			Hibernate.initialize(a.getBank().getCustomers());
			Hibernate.initialize(a.getAccountType());
		}
		GenericEntity<List<AbstractAccount>> entity = new GenericEntity<List<AbstractAccount>>(abstractAccounts) {
		};
		return Response.ok(entity).build();
	}
	
@SuppressWarnings("unchecked")
	/**
	 * REST-Methode zur Abfrage einer Liste aller Abstractaccounts die zu einer bestimmten Bank zugeordnet sind
	 * @param id Identifikationsnummer der Bank zu der die Liste ausgegeben wird
	 * @return Rückantwort bei der Abfrage
	 */
	@GET
	@Path("bank/{id}")
	public Response getAbstractAccountsByBankId(@PathParam("id") long id) {

		TypedQuery<AbstractAccount> query = entityManager.createQuery(
				"select a from AbstractAccount a where a.bank.id = " + id + " order by a.id", AbstractAccount.class);
		List<AbstractAccount> abstractAccounts = new ArrayList<AbstractAccount>(query.getResultList());
		for (AbstractAccount a : abstractAccounts) {
			Hibernate.initialize(a.getStatements());
			Hibernate.initialize(a.getBank());
			Hibernate.initialize(a.getBank().getContacts());
			Hibernate.initialize(a.getBank().getCustomers());
			Hibernate.initialize(a.getAccountType());
		}
		GenericEntity<List<AbstractAccount>> entity = new GenericEntity<List<AbstractAccount>>(abstractAccounts) {
		};
		return Response.ok(entity).build();
	}

@SuppressWarnings("unchecked")
/**
 *  REST-Methode zur Abfrage einer Liste aller Abstractaccounts die zu einem bestimmten Customer zugeordnet sind
 * @param id Identifikationsnummer des Customers zu der die Liste ausgegeben wird
 * @return Rückantwort bei der Abfrage
 */
@GET
@Path("customer/{id}")
public Response getAbstractAccountsByCustomerId(@PathParam("id") long id) {

	TypedQuery<AbstractAccount> query = entityManager.createQuery(
			"select a from AbstractAccount a where a.owner.id = " + id + " order by a.id", AbstractAccount.class);
	List<AbstractAccount> abstractAccounts = new ArrayList<AbstractAccount>(query.getResultList());
	for (AbstractAccount a : abstractAccounts) {
		Hibernate.initialize(a.getStatements());
		Hibernate.initialize(a.getBank());
		Hibernate.initialize(a.getBank().getContacts());
		Hibernate.initialize(a.getBank().getCustomers());
		Hibernate.initialize(a.getAccountType());
	}
	GenericEntity<List<AbstractAccount>> entity = new GenericEntity<List<AbstractAccount>>(abstractAccounts) {
	};
	return Response.ok(entity).build();
}

}