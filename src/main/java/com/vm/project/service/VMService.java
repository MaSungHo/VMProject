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
import com.microsoft.azure.management.network.PublicIPAddress;
import com.microsoft.azure.management.resources.ResourceGroup;
import com.microsoft.azure.management.resources.fluentcore.arm.Region;
import com.microsoft.rest.LogLevel;
import java.io.File;

import com.vm.project.model.ExistingVM;
import com.vm.project.model.User;
import com.vm.project.model.VM;
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
	
	public ResponseEntity<VM> getVMByName(String name) {
		VM _vm = vmRepository.findByName(name);
		if(_vm != null) {
			return new ResponseEntity<>(_vm, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<HttpStatus> createVMByName(ExistingVM existingVM) {
		System.out.println(existingVM.getAdminName());
		System.out.println(existingVM.getAdminPassword());
		
		String offer;
		String publisher;
		String sku;
		String version;
		
		VM _vm = vmRepository.findByName(existingVM.getName());
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
            	    .define(existingVM.getResourceGroupName()) 
            	    .withRegion(Region.KOREA_CENTRAL)
            	    .create();
            
            //공용 IP 주소 생성
            PublicIPAddress publicIPAddress = azure.publicIPAddresses()
            	    .define(existingVM.getPublicAddressName()) /////////////////////////////////////
            	    .withRegion(Region.KOREA_CENTRAL)
            	    .withExistingResourceGroup(existingVM.getResourceGroupName())
            	    .withStaticIP()
            	    .create();
            // Marketplace image를 위한 플랜.
            PurchasePlan plan = new PurchasePlan();
            plan.withName("pro-20_04-lts");
            plan.withPublisher("canonical");
            plan.withProduct("0001-com-ubuntu-pro-focal"); //offer와 같음
            
            if(existingVM.getName().contains("Windows")) {
            	VirtualMachine virtualMachine = azure.virtualMachines()
            	    .define(existingVM.getVmName()) /////////////////////////////////////
            	    .withRegion(Region.KOREA_CENTRAL)
            	    .withExistingResourceGroup(existingVM.getResourceGroupName())
            	    .withNewPrimaryNetwork("10.0.0.0/24")
            	    .withPrimaryPrivateIPAddressDynamic()
            	    .withExistingPrimaryPublicIPAddress(publicIPAddress) 
            	    .withSpecificWindowsImageVersion(new ImageReference(new ImageReferenceInner()
            	    		.withOffer(offer)
            	    		.withPublisher(publisher)
            	    		.withSku(sku)
            	    		.withVersion(version)))
            	    .withAdminUsername(existingVM.getAdminName()) /////////////////////////////////////
            	    .withAdminPassword(existingVM.getAdminPassword()) /////////////////////////////////////
            	    .withComputerName(existingVM.getComputerName()) /////////////////////////////////////
            	    .withNewAvailabilitySet(existingVM.getAvailableSetName()) /////////////////////////////////////
            	    .withSize("Standard_B1ls")
            	    .create();
            }
            else if(existingVM.getName().equals("Ubuntu 20.04 LTS")) {
            	VirtualMachine virtualMachine = azure.virtualMachines()
                	    .define(existingVM.getVmName()) /////////////////////////////////////
                	    .withRegion(Region.KOREA_CENTRAL)
                	    .withExistingResourceGroup(existingVM.getResourceGroupName())
                	    .withNewPrimaryNetwork("10.0.0.0/24")
                	    .withPrimaryPrivateIPAddressDynamic()
                	    .withExistingPrimaryPublicIPAddress(publicIPAddress)
                	    .withSpecificLinuxImageVersion(new ImageReference(new ImageReferenceInner()
                	    		.withOffer(offer)
                	    		.withPublisher(publisher)
                	    		.withSku(sku)
                	    		.withVersion(version)))
                	    .withRootUsername(existingVM.getAdminName()) /////////////////////////////////////
                	    .withRootPassword(existingVM.getAdminPassword()) /////////////////////////////////////
                	    .withComputerName(existingVM.getComputerName()) /////////////////////////////////////
                	    .withNewAvailabilitySet(existingVM.getAvailableSetName()) /////////////////////////////////////
                	    .withPlan(plan)
                	    .withSize("Standard_B1ls")
                	    .create();
            }
            else {
            	VirtualMachine virtualMachine = azure.virtualMachines()
                	    .define(existingVM.getVmName()) /////////////////////////////////////
                	    .withRegion(Region.KOREA_CENTRAL)
                	    .withExistingResourceGroup(existingVM.getResourceGroupName())
                	    .withNewPrimaryNetwork("10.0.0.0/24")
                	    .withPrimaryPrivateIPAddressDynamic()
                	    .withExistingPrimaryPublicIPAddress(publicIPAddress)
                	    .withSpecificLinuxImageVersion(new ImageReference(new ImageReferenceInner()
                	    		.withOffer(offer)
                	    		.withPublisher(publisher)
                	    		.withSku(sku)
                	    		.withVersion(version)))
                	    .withRootUsername(existingVM.getAdminName()) /////////////////////////////////////
                	    .withRootPassword(existingVM.getAdminPassword()) /////////////////////////////////////
                	    .withComputerName(existingVM.getComputerName()) /////////////////////////////////////
                	    .withNewAvailabilitySet(existingVM.getAvailableSetName()) /////////////////////////////////////
                	    .withSize("Standard_B1ls")
                	    .create();
            }
            
            User user = userRepository.findByEmail(existingVM.getUserEmail());
            user.setNum_VM(user.getNum_VM() + 1);
            userRepository.save(user);
            
            existingVMRepository.save(existingVM);
        	return new ResponseEntity<HttpStatus>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<HttpStatus>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
	}
}