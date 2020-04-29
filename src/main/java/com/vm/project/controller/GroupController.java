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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.vm.project.model.Group;
import com.vm.project.model.User;
import com.vm.project.service.GroupService;
import com.vm.project.repository.GroupRepository;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin("*")
public class GroupController {

	@Autowired
	GroupRepository groupRepository;
	
	@Autowired
	GroupService groupService;
	
	@ApiOperation(value = "전체 그룹 조회")
	@GetMapping("/groups")
	public ResponseEntity<List<Group>> getAllGroups() {
		return groupService.getAllGroups();
	}
	
	@ApiOperation(value = "특정 그룹 조회")
	   @ApiImplicitParams({
	           @ApiImplicitParam(name = "name", value = "조회할 그룹 이름", required = true, dataType = "string", paramType = "path", defaultValue = ""),
	   })
	@GetMapping("/groups/{name}")
	public ResponseEntity<Group> getGroupByName(@PathVariable("name") String name) {
		return groupService.getGroupByName(name);
	}
	
	@ApiOperation(value = "특정 그룹에 속한 사용자 목록 조회")
	   @ApiImplicitParams({
	           @ApiImplicitParam(name = "name", value = "사용자 목록을 조회할 그룹 이름", required = true, dataType = "string", paramType = "path", defaultValue = ""),
	   })
	@GetMapping("/groups/users/{name}")
	public ResponseEntity<List<User>> getUsersByGroupName(@PathVariable("name") String name) {
		return groupService.getUsersByGroupName(name);
	}
	
	@ApiOperation(value = "새로운 그룹 생성")
	@PostMapping("/groups")
	public ResponseEntity<Group> createGroup(@RequestBody Group group) {
		return groupService.createGroup(group);
	}
	
	@ApiOperation(value = "특정 그룹 정보 수정")
	   @ApiImplicitParams({
	           @ApiImplicitParam(name = "name", value = "수정할 그룹 이름", required = true, dataType = "string", paramType = "path", defaultValue = ""),
	   })
	@PutMapping("/groups/{name}")
	public ResponseEntity<Group> updateGroup(@PathVariable("name") String name, @RequestBody Group group) {
		return groupService.updateGroup(name, group);
	}
	
	@ApiOperation(value = "특정 그룹 삭제")
	   @ApiImplicitParams({
	           @ApiImplicitParam(name = "name", value = "삭제할 그룹 이름", required = true, dataType = "string", paramType = "path", defaultValue = ""),
	   })
	@DeleteMapping("/groups/{name}")
	public ResponseEntity<HttpStatus> deleteGroup(@PathVariable("name") String name) {
		return groupService.deleteGroup(name);
	}
}
