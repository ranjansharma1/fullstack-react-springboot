package com.dwr.library.backend.responsemodels;

import java.util.Optional;

import com.dwr.library.backend.entity.Book;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor

public class BorrowedBookResponse {
	private int daysLeft;
	private Optional<Book> book;

}
