package com.dwr.library.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dwr.library.backend.entity.Checkout;

/**
 * This class allows Spring to automatically create an implementation of this
 * interface at runtime, providing the necessary CRUD (Create, Read, Update,
 * Delete) operations for the Book entity.
 * 
 * @Repository is a Spring annotation used to mark a class as a Data Access
 *             Object (DAO) component. It enables Spring to automatically detect
 *             and manage the class as a repository for database operations,
 *             allowing you to perform data access and manipulation in your
 *             application.
 *
 * 
 * 
 */

@Repository
public interface CheckoutRepository extends JpaRepository<Checkout, Long> {
	Checkout findByUserEmailAndBookId(String userEmail, Long bookId);
}
