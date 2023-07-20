package com.dwr.library.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.dwr.library.backend.utils.ExtractJWT;

@SpringBootApplication
public class SpringBootLibraryApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootLibraryApplication.class, args);
	}

}
