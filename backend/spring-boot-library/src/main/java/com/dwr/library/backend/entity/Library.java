package com.dwr.library.backend.entity;

import javax.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="messages")
@Data
@NoArgsConstructor
public class Library {
	
    public Library(String title, String question) {
        this.title = title;
        this.question = question;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="user_email")
    private String userEmail;

    @Column(name="title")
    private String title;

    @Column(name="question")
    private String question;

    @Column(name="admin_email")
    private String adminEmail;

    @Column(name="response")
    private String response;

    @Column(name="closed")
    private boolean closed;
}
