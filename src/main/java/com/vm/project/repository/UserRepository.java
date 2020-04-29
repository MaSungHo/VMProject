package com.vm.project.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.vm.project.model.User;

public interface UserRepository extends MongoRepository<User, String>{
	List<User> findByName(String name);
	User findByEmail(String Email);
	List<User> findByGroup(String group);
	List<User> findByVMs(String VMs);
	void deleteByEmail(String email);
}
