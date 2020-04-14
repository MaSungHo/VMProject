package com.vm.project.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.vm.project.model.Group;
import com.vm.project.repository.GroupRepository;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin("*")
public class GroupController {

	@Autowired
	GroupRepository groupRepository;
	
	@ApiOperation(value = "전체 그룹 조회")
	@GetMapping("/groups")
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
	
	@ApiOperation(value = "특정 그룹 조회")
	   @ApiImplicitParams({
	           @ApiImplicitParam(name = "name", value = "조회할 그룹 이름", required = true, dataType = "string", paramType = "path", defaultValue = ""),
	   })
	@GetMapping("/groups/{name}")
	public ResponseEntity<Group> getGroupByName(@PathVariable("name") String name) {
		Group _group = groupRepository.findByName(name);
		
		if(_group != null) {
			return new ResponseEntity<>(_group, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@ApiOperation(value = "새로운 그룹 생성")
	@PostMapping("/groups")
	public ResponseEntity<Group> createGroup(@RequestBody Group group) {
		try {
			Group _group = groupRepository.save(new Group(group.getId(), group.getName(), group.getNum_people()));
			return new ResponseEntity<>(_group, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
		}
	}
	
	@ApiOperation(value = "특정 그룹 정보 수정")
	   @ApiImplicitParams({
	           @ApiImplicitParam(name = "name", value = "수정할 그룹 이름", required = true, dataType = "string", paramType = "path", defaultValue = ""),
	   })
	@PutMapping("/groups/{name}")
	public ResponseEntity<Group> updateGroup(@PathVariable("name") String name, @RequestBody Group group) {
		Group _group = groupRepository.findByName(name);
		
		if(group == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			_group.setId(group.getId());
			_group.setName(group.getName());
			_group.setNum_people(group.getNum_people());
			return new ResponseEntity<>(groupRepository.save(_group), HttpStatus.OK);
		}
	}
	
	@ApiOperation(value = "특정 그룹 삭제")
	   @ApiImplicitParams({
	           @ApiImplicitParam(name = "name", value = "삭제할 그룹 이름", required = true, dataType = "string", paramType = "path", defaultValue = ""),
	   })
	@DeleteMapping("/groups/{name}")
	public ResponseEntity<HttpStatus> deleteGroup(@PathVariable("name") String name) {
		try {
			groupRepository.deleteByName(name);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
	
	@ApiOperation(value = "전체 그룹 삭제")
	@DeleteMapping("/groups")
	public ResponseEntity<HttpStatus> deleteAllGroups() {
		try {
			groupRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
}
