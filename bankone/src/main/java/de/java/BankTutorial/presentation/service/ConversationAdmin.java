package de.java.BankTutorial.presentation.service;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.enterprise.context.SessionScoped;
import javax.enterprise.inject.Produces;
import javax.inject.Named;

@Named
@SessionScoped
public class ConversationAdmin implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private List<String> conversationList = new ArrayList<String>();
	
	/**
	 * Gibt zurück, ob eine Conversation bereits läuft
	 * @return  
	 */
	@Named("isConversationRunning")
	@Produces
	public boolean isConversationRunning() {
		return (getConversationList().size() > 0);
	}
	
	/**
	 * Löscht eine Conversation aus der Liste
	 * @param id ID  
	 */
	public void removeConversation(String id) {
		if (conversationList != null) {
			conversationList.remove(id);
		}
	}
	
	/**
	 * Fügt eine Conversation der Liste hinzu
	 * @param id ID  
	 */
	public void addConversation(String id) {
		if (conversationList != null) {
			conversationList.add(id);
		}
	}
	
	/**
	 * Gibt die letzte Conversation-ID zurück
	 * @return letzte Conversation-ID
	 */
	@Named("currentConversationId")
	@Produces
	public String getLastConversationId() {
		String id = "";
		if (conversationList != null && conversationList.size() > 0)
			id = conversationList.get(conversationList.size() - 1);
		return id;
	}
	
	/**
	 * Gibt die komplette Conversation-Liste zurück
	 * @return Conversation-List
	 */
	public java.util.List<String> getConversationList() {
		return conversationList;
	}
}
