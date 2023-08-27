package com.dwr.library.backend.requestmodels;

import lombok.Data;


//These values are coming from client side(React Form data)
@Data
public class PaymentUserRequest {
    private int amount;
    private String username;
    private String remarks;
    private String contact;
    private String info;
    private String bookId;
    private String bookTitle;
}
