package com.dwr.library.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import com.dwr.library.backend.entity.Orders;

@Repository
public interface PaymentRepository extends JpaRepository<Orders, Long> {

	Orders findByOrderId(@RequestParam String orderId);
}
