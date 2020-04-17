package com.vm.project.model;

import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
	"id",
	"email",
	"password",
	"group",
	"VMs"
})

@Document(collection = "user")
public class User {
	
	@JsonProperty("id")
	private String id;
	
	@JsonProperty("email")
	private String email;
	
	@JsonProperty("password")
	private String password;
	
	@JsonProperty("group")
	private String group;
	
	@JsonProperty("VMs")
	private String[] VMs;
	
	public User() {
	
	}

	public User(String id, String email, String password, String group, String[] _VMs) {
		this.id = id;
		this.email = email;
		this.password = password;
		this.group = group;
		VMs = _VMs;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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

	public String[] getVMs() {
		return VMs;
	}

	public void setVMs(String[] _VMs) {
		VMs = _VMs;
	}

}
