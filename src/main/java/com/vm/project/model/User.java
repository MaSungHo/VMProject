package com.vm.project.model;

import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
	"id",
	"name",
	"email",
	"password",
	"group",
	"VMs"
})

@Document(collection = "user")
public class User {
	
	@JsonProperty("id")
	private String id;
	
	@JsonProperty("name")
	private String name;
	
	@JsonProperty("email")
	private String email;
	
	@JsonProperty("password")
	private String password;
	
	@JsonProperty("group")
	private String group;
	
	@JsonProperty("num_VM")
	private int num_VM;
	
	public User() {
	
	}

	public User(String id, String name, String email, String password, String group, int num_VM) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.group = group;
		this.num_VM = num_VM;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getGroup() {
		return group;
	}

	public void setGroup(String group) {
		this.group = group;
	}

	public int getNum_VM() {
		return num_VM;
	}

	public void setNum_VM(int num_VM) {
		this.num_VM = num_VM;
	}

}
