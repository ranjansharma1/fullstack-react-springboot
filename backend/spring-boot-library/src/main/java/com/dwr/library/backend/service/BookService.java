package com.dwr.library.backend.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.dwr.library.backend.dao.BookRepository;
import com.dwr.library.backend.dao.CheckoutRepository;
import com.dwr.library.backend.entity.Book;
import com.dwr.library.backend.entity.Checkout;

import jakarta.transaction.Transactional;
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

	// It Will add the book In Checkout List, If book is already not added
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

	// It will check whether book is added in checkout list or not for that
	// particular user
	public Boolean IsCheckedBook(String userEmail, Long bookId) {
		Checkout checkedBook = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
		if (checkedBook != null)
			return true;
		else
			return false;
	}

	// It will count total amount of book Checked by User
	public int totalBookCheckedByUser(String userEmail) {
		List<Checkout> checkedBooks = checkoutRepository.findByUserEmail(userEmail);
		System.out.println("Total checked Books: " + checkedBooks);
		return checkedBooks.size();
	}

}
