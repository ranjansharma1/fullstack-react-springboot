package com.dwr.library.backend.service;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.dwr.library.backend.requestmodels.PaymentUserRequest;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@Service
public class PaymentService {
	private static final String KEY_ID = "rzp_test_vcZv5OgSAZ4MBg"; // Your Rozarpay key_id value
	private static final String KEY_SECRET = "tEYlgvshOT7zp1XaTjyukkLO"; // Your Rozarpay key_secret value


	public String createOrder(PaymentUserRequest userRequest) throws RazorpayException {
		
		// Create a Razorpay client instance
		RazorpayClient razorpay = new RazorpayClient(KEY_ID, KEY_SECRET);

		// Prepare the order request parameters
		JSONObject orderRequest = new JSONObject();
		orderRequest.put("amount", userRequest.getAmount() * 100); // amount in the smallest currency unit (Paisa)
		orderRequest.put("currency", "INR");
		orderRequest.put("receipt", "order_rcptid_11");

		// Create the order using the Razorpay client
		Order order = razorpay.orders.create(orderRequest);
		System.out.println(order);

		// Return the order details as a string
		return order.toString();
	}
}
