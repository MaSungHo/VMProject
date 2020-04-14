package com.vm.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.vm.project.model.Admin;
import com.vm.project.repository.AdminRepository;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;


@RestController
@CrossOrigin("*")
public class AdminController {
	
	@Autowired
	AdminRepository adminRepository;
	
	@ApiOperation(value = "관리자 정보 조회")
	   @ApiImplicitParams({
	           @ApiImplicitParam(name = "email", value = "관리자의 이메일", required = true, dataType = "string", paramType = "path", defaultValue = ""),
	   })
	@GetMapping("/admin/{email}")
	public ResponseEntity<Admin> getAdmin(@PathVariable("email") String email) {
		Admin _admin = adminRepository.findByEmail(email);
		
		if(_admin != null) {
			return new ResponseEntity<>(_admin, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
