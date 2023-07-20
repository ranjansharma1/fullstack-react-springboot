package com.dwr.library.backend.entity;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "checkout")
@NoArgsConstructor
@Data
public class Checkout {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "user_email")
	private String userEmail;

	@Column(name = "checkout_date")
	private String checkoutDate;

	@Column(name = "return_date")
	private String returnDate;

	@Column(name = "book_id")
	private Long bookId;

	public Checkout(String userEmail, String checkoutDate, String returnDate, Long bookId) {
		this.userEmail = userEmail;
		this.checkoutDate = checkoutDate;
		this.returnDate = returnDate;
		this.bookId = bookId;
	}

}
