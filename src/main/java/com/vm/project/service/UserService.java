package com.vm.project.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.vm.project.repository.GroupRepository;
import com.vm.project.repository.UserRepository;
import com.vm.project.model.Group;
import com.vm.project.model.User;


@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private GroupRepository groupRepository;
	
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
	
	public ResponseEntity<List<String>> getUsersEmail() {
		try {
			List<User> users = new ArrayList<User>();
			userRepository.findAll().forEach(users::add);
			
			if(users.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			
			List<String> userList = new ArrayList<String>();
			
			for(User e : users)
			{
				userList.add(e.getEmail());
			}
			
			return new ResponseEntity<>(userList, HttpStatus.OK);
			
		} catch(Exception e) {
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
	
	public ResponseEntity<List<User>> getUserByGroup(String group) {
		List<User> _users = userRepository.findByGroup(group);
		
		if(!_users.isEmpty()) {
			return new ResponseEntity<>(_users, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<User> createUser(User user) {
		try {
			User _user = userRepository.save(new User(user.getId(), user.getName(), user.getEmail(), user.getPassword(), user.getGroup(), user.getNum_VM()));
			Group _group = groupRepository.findByName(user.getGroup());
			if(_group != null) {
				_group.setNum_people(_group.getNum_people() + 1);
				groupRepository.save(_group);
			} else {
				return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
			}
			return new ResponseEntity<>(_user, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
		}
	}
	
	public ResponseEntity<User> updateUser(String email, User user) {
		User _user = userRepository.findByEmail(email);
		if(_user != null) {
			if(!_user.getGroup().equals(user.getGroup())) {
				Group before = groupRepository.findByName(_user.getGroup());
				Group after = groupRepository.findByName(user.getGroup());
				if(after == null) {
					return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
				}
				before.setNum_people(before.getNum_people() - 1);
				after.setNum_people(after.getNum_people() + 1);
				groupRepository.save(before);
				groupRepository.save(after);
			}
			_user.setName(user.getName());
			_user.setEmail(user.getEmail());
			_user.setGroup(user.getGroup());
			_user.setNum_VM(user.getNum_VM());
			return new ResponseEntity<>(userRepository.save(_user), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<HttpStatus> deleteUser(String email) {
		try {
			User _user = userRepository.findByEmail(email);
			Group _group = groupRepository.findByName(_user.getGroup());
			if(_group != null) {
				_group.setNum_people(_group.getNum_people() - 1);
				groupRepository.save(_group);
			} else {
				return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
			}
			userRepository.deleteByEmail(email);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
	
}
