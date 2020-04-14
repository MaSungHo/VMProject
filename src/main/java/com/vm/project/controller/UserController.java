 package com.vm.project.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.vm.project.repository.UserRepository;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

import com.vm.project.model.User;

@RestController
@CrossOrigin("*")
public class UserController {
	
	@Autowired
	UserRepository userRepository;
	
	@ApiOperation(value = "모든 유저 정보 조회")
	@GetMapping("/users")
	public ResponseEntity<List<User>> getAllUsers() {
		try {
			List<User> users = new ArrayList<User>();
			userRepository.findAll().forEach(users::add);
			if(users.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(users, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	 @ApiOperation(value = "특정 유저 정보 조회")
	    @ApiImplicitParams({
	            @ApiImplicitParam(name = "email", value = "조회할 사용자의 이메일", required = true, dataType = "string", paramType = "path", defaultValue = ""),
	    })
	@GetMapping("/users/{email}")
	public ResponseEntity<User> getUserByEmail(@PathVariable("email") String email) {
		User _user = userRepository.findByEmail(email);
		
		if(_user != null) {
			return new ResponseEntity<>(_user, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@ApiOperation(value = "새로운 유저 생성")
	@PostMapping("/users")
	public ResponseEntity<User> createUser(@RequestBody User user) {
		try {
			User _user = userRepository.save(new User(user.getId(), user.getEmail(), user.getGroup(), user.getPassword(), user.getVMs()));
			return new ResponseEntity<>(_user, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
		}
	}
	
	@ApiOperation(value = "유저 정보 수정")
	   @ApiImplicitParams({
	           @ApiImplicitParam(name = "email", value = "수정할 사용자의 이메일", required = true, dataType = "string", paramType = "path", defaultValue = ""),
	   })
	@PutMapping("/users/{email}")
	public ResponseEntity<User> updateUser(@PathVariable("email") String email, @RequestBody User user) {
		User _user = userRepository.findByEmail(email);
		
		if(_user != null) {
			_user.setEmail(user.getEmail());
			_user.setGroup(user.getGroup());
			_user.setVMs(user.getVMs());
			return new ResponseEntity<>(userRepository.save(_user), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@ApiOperation(value = "특정 유저 삭제")
	   @ApiImplicitParams({
	           @ApiImplicitParam(name = "email", value = "삭제할 사용자의 이메일", required = true, dataType = "string", paramType = "path", defaultValue = ""),
	   })
	@DeleteMapping("/users/{email}")
	public ResponseEntity<HttpStatus> deleteUser(@PathVariable("email") String email) {
		try {
			userRepository.deleteByEmail(email);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
	
	@ApiOperation(value = "전체 유저 삭제")
	@DeleteMapping("/users")
	public ResponseEntity<HttpStatus> deleteAllUsers() {
		try {
			userRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
	
}
