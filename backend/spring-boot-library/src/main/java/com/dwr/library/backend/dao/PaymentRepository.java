package com.dwr.library.backend.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import com.dwr.library.backend.entity.Orders;

@Repository
public interface PaymentRepository extends JpaRepository<Orders, Long> {

	Orders findByOrderId(@RequestParam String orderId);
	
	// Custom query method to find orders by bookId and userEmail
    List<Orders> findByBookIdAndUserEmail(Long bookId, String userEmail);
}
