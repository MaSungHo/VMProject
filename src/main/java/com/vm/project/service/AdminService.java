package com.vm.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.vm.project.repository.UserRepository;
import com.vm.project.repository.AdminRepository;
import com.vm.project.model.User;
import com.vm.project.model.Admin;

@Service
public class AdminService {
	
	@Autowired
	private AdminRepository adminRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	public ResponseEntity<Admin> checkAdmin(Admin admin) {
		Admin _admin = adminRepository.findByEmail(admin.getEmail());
		
		if(_admin == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		if(_admin.getPassword().equals(admin.getPassword())) {
			return new ResponseEntity<>(_admin, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	public ResponseEntity<Admin> changeToAdmin(String email) {
		System.out.println(email);
		User user = userRepository.findByEmail(email);
		
		if(user != null) {
			System.out.println("safdasfdasfd");
			Admin admin = new Admin(user.getId(), user.getName(), user.getEmail(), user.getPassword());
			adminRepository.save(admin);
			return new ResponseEntity<>(admin, HttpStatus.CREATED);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
}
