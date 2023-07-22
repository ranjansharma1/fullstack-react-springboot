package com.dwr.library.backend.requestmodels;

import java.util.Optional;

import lombok.Data;

@Data
public class ReviewRequest {

	private double rating;
	private long bookId;
	private Optional<String> reviewDescription;
}
