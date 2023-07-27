package com.dwr.library.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.dwr.library.backend.entity.Book;
import com.dwr.library.backend.responsemodels.BorrowedBookResponse;
import com.dwr.library.backend.service.BookService;
import com.dwr.library.backend.utils.ExtractJWT;
/**
 * @CrossOrigin("http://localhost:3000") is an annotation used in Spring Framework to allow HTTP requests 
 * 				from the specified origin ("http://localhost:3000") to access the resources exposed by the annotated controller. 
 * 				It enables Cross-Origin Resource Sharing (CORS) to prevent the browser from blocking requests from different domains, 
 * 				making it possible for your frontend application running on "http://localhost:3000" to communicate with the backend server.
 * 
 *Note that you can also specify multiple allowed origins by providing an array of strings to the @CrossOrigin annotation, 
 *				like `@CrossOrigin({"http://localhost:3000", "http://example.com"})
 *
 * POST API:TOKEN:
 * Authorization -> Type - Bearer Token -> Token number get from user login as access token
 * */


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/books")
public class BookController {

	@Autowired
	private BookService bookService;

	//1. PutAPI: http://localhost:8080/api/books/secure/checkout?bookId=20
	@PutMapping("/secure/checkout")
	public Book checkedbook(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId)
			throws Exception {
		String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
		
		Book book=bookService.checkoutBook(userEmail, bookId);
		System.out.println("Added book in Checkout list: " + book);
		
		return book;
	}

	//2. GetAPI: http://localhost:8080/api/books/secure/ischeckout?bookId=20
	@GetMapping("/secure/ischeckout")
	public Boolean IscheckedBook(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId) {
		String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
		
		Boolean Ischecked=bookService.IsCheckedBook(userEmail, bookId);
		System.out.println("Is User checked in This book: " + Ischecked);
		
		return Ischecked;
	}

	//3. GetAPI: http://localhost:8080/api/books/secure/totalcheckedbooks
	@GetMapping("/secure/totalcheckedbooks")
	public int totalCheckedBooksByUser(@RequestHeader(value = "Authorization") String token) {
		String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
		int total=bookService.totalBookCheckedByUser(userEmail);
		System.out.println("Total book checked by user: "+total);
		return total;
	}
	
	//4. GetAPI: http://localhost:8080/api/books/secure/borrowedbook
	@GetMapping("/secure/borrowedbook")
	public List<BorrowedBookResponse> borrowedBookList(@RequestHeader(value = "Authorization") String token) {
		String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
		return bookService.totalCheckedBookList(userEmail);
	}

	//5. PutAPI: http://localhost:8080/api/books/secure/return?bookId=3
	@PutMapping("/secure/return")
	public String returnBook(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId) throws Exception {
		String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
		return bookService.returnBorrowedBook(userEmail, bookId);
	}
	
	//6. PutAPI: http://localhost:8080/api/books/secure/renew?bookId=8
	@PutMapping("/secure/renew")
	public String renewBook(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId) throws Exception {
		String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
		
		return bookService.renewBook(userEmail, bookId);
		
	}
}
