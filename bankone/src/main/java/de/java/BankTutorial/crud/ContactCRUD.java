package de.java.BankTutorial.crud;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import de.java.BankTutorial.crud.iface.IContactCRUD;
import de.java.BankTutorial.entity.Contact;

@Stateless
@LocalBean
public class ContactCRUD extends AbstractCRUDBean<Contact, EntityManager> implements IContactCRUD {
	private static final long serialVersionUID = 1L;
	
	@PersistenceContext
	private EntityManager entityManager;
	
	@Override
	public EntityManager getEntityManager() {
		return entityManager;
	}
}