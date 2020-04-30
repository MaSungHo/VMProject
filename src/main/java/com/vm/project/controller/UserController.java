 package com.vm.project.controller;

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
import com.vm.project.model.User;
import com.vm.project.service.UserService;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;



@RestController
@CrossOrigin("*")
public class UserController {
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	UserService userService;
	
	@ApiOperation(value = "모든 유저 정보 조회")
	@GetMapping("/users")
	public ResponseEntity<List<User>> getAllUsers() {
		return userService.getAllUsers();
	}
	
    @ApiOperation(value = "특정 유저 정보 조회")
	    @ApiImplicitParams({
	            @ApiImplicitParam(name = "email", value = "조회할 사용자의 이메일", required = true, dataType = "string", paramType = "path", defaultValue = ""),
	    })
	@GetMapping("/users/{email:.+}")
	public ResponseEntity<User> getUserByEmail(@PathVariable("email") String email) {
		return userService.getUserByEmail(email);
	}
	
    @ApiOperation(value = "그룹 이름으로 사용자 조회")
    	@ApiImplicitParams({
            	@ApiImplicitParam(name = "group", value = "사용자의 그룹", required = true, dataType = "string", paramType = "path", defaultValue = ""),
    	})
    @GetMapping("/users/{group}")
    public ResponseEntity<List<User>> getUserByGroup(@PathVariable("group") String group) {
    	return userService.getUserByGroup(group);
    }
    
	@ApiOperation(value = "새로운 유저 생성")
	@PostMapping("/users")
	public ResponseEntity<User> createUser(@RequestBody User user) {
		return userService.createUser(user);
	}
	
	@ApiOperation(value = "유저 정보 수정")
	   @ApiImplicitParams({
	           @ApiImplicitParam(name = "email", value = "수정할 사용자의 이메일", required = true, dataType = "string", paramType = "path", defaultValue = ""),
	   })
	@PutMapping("/users/{email:.+}")
	public ResponseEntity<User> updateUser(@PathVariable("email") String email, @RequestBody User user) {
		return userService.updateUser(email, user);
	}
	
	@ApiOperation(value = "특정 유저 삭제")
	   @ApiImplicitParams({
	           @ApiImplicitParam(name = "email", value = "삭제할 사용자의 이메일", required = true, dataType = "string", paramType = "path", defaultValue = ""),
	   })
	@DeleteMapping("/users/{email:.+}")
	public ResponseEntity<HttpStatus> deleteUser(@PathVariable("email") String email) {
		return userService.deleteUser(email);
	}
	
}
