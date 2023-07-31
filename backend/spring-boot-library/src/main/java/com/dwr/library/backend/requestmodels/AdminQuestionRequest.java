package com.dwr.library.backend.requestmodels;

import lombok.Data;

@Data
public class AdminQuestionRequest {
	private long questionId;
	private String response;
}
