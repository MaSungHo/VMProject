package com.vm.project.model;

public class VmInfo {
	
	private String osName;
	
	private String email;
	
	private String vmName;

	public VmInfo() {
		
	}

	public VmInfo(String osName, String email, String vmName) {
		this.osName = osName;
		this.email = email;
		this.vmName = vmName;
	}

	public String getOsName() {
		return osName;
	}

	public void setOsName(String osName) {
		this.osName = osName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getVmName() {
		return vmName;
	}

	public void setVmName(String vmName) {
		this.vmName = vmName;
	}
	
}
