package com.vm.project.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.vm.project.repository.GroupRepository;
import com.vm.project.repository.UserRepository;
import com.vm.project.model.Group;
import com.vm.project.model.User;

@Service
public class GroupService {

	@Autowired
	private GroupRepository groupRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	//전체 그룹 정보 조회
	public ResponseEntity<List<Group>> getAllGroups() {
		try {
			List<Group> groups = new ArrayList<Group>();
			groupRepository.findAll().forEach(groups::add);
			
			if(groups.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			
			return new ResponseEntity<>(groups, HttpStatus.OK);
		} catch(Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	//특정 그룹 정보 조회
	public ResponseEntity<Group> getGroupByName(String name) {
		Group _group = groupRepository.findByName(name);
		
		if(_group != null) {
			
			return new ResponseEntity<>(_group, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	//그룹에 속한 사용자들 조회
	public ResponseEntity<List<User>>getUsersByGroupName(String name) {
		try {
			List<User> users = new ArrayList<User>();
			userRepository.findByGroup(name).forEach(users::add);
			if(users.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			} 			
			return new ResponseEntity<>(users, HttpStatus.OK);
		} catch(Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	//새로운 그룹 생성
	public ResponseEntity<Group> createGroup(Group group) {
		try {
			Group _group = groupRepository.save(new Group(group.getId(), group.getName(), group.getNum_people()));
			return new ResponseEntity<>(_group, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
		}
	}
	
	//그룹 정보 업데이트
	public ResponseEntity<Group> updateGroup(String name, Group group) {
		Group _group = groupRepository.findByName(name);
		
		if(_group != null) {
			_group.setName(group.getName());
			return new ResponseEntity<>(groupRepository.save(_group), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	//특정 그룹 삭제
	public ResponseEntity<HttpStatus> deleteGroup(String name) {
		try {
			groupRepository.deleteByName(name);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
	
}
