package com.dwr.library.backend.service;

import java.sql.Date;
import java.time.LocalDate;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dwr.library.backend.dao.ReviewRepository;
import com.dwr.library.backend.entity.Review;
import com.dwr.library.backend.requestmodels.ReviewRequest;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class ReviewService {
	private ReviewRepository reviewRepository;

	public Review submitReview(String userEmail, ReviewRequest reviewRequest) throws Exception {
		Review review = reviewRepository.findByUserEmailAndBookId(userEmail, reviewRequest.getBookId());
		if (review != null)
			throw new Exception("Review for this book already created");
		Review newReview = new Review();
		newReview.setUserEmail(userEmail);
		newReview.setDate(Date.valueOf(LocalDate.now()));
		newReview.setBookId(reviewRequest.getBookId());
		newReview.setRating(reviewRequest.getRating());
		// It will set book description if persent else null
		if (reviewRequest.getReviewDescription().isPresent()) {
			newReview.setReviewDescription(reviewRequest.getReviewDescription().map(Object::toString).orElse(null));
		}
		return reviewRepository.save(newReview);
	}
	
	public boolean isReviewListed(String userEmail, Long bookId) {
		
		Review review = reviewRepository.findByUserEmailAndBookId(userEmail, bookId);
		System.out.println(review);
		if (review != null)
			return true;
		return false;
	}

}
