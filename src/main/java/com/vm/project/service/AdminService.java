package com.vm.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.vm.project.repository.AdminRepository;
import com.vm.project.model.Admin;

@Service
public class AdminService {
	
	@Autowired
	private AdminRepository adminRepository;
	
	public ResponseEntity<Admin> getAdmin(String email) {
		Admin _admin = adminRepository.findByEmail(email);
		
		if(_admin != null) {
			return new ResponseEntity<>(_admin, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
}
