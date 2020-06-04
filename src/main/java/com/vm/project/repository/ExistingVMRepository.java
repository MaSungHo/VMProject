package com.vm.project.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.vm.project.model.ExistingVM;

public interface ExistingVMRepository extends MongoRepository<ExistingVM, String>{
	List<ExistingVM> findByUserEmail(String userEmail);
	ExistingVM findByVmName(String vmName);
	void deleteByVmName(String vmName);
}