package com.vm.project.controller;

import java.util.List;
import java.util.Map;

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

import com.vm.project.model.ExistingVM;
import com.vm.project.service.ExistingVMService;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin("*")
public class ExistingVMController {
	
	@Autowired
	ExistingVMService existingVMService;
	
	@ApiOperation(value = "특정 사용자에게 할당된 모든 VM 조회 - 관리자용")
		@ApiImplicitParams({
			@ApiImplicitParam(name = "email", value = "VM 목록을 조회할 사용자의 이메일", required = true, dataType = "string", paramType = "path", defaultValue = ""),
		})
	@GetMapping("/existing/{email:.+}/admin")
	public ResponseEntity<List<ExistingVM>> getVMsByAdmin(@PathVariable String email) {
		return existingVMService.getVMsByAdmin(email);
	}
	
	@ApiOperation(value = "특정 사용자에게 할당된 모든 VM 조회 - 사용자용")
		@ApiImplicitParams({
			@ApiImplicitParam(name = "email", value = "VM 목록을 조회할 사용자의 이메일", required = true, dataType = "string", paramType = "path", defaultValue = ""),
		})
	@GetMapping("/existing/{email:.+}/user")
	public ResponseEntity<List<ExistingVM>> getVMsByEmail(@PathVariable String email, String token) {
		return existingVMService.getVMsByEmail(email, token);
	}
	
	@ApiOperation(value = "생성한 VM 이름으로 조회")
		@ApiImplicitParams({
			@ApiImplicitParam(name = "vmName", value = "조회할 VM의 이름", required = true, dataType = "string", paramType = "path", defaultValue = ""),
		})
	@GetMapping("/existing/{vmName}")
	public ResponseEntity<ExistingVM> getVMByVMName(@PathVariable String vmName) {
		return existingVMService.getVMByVMName(vmName);
	}
	
	@ApiOperation(value = "특정 사용자에게 할당된 VM 종류 조회")
		@ApiImplicitParams({
			@ApiImplicitParam(name = "email", value = "VM 종류를 조회할 사용자의 이메일", required = true, dataType = "string", paramType = "path", defaultValue = ""),
		})
	@GetMapping("/existing/{email:.+}/list")
	public ResponseEntity<List<String>> getVMListByEmail(@PathVariable String email) {
		return existingVMService.getVMListByEmail(email);
	}
	
	@ApiOperation(value = "VM를 중지")
		@ApiImplicitParams({
			@ApiImplicitParam(name = "resourceGroup", value = "중지할 VM이 속한 resourceGroup의 이름", required = true, dataType = "string", paramType = "path", defaultValue = ""),
			@ApiImplicitParam(name = "vmName", value = "중지할 VM의 이름", required = true, dataType = "string", paramType = "path", defaultValue = ""),
		})
	@PutMapping("/existing/stop/{resourceGroup}/{vmName}")
	public ResponseEntity<HttpStatus> stopVM(@PathVariable String resourceGroup, @PathVariable String vmName) {
		return existingVMService.stopVM(resourceGroup, vmName);
	}
	
	@ApiOperation(value = "VM를 시작")
		@ApiImplicitParams({
			@ApiImplicitParam(name = "resourceGroup", value = "시작할 VM이 속한 resourceGroup의 이름", required = true, dataType = "string", paramType = "path", defaultValue = ""),
			@ApiImplicitParam(name = "vmName", value = "시작할 VM의 이름", required = true, dataType = "string", paramType = "path", defaultValue = ""),
		})
	@PutMapping("/existing/start/{resourceGroup}/{vmName}")
	public ResponseEntity<HttpStatus> startVM(@PathVariable String resourceGroup, @PathVariable String vmName) {
		return existingVMService.startVM(resourceGroup, vmName);
	}
	
	@ApiOperation(value = "VM을 삭제함")
		@ApiImplicitParams({
			@ApiImplicitParam(name = "resourceGroup", value = "삭제할 VM이 속한 resourceGroup의 이름", required = true, dataType = "string", paramType = "path", defaultValue = ""),
			@ApiImplicitParam(name = "vmName", value = "삭제할 VM의 이름", required = true, dataType = "string", paramType = "path", defaultValue = ""),
		})
	@DeleteMapping("/existing/delete/{resourceGroup}/{vmName}")
	public ResponseEntity<HttpStatus> deleteVM(@PathVariable String resourceGroup, @PathVariable String vmName) {
		return existingVMService.deleteVM(resourceGroup, vmName);
	}
	
}
