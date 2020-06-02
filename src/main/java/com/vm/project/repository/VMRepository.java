package com.vm.project.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.vm.project.model.VM;

public interface VMRepository extends MongoRepository<VM, String>{
	VM findByName(String name);
}
