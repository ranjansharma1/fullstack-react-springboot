package com.dwr.library.backend.service;

import java.time.LocalDate;

import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dwr.library.backend.dao.PaymentRepository;
import com.dwr.library.backend.entity.Orders;
import com.dwr.library.backend.requestmodels.CapturePaymentRequest;
import com.dwr.library.backend.requestmodels.PaymentUserRequest;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class PaymentService {
	private static final String KEY_ID = "rzp_test_vcZv5OgSAZ4MBg"; // Your Rozarpay key_id value
	private static final String KEY_SECRET = "tEYlgvshOT7zp1XaTjyukkLO"; // Your Rozarpay key_secret value

	PaymentRepository paymentRepository;

	public Orders createOrder(PaymentUserRequest userRequest) throws RazorpayException {

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

		// Save Order in database
		Orders payment = new Orders();
		payment.setAmount(userRequest.getAmount());
		payment.setPhoneNumber(userRequest.getContact());
		payment.setUserEmail(userRequest.getEmail());
		payment.setUserName(userRequest.getUsername());
		payment.setOrderId(order.get("id"));
		payment.setStatus(order.get("status"));
		payment.setPaymentDate(LocalDate.now());
		paymentRepository.save(payment);

		// Return the order details as a string
		return payment;
	}

	public Orders updateOrder(CapturePaymentRequest paymentRequest) throws Exception {
		Orders order = paymentRepository.findByOrderId(paymentRequest.getOrderId());

		if (order == null)
			throw new Exception("Something went wrong");

		// updating payment details
		order.setTransactionId(paymentRequest.getTransactionId());
		order.setStatus(paymentRequest.getStatus());
		order.setPaymentDate(LocalDate.now());

		paymentRepository.save(order);

		return order;
	}
}
