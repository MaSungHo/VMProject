package com.vm.project.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.vm.project.model.LogInfo;

public interface LogInfoRepository extends MongoRepository<LogInfo, String> {
	void deleteByEmail(String email);
}
