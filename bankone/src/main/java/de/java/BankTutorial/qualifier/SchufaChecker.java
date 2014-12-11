package de.java.BankTutorial.qualifier;

import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.inject.Qualifier;
import javax.interceptor.InterceptorBinding;

/**
 * Qualifier zum Interceptor für den SchufaCheck
 * @author MARCEL SCHOTT
 *
 */
@Qualifier
@InterceptorBinding
@Retention (RUNTIME)
@Target ({METHOD, TYPE})
public @interface SchufaChecker {
}
