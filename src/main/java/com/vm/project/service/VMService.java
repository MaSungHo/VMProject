package com.vm.project.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.microsoft.azure.management.Azure;
import com.microsoft.azure.management.compute.PurchasePlan;
import com.microsoft.azure.management.compute.ImageReference;
import com.microsoft.azure.management.compute.VirtualMachine;
import com.microsoft.azure.management.compute.implementation.ImageReferenceInner;
import com.microsoft.azure.management.resources.ResourceGroup;
import com.microsoft.azure.management.resources.fluentcore.arm.Region;
import com.microsoft.azure.management.resources.fluentcore.utils.SdkContext;
import com.microsoft.rest.LogLevel;
import java.io.File;

import com.vm.project.model.ExistingVM;
import com.vm.project.model.User;
import com.vm.project.model.VM;
import com.vm.project.model.VmInfo;
import com.vm.project.repository.ExistingVMRepository;
import com.vm.project.repository.UserRepository;
import com.vm.project.repository.VMRepository;

@Service
public class VMService {
	
	@Autowired
	VMRepository vmRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	ExistingVMRepository existingVMRepository;

	public ResponseEntity<List<VM>> getAllVMs() {
		try {
			List<VM> vms = new ArrayList<VM>();
			vmRepository.findAll().forEach(vms::add);
			if(vms.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(vms, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	public ResponseEntity<List<String>> getCreatableVMList() {
		try {
			List<VM> vms = new ArrayList<VM>();
			vmRepository.findAll().forEach(vms::add);
			
			if(vms.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			
			List<String> vmList = new ArrayList<String>();
			
			for(VM e : vms)
			{
				vmList.add(e.getName());
			}
			
			return new ResponseEntity<>(vmList, HttpStatus.OK);
			
		} catch(Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	public ResponseEntity<VM> getVMByName(String name) {
		VM _vm = vmRepository.findByName(name);
		if(_vm != null) {
			return new ResponseEntity<>(_vm, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<HttpStatus> createVMByName(VmInfo vmInfo) {
		
		String offer;
		String publisher;
		String sku;
		String version;
		String[] resourceName = vmInfo.getEmail().split("@");
		String adminName = "admin_" + resourceName[0];
		String adminPassword = "Password_" + resourceName[0] + "_00!@";
		System.out.println(resourceName[0]);
		System.out.println(adminName);
		System.out.println(adminPassword);
		
		VM _vm = vmRepository.findByName(vmInfo.getOsName());
		offer = _vm.getOffer();
		publisher = _vm.getPublisher();
		sku = _vm.getSku();
		version = _vm.getVersion();
	
		try {
            final File credFile = new File("C:\\Users\\tonem\\azureauth.properties");
            Azure azure = Azure.configure()
                    .withLogLevel(LogLevel.BASIC)
                    .authenticate(credFile)
                    .withDefaultSubscription();
            //리소스 그룹 생성
            ResourceGroup resourceGroup = azure.resourceGroups()
            	    .define(resourceName[0]) 
            	    .withRegion(Region.KOREA_CENTRAL)
            	    .create();
            
            // Marketplace image를 위한 플랜.
            PurchasePlan plan = new PurchasePlan();
            plan.withName("pro-20_04-lts");
            plan.withPublisher("canonical");
            plan.withProduct("0001-com-ubuntu-pro-focal"); //offer와 같음
            
            if(vmInfo.getOsName().contains("Windows")) {
            	VirtualMachine virtualMachine = azure.virtualMachines()
            	    .define(vmInfo.getVmName()) /////////////////////////////////////
            	    .withRegion(Region.KOREA_CENTRAL)
            	    .withExistingResourceGroup(resourceName[0])
            	    .withNewPrimaryNetwork("10.0.0.0/24")
            	    .withPrimaryPrivateIPAddressDynamic()
            	    .withNewPrimaryPublicIPAddress(SdkContext.randomResourceName("public", 20)) 
            	    .withSpecificWindowsImageVersion(new ImageReference(new ImageReferenceInner()
            	    		.withOffer(offer)
            	    		.withPublisher(publisher)
            	    		.withSku(sku)
            	    		.withVersion(version)))
            	    .withAdminUsername(adminName) /////////////////////////////////////
            	    .withAdminPassword(adminPassword) /////////////////////////////////////
            	    .withComputerName(SdkContext.randomResourceName("com", 15)) /////////////////////////////////////
            	    .withNewAvailabilitySet(SdkContext.randomResourceName("avail", 12)) /////////////////////////////////////
            	    .withSize("Standard_B1ls")
            	    .create();
            }
            else if(vmInfo.getOsName().equals("Ubuntu 20.04 LTS")) {
            	VirtualMachine virtualMachine = azure.virtualMachines()
                	    .define(vmInfo.getVmName()) /////////////////////////////////////
                	    .withRegion(Region.KOREA_CENTRAL)
                	    .withExistingResourceGroup(resourceName[0])
                	    .withNewPrimaryNetwork("10.0.0.0/24")
                	    .withPrimaryPrivateIPAddressDynamic()
                	    .withNewPrimaryPublicIPAddress(SdkContext.randomResourceName("public", 20))
                	    .withSpecificLinuxImageVersion(new ImageReference(new ImageReferenceInner()
                	    		.withOffer(offer)
                	    		.withPublisher(publisher)
                	    		.withSku(sku)
                	    		.withVersion(version)))
                	    .withRootUsername(adminName) /////////////////////////////////////
                	    .withRootPassword(adminPassword) /////////////////////////////////////
                	    .withComputerName(SdkContext.randomResourceName("com", 15)) /////////////////////////////////////
                	    .withNewAvailabilitySet(SdkContext.randomResourceName("avail", 12)) /////////////////////////////////////
                	    .withPlan(plan)
                	    .withSize("Standard_B1ls")
                	    .create();
            }
            else {
            	VirtualMachine virtualMachine = azure.virtualMachines()
                	    .define(vmInfo.getVmName()) /////////////////////////////////////
                	    .withRegion(Region.KOREA_CENTRAL)
                	    .withExistingResourceGroup(resourceName[0])
                	    .withNewPrimaryNetwork("10.0.0.0/24")
                	    .withPrimaryPrivateIPAddressDynamic()
                	    .withNewPrimaryPublicIPAddress(SdkContext.randomResourceName("public", 20))
                	    .withSpecificLinuxImageVersion(new ImageReference(new ImageReferenceInner()
                	    		.withOffer(offer)
                	    		.withPublisher(publisher)
                	    		.withSku(sku)
                	    		.withVersion(version)))
                	    .withRootUsername(adminName) /////////////////////////////////////
                	    .withRootPassword(adminPassword) /////////////////////////////////////
                	    .withComputerName(SdkContext.randomResourceName("com", 15)) /////////////////////////////////////
                	    .withNewAvailabilitySet(SdkContext.randomResourceName("avail", 12)) /////////////////////////////////////
                	    .withSize("Standard_B1ls")
                	    .create();
            }
            
            User user = userRepository.findByEmail(vmInfo.getEmail());
            user.setNum_VM(user.getNum_VM() + 1);
            userRepository.save(user);
            
            VirtualMachine vm = azure.virtualMachines().getByResourceGroup(resourceName[0], vmInfo.getVmName());
            ExistingVM existingVM = new ExistingVM();
            existingVM.setUserEmail(vmInfo.getEmail());
            existingVM.setResourceGroupName(resourceName[0]);
            existingVM.setVmName(vmInfo.getVmName());
            existingVM.setAdminName(adminName);
            existingVM.setAdminPassword(adminPassword);
            existingVM.setPublicIPAddress(vm.getPrimaryPublicIPAddress().ipAddress());
            existingVM.setSize("Standard_B1ls");
            existingVM.setOsType(vmInfo.getOsName());
            existingVM.setStatus("running");
            existingVMRepository.save(existingVM);
        	return new ResponseEntity<HttpStatus>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<HttpStatus>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
	}

}