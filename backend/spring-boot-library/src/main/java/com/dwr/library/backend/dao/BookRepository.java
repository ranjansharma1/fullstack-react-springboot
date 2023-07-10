package com.dwr.library.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dwr.library.backend.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long>{

}
