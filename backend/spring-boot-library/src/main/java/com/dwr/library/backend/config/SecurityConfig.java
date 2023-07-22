package com.dwr.library.backend.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

/**
 * @Configuration is a Spring annotation used to indicate that a Java class is a
 *                configuration class. It is typically used to define Spring
 *                beans, configuration properties, and other
 *                application-specific configurations. When Spring bootstraps,
 *                it automatically scans for classes annotated
 *                with @Configuration and uses them to set up the application
 *                context and manage beans.
 * 
 *                Note this COnfiguration will is hide the dat pass through
 *                "/api/books/secure/" path, so In order to access it you have
 *                to go to postman > authorisation > type > BearerToken >
 */
@Configuration
public class SecurityConfig {

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		// Disable Cross Site Request Forgery
		http.csrf().disable();

		// Protect endpoints at /api/<type>/secure
		http.authorizeRequests(configurer -> configurer.antMatchers("/api/books/secure/**", "/api/reviews/secure/**").authenticated())
				.oauth2ResourceServer().jwt();

		// Add CORS filters
		http.cors();

		// Add content negotiation strategy
		http.setSharedObject(ContentNegotiationStrategy.class, new HeaderContentNegotiationStrategy());

		// Force a non-empty response body for 401's to make the response friendly
		Okta.configureResourceServer401ResponseBody(http);

		return http.build();
	}

}