package com.dwr.library.backend.entity;



import org.hibernate.annotations.CreationTimestamp;
import jakarta.persistence.*;
import java.sql.Date;
import lombok.Data;


//This Entity will create table in database
@Entity
@Table(name="review")
@Data //for creating getter and setter
public class Review {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // This will auto generate Id
    @Column(name = "id")
    private Long id;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "date")
    @CreationTimestamp
    private Date date;

    @Column(name = "rating")
    private double rating;

    @Column(name = "book_id")
    private Long bookId;

    @Column(name = "review_description")
    private String reviewDescription;
}
