package com.dwr.library.backend.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dwr.library.backend.dao.LibraryRepository;
import com.dwr.library.backend.entity.Library;
import com.dwr.library.backend.requestmodels.AdminQuestionRequest;

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
public class LibraryService {
	private LibraryRepository libraryRepository;

	public Library postQuestion(String userEmail, Library questionRequest) {
		Library services = new Library(questionRequest.getTitle(), questionRequest.getQuestion());
		services.setUserEmail(userEmail);
		return libraryRepository.save(services);
	}

	public Library responseQuestion(String adminEmail, AdminQuestionRequest adminQuestionRequest) throws Exception {
		Optional<Library> question = libraryRepository.findById(adminQuestionRequest.getQuestionId());
		if (!question.isPresent()) {
			throw new Exception("Question with this id not Found");
		}
		question.get().setResponse(adminQuestionRequest.getResponse());
		question.get().setAdminEmail(adminEmail);
		question.get().setClosed(true);

		return libraryRepository.save(question.get());
	}

}
