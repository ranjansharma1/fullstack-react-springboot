package com.dwr.library.backend.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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
 *  This Repository will expose this link: http://localhost:8080/api/checkouts
 *  
 *  "DELETE FROM Checkout c": This part of the query specifies that the operation is a delete operation (DELETE) and 
 *  						that the target entity to delete is Checkout. 
 *  						The alias c is used as a shorthand to refer to the Checkout entity in the query.
 *  
 *  WHERE c.bookId = :bookId: This part of the query specifies the condition for deletion. 
 *  						It indicates that only the Checkout entities 
 *  						where the bookId attribute matches the provided value of bookId will be deleted.
 *  
 *  :bookId: This is a named parameter in the query. 
 *  			It serves as a placeholder for the actual value that will be passed to the method as the bookId parameter.
 *  
 *  Note: When the method deleteAllByBookId(Long bookId) in the repository is called, 
 *  		it will execute this JPQL query with the provided bookId value. 
 *  		The query will delete all Checkout entities where the bookId matches the provided value.

		For example, if you call deleteAllByBookId(123) in your code, it will execute the following query:
			DELETE FROM Checkout c WHERE c.bookId = 123
			This query will delete all Checkout entities where the bookId is equal to 123 from the database.
			
 */

@Repository
public interface CheckoutRepository extends JpaRepository<Checkout, Long> {
	//Exposed Link: http://localhost:8080/api/checkouts/search/findByUserEmailAndBookId{?userEmail,bookId}
	Checkout findByUserEmailAndBookId(String userEmail, Long bookId);

	//Exposed Link: http://localhost:8080/api/checkouts/search/findByUserEmail{?email}
	List<Checkout> findByUserEmail(String email);
	
	 @Modifying
	 @Query("DELETE FROM Checkout c WHERE c.bookId = :bookId")
    void deleteAllByBookId(@Param("bookId") Long bookId);
}
