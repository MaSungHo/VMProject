package com.vm.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.vm.project.model.ExistingVM;
import com.vm.project.model.VM;
import com.vm.project.service.VMService;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin("*")
public class VMController {
	
	@Autowired
	VMService vmService;
	
	@ApiOperation(value = "만들 수 있는 모든 VM 목록 조회")
	@GetMapping("/VMs")
	public ResponseEntity<List<VM>> getAllVMs() {
		return vmService.getAllVMs();
	}
	
    @ApiOperation(value = "특정 VM 종류 조회")
	    @ApiImplicitParams({
	            @ApiImplicitParam(name = "name", value = "새로 만들 VM 종류", required = true, dataType = "string", paramType = "path", defaultValue = ""),
	    })
	@GetMapping("/VMs/{name:.+}/")
	public ResponseEntity<VM> getVMByName(@PathVariable("name") String name) {
		return vmService.getVMByName(name);
	}
    
    @ApiOperation(value = "새로운 VM 생성")
    @PostMapping("/VMs/new")
    public ResponseEntity<HttpStatus> createVMByName(@RequestBody ExistingVM existingVM) {
    	return vmService.createVMByName(existingVM);
    }
    
}
