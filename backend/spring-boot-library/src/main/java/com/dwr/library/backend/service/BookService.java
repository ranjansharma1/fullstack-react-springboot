 package com.dwr.library.backend.service;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.dwr.library.backend.dao.BookRepository;
import com.dwr.library.backend.dao.CheckoutRepository;
import com.dwr.library.backend.entity.Book;
import com.dwr.library.backend.entity.Checkout;
import com.dwr.library.backend.responsemodels.BorrowedBookResponse;

import org.springframework.transaction.annotation.Transactional;
import lombok.AllArgsConstructor;

/**
 * @Service is a Spring annotation used to mark a class as a service bean that
 *          performs business logic and acts as an intermediary between the
 *          Controller and Data Access Object (DAO) layers. It enables Spring's
 *          dependency injection and component scanning for the service class.
 * 
 * @Transactional: When you apply the @Transactional annotation at the class
 *                 level in a Java Spring application, it means that all public
 *                 methods within that class will be executed within a single
 *                 database transaction. Transaction: It is a sequence of one or
 *                 more database operations that are performed as a single unit
 *                 of work. If any of the database operations within the
 *                 transaction fails, the entire transaction is rolled back, and
 *                 all changes made during the transaction are discarded,
 *                 ensuring data consistency and integrity.
 * 
 *                 Optional<Book> : Optional is a Java class that represents a
 *                 container object that may or may not contain a non-null
 *                 value. It is often used to handle scenarios where a value may
 *                 or may not be present, providing a way to avoid null pointer
 *                 exceptions and simplify error handling.
 * 
 * 
 * 
 */

@Service
@Transactional
@AllArgsConstructor
public class BookService {
	private BookRepository bookRepository;
	private CheckoutRepository checkoutRepository;

	//1. It Will add the book In Checkout List, If book is already not added
	public Book checkoutBook(String email, Long bookId) throws Exception {
		Optional<Book> book = bookRepository.findById(bookId);
		Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(email, bookId);

		if (!book.isPresent() || validateCheckout != null || book.get().getCopiesAvailable() <= 0) {
			throw new Exception("Book doesn't exist or already checked out by user");
		}

		// It will decrease book copies by 1
		book.get().setCopiesAvailable(book.get().getCopiesAvailable() - 1);

		// Updating the book value in book database
		bookRepository.save(book.get());

		// Adding the value in checkout
		Checkout checkedBook = new Checkout(email, LocalDate.now().toString(), LocalDate.now().plusDays(7).toString(),
				book.get().getId());

		// It is adding the value in checkout database
		checkoutRepository.save(checkedBook);

		return book.get();
	}

	//2. It will check whether book is added in checkout list or not for that particular user
	public Boolean IsCheckedBook(String userEmail, Long bookId) {
		Checkout checkedBook = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
		if (checkedBook != null)
			return true;
		else
			return false;
	}

	//3. It will count total amount of book Checked by User
	public int totalBookCheckedByUser(String userEmail) {
		List<Checkout> checkedBooks = checkoutRepository.findByUserEmail(userEmail);
//		System.out.println("Total checked Books: " + checkedBooks);
		return checkedBooks.size();
	}
	
	//4. It will show all the Borrowed book that is taken by User
 	public List<BorrowedBookResponse> totalCheckedBookList(String userEmail){
		List<BorrowedBookResponse> bookResponses=new ArrayList<>();
		List<Checkout> checkedBooks = checkoutRepository.findByUserEmail(userEmail);
		Optional<Book> book = null;
		int daysleft;
		for(Checkout checkout: checkedBooks) {
			daysleft=calculateDaysDifference(checkout.getCheckoutDate(), checkout.getReturnDate());
			book = bookRepository.findById(checkout.getBookId());
			bookResponses.add(new BorrowedBookResponse(daysleft, book));
		}
//		System.out.println("Total Borrowed Books: "+bookResponses.size());
		return bookResponses;
	}
	
	/*
	 * static: indicates that the method calculateDaysDifference belongs to the class itself and not to instances (objects) of the class. 
	 * 			This means that you can call the method directly using the class name without creating an instance of the class.*/
	public static int calculateDaysDifference(String checkoutDate, String returnDate) {
        // Parse the date strings into LocalDate objects
        LocalDate checkoutDateObj = LocalDate.parse(checkoutDate, DateTimeFormatter.ISO_LOCAL_DATE);
        LocalDate returnDateObj = LocalDate.parse(returnDate, DateTimeFormatter.ISO_LOCAL_DATE);
 
        // Calculate the difference between checkoutDate and returnDate
        long daysDifference = ChronoUnit.DAYS.between(checkoutDateObj, returnDateObj);
        return Math.toIntExact(daysDifference); // Convert the long value to int
	}
	
	//5. 	It will return the book from checkout database
	public String returnBorrowedBook(String userEmail, Long bookId) throws Exception {
		Optional<Book> book=bookRepository.findById(bookId);
		Checkout checkedBook=checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
		if(!book.isPresent() || checkedBook==null) {
			
			throw new Exception("Book does not exist or not checked out by user");
		}
		book.get().setCopiesAvailable(book.get().getCopiesAvailable()+1);
		bookRepository.save(book.get());
		checkoutRepository.deleteById(checkedBook.getId());
		return "Book return successfully!";
	}
	
	//6. Renew Borrow book for next 7days
	public String renewBook(String userEmail, Long bookId) throws Exception {
		Checkout checkedBook=checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
		if(checkedBook==null) {			
			throw new Exception("Book does not exist or not checked out by user");
		}

		// Get the current date
		LocalDate currentDate = LocalDate.now();

		// Parse the return date from the checkedBook
		LocalDate returnDate = LocalDate.parse(checkedBook.getReturnDate());
		//It set the return date in past date
//		returnDate=returnDate.minusDays(35);
		// Check if the returnDate is after the current date
		if (returnDate.isAfter(currentDate)) {
		    // If the returnDate is after the current date, extend it by 7 days
		    returnDate = returnDate.plusDays(7);
		}
		
		//It set the return date in past date
//		returnDate=returnDate.minusDays(35);

		// Update the returnDate in the checkedBook to the extended date
		checkedBook.setReturnDate(returnDate.toString());
		
		checkoutRepository.save(checkedBook);		
		
		return "Book Renewed for 7 days";		
	}
}
