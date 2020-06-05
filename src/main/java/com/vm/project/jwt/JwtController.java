package com.vm.project.jwt;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vm.project.model.User;
import com.vm.project.repository.UserRepository;

@RestController
public class JwtController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
    private JwtService jwtService;
	
	@PostMapping("/user/login")
    public String signin(String email, String password, HttpServletResponse response){
    	Result result = Result.successInstance();
        User user = userRepository.findByEmail(email);
        if(user == null) {
        	throw new IllegalStateException("Wrong Email.");
        } 
        else {
        	if(!user.getPassword().equals(password)) {
        		throw new IllegalStateException("Wrong Password.");
        	} 
        }   	
        String token = jwtService.create("login", user, "user");
        response.setHeader("Authorization", token);
        result.setToken(token);
        return token;
    }

}
