package de.java.BankTutorial.qualifier;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.ElementType.PARAMETER;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.inject.Qualifier;

/**
 * Qualifier zum Interceptor für den SortCodeProducer
 * @author MARCEL SCHOTT
 *
 */
@Qualifier
@Target({ METHOD, FIELD })
@Retention(RUNTIME)
public @interface RandomSortCode {

}