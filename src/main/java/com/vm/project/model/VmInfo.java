package com.vm.project.model;

public class VmInfo {
	
	private String osName;
	
	private String email;
	
	private String vmName;
	
	private String vmSize;

	public VmInfo() {
		
	}

	public VmInfo(String osName, String email, String vmName, String vmSize) {
		this.osName = osName;
		this.email = email;
		this.vmName = vmName;
		this.vmSize = vmSize;
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
	
	public String getVmSize() {
		return vmSize;
	}

	public void setVmSize(String vmSize) {
		this.vmSize = vmSize;
	}
	
}
