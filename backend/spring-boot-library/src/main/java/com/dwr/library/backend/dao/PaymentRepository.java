package com.dwr.library.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dwr.library.backend.entity.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

}
