package com.vm.project.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.vm.project.model.Group;

public interface GroupRepository extends MongoRepository<Group, String> {
	Group findByName(String name);
	void deleteByName(String name);
}
