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
	"vmName",
	"adminName",
	"adminPassword"
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
	
	@JsonProperty("vmName")
	private String vmName;
		
	@JsonProperty("adminName")
	private String adminName;
		
	@JsonProperty("adminPassword")
	private String adminPassword;
	
	@JsonProperty("publicIPAddress")
	public String publicIPAddress;
	
	@JsonProperty("size")
	public String size;
	
	@JsonProperty("osType")
	private String osType;
		
	public ExistingVM() {
		
	}

	public ExistingVM(String id, String name, String userEmail, String resourceGroupName, String vmName,
			String adminName, String adminPassword, String publicIPAddress, String size, String osType) {
		this.id = id;
		this.name = name;
		this.userEmail = userEmail;
		this.resourceGroupName = resourceGroupName;
		this.vmName = vmName;
		this.adminName = adminName;
		this.adminPassword = adminPassword;
		this.publicIPAddress = publicIPAddress;
		this.size = size;
		this.osType = osType;
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

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getResourceGroupName() {
		return resourceGroupName;
	}

	public void setResourceGroupName(String resourceGroupName) {
		this.resourceGroupName = resourceGroupName;
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

	public String getPublicIPAddress() {
		return publicIPAddress;
	}

	public void setPublicIPAddress(String publicIPAddress) {
		this.publicIPAddress = publicIPAddress;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getOsType() {
		return osType;
	}

	public void setOsType(String osType) {
		this.osType = osType;
	}
	
}
