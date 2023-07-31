package com.dwr.library.backend.requestmodels;

import lombok.Data;

@Data
public class AddNewBookRequest {

	private String title;

	private String author;

	private String description;

	private int copies;

	private String category;

	private String img;
}
