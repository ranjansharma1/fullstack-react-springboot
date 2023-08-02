package com.dwr.library.backend.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import com.dwr.library.backend.entity.Review;

/**
 * This class allows Spring to automatically create an implementation of this
 * interface at runtime, providing the necessary CRUD (Create, Read, Update,
 * Delete) operations for the Book entity.
 * 
 * 
 * Page<Book>: This specifies the return type of the method. It indicates that
 * the method will return a page of Book objects. In Java, a Page is a data
 * structure that represents a chunk or segment of a larger collection of items,
 * allowing for pagination and efficient retrieval of data.
 * 
 * @RequestParam("category") String category: This annotation indicates that the
 * category parameter will be supplied as a request parameter when invoking this
 * method. The value within quotes, "category," corresponds to the name of the
 * request parameter. The String category parameter itself represents the
 * category value to be searched.
 * 
 * Pageable pageable: This parameter represents the pagination information,
 * allowing for the control of the result set's size and ordering. Pageable is
 * an interface in Spring Data that provides methods for specifying pagination
 * parameters like page number, page size, and sorting options.
 * 
 * *
	 * 
	 * Review findByBookId(@RequestParam("book_id") Long bookId);
	 * 
	 * This Repository will expose this link
	 * http://localhost:8080/api/reviews/search/findByBookId{?bookId}
	 * 
 * 
 *   "DELETE FROM Checkout c": This part of the query specifies that the operation is a delete operation (DELETE) and 
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
			DELETE FROM Review r WHERE r.bookId = 123
			This query will delete all Checkout entities where the bookId is equal to 123 from the database.
 */

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
	
	//Expose Link: http://localhost:8080/api/reviews/search/findByBookId{?bookId,page,size,sort}
	Page<Review> findByBookId(@RequestParam("book_id") Long bookId, Pageable pageable);	

	//Expose Link: http://localhost:8080/api/reviews/search/findByUserEmailAndBookId{?userEmail,bookId}
	Review findByUserEmailAndBookId(String userEmail, Long bookId);
	
	 @Modifying
	 @Query("DELETE FROM Review r WHERE r.bookId = :bookId")
    void deleteAllByBookId(@Param("bookId") Long bookId);
	
}
