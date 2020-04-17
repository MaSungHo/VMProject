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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.vm.project.model.LogInfo;
import com.vm.project.repository.LogInfoRepository;
import com.vm.project.service.LogInfoService;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin("*")
public class LogInfoController {
	
	@Autowired
	LogInfoRepository logInfoRepository;
	
	@Autowired
	LogInfoService logInfoService;
	
	@ApiOperation(value = "로그인 정보 조회")
	@GetMapping("/logInfo")
	public ResponseEntity<List<LogInfo>> getAllLogInfos() {
		return logInfoService.getAllLogInfos();
	}
	
	@ApiOperation(value = "로그인 정보 생성")
	@PostMapping("/logInfo")
	public ResponseEntity<LogInfo> createLogInfo(@RequestBody LogInfo logInfo) {
		return logInfoService.createLogInfo(logInfo);
	}
	
	@ApiOperation(value = "로그인 정보 삭제")
	   @ApiImplicitParams({
	           @ApiImplicitParam(name = "email", value = "삭제할 로그인 정보의 이메일", required = true, dataType = "string", paramType = "path", defaultValue = ""),
	   })
	@DeleteMapping("/logInfo/{email}")
	public ResponseEntity<HttpStatus> deleteLogInfo(@PathVariable("email") String email) {
		return logInfoService.deleteLogInfo(email);
	}
}
