package com.dwr.library.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.dwr.library.backend.entity.Book;
import com.dwr.library.backend.entity.History;
import com.dwr.library.backend.entity.Library;
import com.dwr.library.backend.entity.Review;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

	private String theAllowedOrigins = "*"; //old-  http://localhost:3000 Change Req: k8s

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
		HttpMethod[] theUnsupportedActions = { HttpMethod.POST, HttpMethod.PATCH, HttpMethod.DELETE, HttpMethod.PUT };

		//This will show Id For Respective class (Expose Primary Key)
		config.exposeIdsFor(Book.class);
		config.exposeIdsFor(Review.class);
		config.exposeIdsFor(History.class);
		config.exposeIdsFor(Library.class);
		
		//This will restrict the access for creating, updating and deleting or editing the table
		disableHttpMethods(Book.class, config, theUnsupportedActions);
		disableHttpMethods(Review.class, config, theUnsupportedActions);
		disableHttpMethods(History.class, config, theUnsupportedActions);
		disableHttpMethods(Library.class, config, theUnsupportedActions);

		/* Configure CORS Mapping */
		cors.addMapping(config.getBasePath() + "/**").allowedOrigins(theAllowedOrigins);
	}

	private void disableHttpMethods(Class theClass, RepositoryRestConfiguration config,
			HttpMethod[] theUnsupportedActions) {
		config.getExposureConfiguration().forDomainType(theClass)
				.withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
				.withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
	}

}
