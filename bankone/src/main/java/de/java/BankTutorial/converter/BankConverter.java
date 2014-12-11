//package de.java.BankTutorial.converter;
//
//import java.io.Serializable;
//
//import javax.ejb.EJB;
//import javax.faces.bean.ManagedBean;
//import javax.faces.component.UIComponent;
//import javax.faces.context.FacesContext;
//import javax.faces.convert.Converter;
//import javax.faces.convert.FacesConverter;
//import javax.inject.Named;
//
//import de.java.BankTutorial.crud.BankCRUD;
//import de.java.BankTutorial.entity.Bank;
//
///**
// * Konverter fuer customer-Objekte
// * @author MARCEL SCHOTT
// * 
// */
//@ManagedBean
//@FacesConverter(forClass = Bank.class)
//@Named("bankConverter")
//public class BankConverter implements Converter, Serializable{
//	private static final long serialVersionUID = 1L;
//	
//	@EJB
//    private BankCRUD bankCRUD;
//    
//    public BankConverter() {
//    }
//
//    @Override
//    public Object getAsObject(FacesContext context, UIComponent component, String value) {
//        if (value.isEmpty()) {
//            return null;
//        }
//        Long id = new Long(value);
//        return bankCRUD.loadInstance(id);
//    }
// 
//    @Override
//    public String getAsString(FacesContext context, UIComponent component, Object value) {
//        if (value == null || value.toString().isEmpty()) {
//            return "";
//        }
//        Long id = ((Bank) value).getId();
//        return id.toString();
//    }
//}
