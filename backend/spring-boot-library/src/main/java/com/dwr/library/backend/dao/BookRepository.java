package com.dwr.library.backend.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

import com.dwr.library.backend.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long>{
	Page<Book> findByTitleContaining(@RequestParam("title") String title, Pageable pageable);
	Page<Book> findByCategory(@RequestParam("category") String category, Pageable pageable);
}

//
//Page<Book>: This specifies the return type of the method. It indicates that the method will return a page of Book objects. In Java, a Page is a data structure that represents a chunk or segment of a larger collection of items, allowing for pagination and efficient retrieval of data.

//@RequestParam("category") String category: This annotation indicates that the category parameter will be supplied as a request parameter when invoking this method. The value within quotes, "category," corresponds to the name of the request parameter. The String category parameter itself represents the category value to be searched.

//Pageable pageable: This parameter represents the pagination information, allowing for the control of the result set's size and ordering. Pageable is an interface in Spring Data that provides methods for specifying pagination parameters like page number, page size, and sorting options.