package com.dwr.library.backend.entity;

import java.sql.Date;
import java.time.LocalDate;

import javax.persistence.*;

import lombok.Data;

//This Entity will create table in database
@Entity
@Table(name = "payment") 
@Data //for creating getter and setter
public class Payment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // This will auto generate Id
	private Long id;
	
	private String orderId;
	
	private String transectionId;	
	
	private int amount;
	
	private String userName;

	private String userEmail;
	
	private String phoneNumber;
	
	private String status;
	
	private String bookTitle;
	
	@Column(name = "payment_date") // Column for the payment date
	private LocalDate paymentDate; // Use LocalDate to store only date or LocalDateTime for both date and time

}
