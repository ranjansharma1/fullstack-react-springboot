package com.dwr.library.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dwr.library.backend.entity.Review;
import com.dwr.library.backend.requestmodels.ReviewRequest;
import com.dwr.library.backend.service.ReviewService;
import com.dwr.library.backend.utils.ExtractJWT;

/**
 * @CrossOrigin("http://localhost:3000") is an annotation used in Spring Framework to allow HTTP requests 
 * 				from the specified origin ("http://localhost:3000") to access the resources exposed by the annotated controller. 
 * 				It enables Cross-Origin Resource Sharing (CORS) to prevent the browser from blocking requests from different domains, 
 * 				making it possible for your frontend application running on "http://localhost:3000" to communicate with the backend server.
 * 
 *Note that you can also specify multiple allowed origins by providing an array of strings to the @CrossOrigin annotation, 
 *				like `@CrossOrigin({"http://localhost:3000", "http://example.com"})
 *
 * @RequestBody: It is used in Spring to indicate that the incoming request should be converted to a Java object
 * 				and	mapped to a method parameter.
 * 
 * @RequestParam is used in Spring to extract query parameters or form data from the request 
 * 				and map them to method parameters in a controller method
 * 
 * POST API::
 * Authorization -> Type - Bearer Token -> Token number get from user login as access token
 * 
 * 
 * */

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

	@Autowired
	ReviewService reviewService;

	/**
	 * POST API: http://localhost:8080/api/reviews/secure
	 * 
	 * { "rating" : 5, "bookId" : 5, "reviewDescription" : "This book is awesome" }
	 * 
	 */
	@PostMapping("/secure")
	public Review submitReview(@RequestHeader(value = "Authorization") String token,
			@RequestBody ReviewRequest reviewRequest) throws Exception {
		String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
		System.out.println(reviewRequest);
		System.out.println(userEmail);
		if (userEmail == null)
			throw new Exception("User Email not found!");
		return reviewService.submitReview(userEmail, reviewRequest);
	}
	
	@GetMapping("/secure")
	public boolean isReviewListed(@RequestHeader(value="Authorization") String token, @RequestParam("bookId") Long bookId) throws Exception {
		String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
		if(userEmail==null)
				throw new Exception("User Email not found!");
		return reviewService.isReviewListed(userEmail, bookId);
	}

}