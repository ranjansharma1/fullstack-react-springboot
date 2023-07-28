package com.dwr.library.backend.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import com.dwr.library.backend.entity.History;


/**
 * This class allows Spring to automatically create an implementation of this
 * interface at runtime, providing the necessary CRUD (Create, Read, Update,
 * Delete) operations for the Book entity.
 * 
 * 
 * Page<Book>: This specifies the return type of the method. It indicates that
 * the method will return a page of Book objects. In Java, a Page is a data
 * structure that represents a chunk or segment of a larger collection of items,
 * allowing for pagination and efficient retrieval of
 * data. 
 * 
 * @RequestParam("category") String category: This annotation indicates
 * that the category parameter will be supplied as a request parameter when
 * invoking this method. The value within quotes, "category," corresponds to the
 * name of the request parameter. The String category parameter itself
 * represents the category value to be searched. 
 * 
 * Pageable pageable: This parameter represents the pagination information, allowing for the control of
 * the result set's size and ordering. 
 * 
 * Pageable is an interface in Spring Data that provides methods for specifying pagination parameters like page number,
 * page size, and sorting options.
 * 
 * This Repository will expose this link: http://localhost:8080/api/histories
 */

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {

	//Exposed URL: http://localhost:8080/api/histories/search/findBookByUserEmail?userEmail=testuser@email.com
	List<History> findBookByUserEmail(@RequestParam("email") String userEmail);
}
