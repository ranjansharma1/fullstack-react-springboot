package com.dwr.library.backend.controller;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dwr.library.backend.requestmodels.PaymentUserRequest;
import com.dwr.library.backend.service.PaymentService;
import com.razorpay.*;

/**
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
@RequestMapping("/api/payment")
public class PaymentController {
	
	@Autowired
	private PaymentService paymentService;
	
	
	/**
	 * POST API: http://localhost:8080/api/payment/create-order { "amount":120 }
	 */
	@PostMapping("/create-order")
	public String razorPayment(@RequestBody PaymentUserRequest userRequest) throws RazorpayException {
		
		//printing data coming from client
		System.out.println(userRequest);
		
		// Return the order details as a string
		return paymentService.createOrder(userRequest);
	}

}
