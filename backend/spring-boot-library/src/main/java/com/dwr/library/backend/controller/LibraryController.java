package com.dwr.library.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dwr.library.backend.entity.Library;
import com.dwr.library.backend.requestmodels.AdminQuestionRequest;
import com.dwr.library.backend.service.LibraryService;
import com.dwr.library.backend.utils.ExtractJWT;

/**
 * POST requests are typically used for creating new resources on the server.
 * PUT requests are typically used for updating existing resources on the
 * server.
 * 
 * @CrossOrigin("http://localhost:3000") is an annotation used in Spring
 * Framework to allow HTTP requests from the specified origin
 * ("http://localhost:3000") to access the resources exposed by the annotated
 * controller. It enables Cross-Origin Resource Sharing (CORS) to prevent the
 * browser from blocking requests from different domains, making it possible for
 * your frontend application running on "http://localhost:3000" to communicate
 * with the backend server.
 * 
 * Note that you can also specify multiple allowed origins by providing an array
 * of strings to the @CrossOrigin annotation, like
 * `@CrossOrigin({"http://localhost:3000", "http://example.com"})
 *
 * POST API:TOKEN: Authorization -> Type - Bearer Token -> Token number get from
 * user login as access token
 */

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/libraries")
public class LibraryController {
	@Autowired
	LibraryService libraryService;

	/*
	 * Post API: http://localhost:8080/api/libraries/secure/user { "title" :
	 * "Book Request", "question":
	 * "Please Upload Book Related to Machine Learning and AI" }
	 */
	@PostMapping("/secure/user")
	public Library postQuestion(@RequestHeader(value = "Authorization") String token,
			@RequestBody Library questionRequest) {
		String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
		return libraryService.postQuestion(userEmail, questionRequest);
	}

	/**PUT API: http://localhost:8080/api/libraries/secure/admin 
	 * {
		    "id" :  3,
		    "response" : "Working on this issue"
		}	 
	 * */
	@PutMapping("/secure/admin")
	public Library responseQuestion(@RequestHeader(value = "Authorization") String token,
			@RequestBody AdminQuestionRequest admRequest) throws Exception {
//		System.out.println(admRequest);
		String adminEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
		System.out.println("admin Email: "+adminEmail);
		String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
		if (admin == null || !admin.equals("admin")) {
			throw new Exception("Administration page only");
		}

		return libraryService.responseQuestion(adminEmail, admRequest);
	}
}
