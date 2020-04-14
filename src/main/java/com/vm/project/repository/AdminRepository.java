package com.vm.project.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.vm.project.model.Admin;

public interface AdminRepository extends MongoRepository<Admin, String>{
	Admin findByEmail(String email);
}
