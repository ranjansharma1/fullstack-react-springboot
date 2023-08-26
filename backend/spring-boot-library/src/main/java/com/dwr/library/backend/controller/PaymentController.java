package com.dwr.library.backend.controller;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
	private static final String KEY_ID = "rzp_test_vcZv5OgSAZ4MBg"; // Your Rozarpay key_id value
	private static final String KEY_SECRET = "tEYlgvshOT7zp1XaTjyukkLO"; // Your Rozarpay key_secret value

	/**
	 * POST API: http://localhost:8080/api/payment/create-order { "amount":120 }
	 */
	@PostMapping("/create-order")
	public String razorPayment(@RequestBody Map<String, Object> data) throws RazorpayException {
		//data
		System.out.println(data);
		// Extract the amount from the request data
		int amount = (int) data.get("amount");

		// Create a Razorpay client instance
		RazorpayClient razorpay = new RazorpayClient(KEY_ID, KEY_SECRET);

		// Prepare the order request parameters
		JSONObject orderRequest = new JSONObject();
		orderRequest.put("amount", amount * 100); // amount in the smallest currency unit (Paisa)
		orderRequest.put("currency", "INR");
		orderRequest.put("receipt", "order_rcptid_11");

		// Create the order using the Razorpay client
		Order order = razorpay.orders.create(orderRequest);
		System.out.println(order);

		// Return the order details as a string
		return order.toString();
	}

}
