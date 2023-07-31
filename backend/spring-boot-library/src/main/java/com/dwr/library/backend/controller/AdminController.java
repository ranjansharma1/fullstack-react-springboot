package com.dwr.library.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dwr.library.backend.entity.Book;
import com.dwr.library.backend.requestmodels.AddNewBookRequest;
import com.dwr.library.backend.service.AdminService;
import com.dwr.library.backend.utils.ExtractJWT;

/**
 * @CrossOrigin("http://localhost:3000") is an annotation used in Spring Framework to allow HTTP requests 
 * 				from the specified origin ("http://localhost:3000") to access the resources exposed by the annotated controller. 
 * 				It enables Cross-Origin Resource Sharing (CORS) to prevent the browser from blocking requests from different domains, 
 * 				making it possible for your frontend application running on "http://localhost:3000" to communicate with the backend server.
 * 
 *Note that you can also specify multiple allowed origins by providing an array of strings to the @CrossOrigin annotation, 
 *				like `@CrossOrigin({"http://localhost:3000", "http://example.com"})
 *
 * POST API:TOKEN:
 * Authorization -> Type - Bearer Token -> Token number get from user login as access token
 * */

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/admin")
public class AdminController {
	@Autowired
	private AdminService adminService;
	
	/*POST API: http://localhost:8080/api/admin/secure/newBook
	 * {
		    "title" :  "Machine Learning in Python",
		    "author" : "John Myles White",
		    "description" : "Advanced Machine Learning with Python: Solve data science problems by mastering cutting-edge machine learning techniques in Python by John Hearty.",
		    "copies" : 30,
		    "category" : "BE"
		}
	 */
	@PostMapping("/secure/newBook")
	public Book postBook(@RequestHeader(value = "Authorization") String token, @RequestBody AddNewBookRequest newBookRequest) throws Exception {
		String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
		if (admin == null || !admin.equals("admin")) {
			throw new Exception("Administration page only");
		}
		return adminService.addNewBook(newBookRequest);
	}

}
