package com.dwr.library.backend.requestmodels;

import lombok.Data;

@Data
public class CapturePaymentRequest {
    private String transactionId;
    private String orderId;
    private String status;
}
