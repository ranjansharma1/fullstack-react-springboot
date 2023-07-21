package com.dwr.library.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.dwr.library.backend.entity.Book;
import com.dwr.library.backend.service.BookService;
import com.dwr.library.backend.utils.ExtractJWT;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/books")
public class BookController {

	@Autowired
	private BookService bookService;

	// RestAPI: http://localhost:8080/api/books/secure/checkout?bookId=20
	@PutMapping("/secure/checkout")
	public Book checkedbook(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId)
			throws Exception {
		String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
		
		Book book=bookService.checkoutBook(userEmail, bookId);
		System.out.println("Added book in Checkout list: " + book);
		
		return book;
	}

	// RestAPI: http://localhost:8080/api/books/secure/ischeckout?bookId=20
	@GetMapping("/secure/ischeckout")
	public Boolean IscheckedBook(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId) {
		String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
		
		Boolean Ischecked=bookService.IsCheckedBook(userEmail, bookId);
		System.out.println("Is User checked in This book: " + Ischecked);
		
		return Ischecked;
	}

	// RestAPI: http://localhost:8080/api/books/secure/totalcheckedbooks
	@GetMapping("/secure/totalcheckedbooks")
	public int totalCheckedBooksByUser(@RequestHeader(value = "Authorization") String token) {
		String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
		int total=bookService.totalBookCheckedByUser(userEmail);
		System.out.println("Total book checked by user: "+total);
		return total;
	}
}
