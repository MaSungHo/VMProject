package com.vm.project.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.vm.project.model.LogInfo;
import com.vm.project.repository.LogInfoRepository;

@Service
public class LogInfoService {
	
	@Autowired
	private LogInfoRepository logInfoRepository;
	
	//전체 그룹 정보 조회
	public ResponseEntity<List<LogInfo>> getAllLogInfos() {
		try {
			List<LogInfo> logInfo = new ArrayList<LogInfo>();
			logInfoRepository.findAll().forEach(logInfo::add);
			
			if(logInfo.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			
			return new ResponseEntity<>(logInfo, HttpStatus.OK);
		} catch(Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}	
		
	public ResponseEntity<LogInfo> createLogInfo(LogInfo logInfo) {
		try {
			LogInfo _logInfo = logInfoRepository.save(new LogInfo(logInfo.getId(), logInfo.getEmail()));
			return new ResponseEntity<>(_logInfo, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
		}
	}
	
	public ResponseEntity<HttpStatus> deleteLogInfo(String email) {
		try {
			logInfoRepository.deleteByEmail(email);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
	
}
