package de.java.BankTutorial.crud;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import de.java.BankTutorial.crud.iface.IStatementCRUD;
import de.java.BankTutorial.entity.Statement;

@Stateless
@LocalBean
public class StatementCRUD extends AbstractCRUDBean<Statement, EntityManager> implements IStatementCRUD {
	private static final long serialVersionUID = 1L;
	
	@PersistenceContext
	private EntityManager entityManager;
	
	@Override
	public EntityManager getEntityManager() {
		return entityManager;
	}
}