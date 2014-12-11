package de.java.BankTutorial.presentation;


import javax.enterprise.context.Conversation;
import javax.inject.Inject;

import de.java.BankTutorial.presentation.service.ConversationAdmin;
import de.java.BankTutorial.presentation.service.TransactionResultService;

/**
 * Zugriffs-Objekt für CRUD-Funktionalität
 * @author MARCEL SCHOTT
 * 
 */
public abstract class AbstractPMBean {
	@Inject
	private Conversation conversation;				// Conversation-Objekt
	
	@Inject
	private ConversationAdmin conversationAdmin;	// Conversation-Admin-Objekt der Session

	@Inject
	protected TransactionResultService transactionResultService; // Ergebnis der Transaktion

	/**
	 * Beendet die aktuelle Transaktion
	 */
	public void cancel() {
		endConversation();
	}
	
	/**
	 * Startet eine Conversation
	 */
	protected void beginConversation() {
		if (conversation.isTransient()) {
			conversation.begin();
			conversationAdmin.addConversation(conversation.getId());
		}
	}
	
	/**
	 * Beendet eine Conversation
	 */
	protected void endConversation() {
		if (!conversation.isTransient()) {
			conversationAdmin.removeConversation(conversation.getId());
			conversation.end();
		}
	}
}
