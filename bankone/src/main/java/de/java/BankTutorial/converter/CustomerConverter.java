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
//import de.java.BankTutorial.crud.CustomerCRUD;
//import de.java.BankTutorial.entity.Customer;
//
///**
// * Konverter fuer Customer-Objekte
// * @author MARCEL SCHOTT
// * 
// */
//@ManagedBean
//@FacesConverter(forClass = Customer.class)
//@Named("customerConverter")
//public class CustomerConverter implements Converter, Serializable{
//	private static final long serialVersionUID = 1L;
//	
//	@EJB
//    private CustomerCRUD customerCRUD;
//    
//    public CustomerConverter() {
//    }
//
//    @Override
//    public Object getAsObject(FacesContext context, UIComponent component, String value) {
//        if (value.isEmpty()) {
//            return null;
//        }
//        Long id = new Long(value);
//        return customerCRUD.loadInstance(id);
//    }
// 
//    @Override
//    public String getAsString(FacesContext context, UIComponent component, Object value) {
//        if (value == null || value.toString().isEmpty()) {
//            return "";
//        }
//        Long id = ((Customer) value).getId();
//        return id.toString();
//    }
//}
