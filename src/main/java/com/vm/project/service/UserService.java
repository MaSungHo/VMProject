package com.vm.project.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.vm.project.repository.UserRepository;
import com.vm.project.model.User;


@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
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
	
	public ResponseEntity<User> getUserByEmail(String email) {
		User _user = userRepository.findByEmail(email);
		
		if(_user != null) {
			return new ResponseEntity<>(_user, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<User> createUser(User user) {
		try {
			User _user = userRepository.save(new User(user.getId(), user.getName(), user.getEmail(), user.getPassword(), user.getGroup(), user.getVMs()));
			return new ResponseEntity<>(_user, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
		}
	}
	
	public ResponseEntity<User> updateUser(String email, User user) {
		User _user = userRepository.findByEmail(email);
		
		if(_user != null) {
			_user.setName(user.getName());
			_user.setEmail(user.getEmail());
			_user.setGroup(user.getGroup());
			_user.setVMs(user.getVMs());
			return new ResponseEntity<>(userRepository.save(_user), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<HttpStatus> deleteUser(String email) {
		try {
			userRepository.deleteByEmail(email);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
	
	public ResponseEntity<HttpStatus> deleteAllUsers() {
		try {
			userRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
	
}
