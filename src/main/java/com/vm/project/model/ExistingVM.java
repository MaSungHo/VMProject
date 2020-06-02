package com.vm.project.model;

import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
	"id",
	"name",
	"userEmail",
	"resourceGroupName",
	"publicAddressName",
	"vmName",
	"adminName",
	"adminPassword",
	"computerName",
	"availableSetName"
})

@Document(collection = "ExistingVM")
public class ExistingVM {
		
	@JsonProperty("id")
	private String id;
		
	@JsonProperty("name")
	private String name;
		
	@JsonProperty("userEmail")
	private String userEmail;
		
	@JsonProperty("resourceGroupName")
	private String resourceGroupName;
		
	@JsonProperty("publicAddressName")
	private String publicAddressName;
		
	@JsonProperty("vmName")
	private String vmName;
		
	@JsonProperty("adminName")
	private String adminName;
		
	@JsonProperty("adminPassword")
	private String adminPassword;
		
	@JsonProperty("computerName")
	private String computerName;
		
	@JsonProperty("availableSetName")
	private String availableSetName;
		
	public ExistingVM() {
		
	}

	public ExistingVM(String id, String name, String userEmail, String resourceGroupName, String publicAddressName,
			String vmName, String adminName, String adminPassword, String computerName, String availableSetName) {
		this.id = id;
		this.name = name;
		this.userEmail = userEmail;
		this.resourceGroupName = resourceGroupName;
		this.publicAddressName = publicAddressName;
		this.vmName = vmName;
		this.adminName = adminName;
		this.adminPassword = adminPassword;
		this.computerName = computerName;
		this.availableSetName = availableSetName;
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

	public String getUserEmail() {
		return userEmail;
	}

	public String getResourceGroupName() {
		return resourceGroupName;
	}

	public void setResourceGroupName(String resourceGroupName) {
		this.resourceGroupName = resourceGroupName;
	}

	public String getPublicAddressName() {
		return publicAddressName;
	}

	public void setPublicAddressName(String publicAddressName) {
		this.publicAddressName = publicAddressName;
	}

	public String getVmName() {
		return vmName;
	}

	public void setVmName(String vmName) {
		this.vmName = vmName;
	}

	public String getAdminName() {
		return adminName;
	}

	public void setAdminName(String adminName) {
		this.adminName = adminName;
	}

	public String getAdminPassword() {
		return adminPassword;
	}

	public void setAdminPassword(String adminPassword) {
		this.adminPassword = adminPassword;
	}

	public String getComputerName() {
		return computerName;
	}

	public void setComputerName(String computerName) {
		this.computerName = computerName;
	}

	public String getAvailableSetName() {
		return availableSetName;
	}

	public void setAvailableSetName(String availableSetName) {
		this.availableSetName = availableSetName;
	}

	
}
