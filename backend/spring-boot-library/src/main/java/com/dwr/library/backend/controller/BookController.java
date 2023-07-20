package com.dwr.library.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.dwr.library.backend.entity.Book;
import com.dwr.library.backend.service.BookService;

@RestController
@RequestMapping("/api/books")
public class BookController {

	@Autowired
	private BookService bookService;

	// RestAPI: http://localhost:8080/api/books/secure/checkout?bookId=20
	@PutMapping("/secure/checkout")
	public Book checkedbook(@RequestParam Long bookId) throws Exception {
		System.out.println("bookId: " + bookId);
		String userEmail = "testuser@email.com";

		return bookService.checkoutBook(userEmail, bookId);
	}

	// RestAPI: http://localhost:8080/api/books/secure/ischeckout?bookId=20
	@GetMapping("/secure/ischeckout")
	public Boolean IscheckedBook(@RequestParam Long bookId) {
		String userEmail = "testuser@email.com";
		return bookService.IsCheckedBook(userEmail, bookId);
	}

	// RestAPI: http://localhost:8080/api/books/secure/totalcheckedbooks
	@GetMapping("/secure/totalcheckedbooks")
	public int totalCheckedBooksByUser() {
		String userEmail = "testuser@email.com";
		return bookService.totalBookCheckedByUser(userEmail);
	}
}
