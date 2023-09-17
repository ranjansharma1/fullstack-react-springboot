package com.dwr.library.backend.config;

import java.util.ArrayList;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import springfox.documentation.service.Contact;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

@Configuration
@EnableWebMvc
public class SwaggerConfig {
	@Bean
	public Docket api() {
		return new Docket(DocumentationType.SWAGGER_2).apiInfo(getInfo()).select()
				// .apis(RequestHandlerSelectors.basePackage("com.dwr.library.backend.controller"))
				// //this will only expose controller
				.apis(RequestHandlerSelectors.any()) // it will expose all the endpoints
				.paths(PathSelectors.any()).build();
	}

	private ApiInfo getInfo() {

		String title = "Library Management";
		String titledescription = "This website deals with Book management in Library";
		String descriptionversion = "1.0";
		String versiontermsOfServiceUrl = "Terms of service";
		Contact contact = new Contact("Ranjan Sharma", "http://localhost:3000/home", "developwithranjan.com");
		String contactlicense = "License of API";
		String licenseUrl = "API License URL";

		return new ApiInfo(title, titledescription, descriptionversion, versiontermsOfServiceUrl, contact,
				contactlicense, licenseUrl, new ArrayList<>());
	}
}
