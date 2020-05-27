package com.vm.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.vm.project.model.Admin;
import com.vm.project.repository.AdminRepository;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import com.vm.project.service.AdminService;

@RestController
@CrossOrigin("*")
public class AdminController {
	
	@Autowired
	AdminRepository adminRepository;
	
	@Autowired
	AdminService adminService;
	
	@ApiOperation(value = "관리자를 이메일로 조회")
		@ApiImplicitParams({
			@ApiImplicitParam(name = "email", value = "조회할 관리자의 이메일", required = true, dataType = "string", paramType = "path", defaultValue = ""),
		})
	@GetMapping("/admin/{email:.+}/")
	public ResponseEntity<Admin> getAdminByEmail(@PathVariable String email) {
		return adminService.getAdminByEmail(email);
	}
	
	@ApiOperation(value = "JSON 객체의 정보와 관리자 정보를 비교")
	@PostMapping("/admin")
	public ResponseEntity<Admin> checkAdmin(@RequestBody Admin admin) {
		return adminService.checkAdmin(admin);
	}
	
	@ApiOperation(value = "사용자에게 관리자 권한 부여")
		@ApiImplicitParams({
			@ApiImplicitParam(name = "email", value = "관리자 권한을 부여할 사용자의 이메일", required = true, dataType = "string", paramType = "path", defaultValue = ""),
		})
	@GetMapping("/admin/user/{email:.+}/")
	public ResponseEntity<Admin> changeToAdmin(@PathVariable("email") String email) {
		return adminService.changeToAdmin(email);
	}
	
	@ApiOperation(value = "관리자를 이메일로 삭제")
		@ApiImplicitParams({
			@ApiImplicitParam(name = "email", value = "삭제할 관리자의 이메일", required = true, dataType = "string", paramType = "path", defaultValue = ""),
		})
	@DeleteMapping("/admin/{email:.+}/")
	public ResponseEntity<HttpStatus> deleteAdminByEmail(@PathVariable String email) {
		return adminService.deleteAdminByEmail(email);
	}
}
