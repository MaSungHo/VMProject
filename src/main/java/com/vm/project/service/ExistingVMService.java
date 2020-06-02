package com.vm.project.service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.microsoft.azure.management.Azure;
import com.microsoft.azure.management.compute.VirtualMachine;
import com.microsoft.rest.LogLevel;
import com.vm.project.model.ExistingVM;
import com.vm.project.model.User;
import com.vm.project.repository.ExistingVMRepository;
import com.vm.project.repository.UserRepository;

@Service
public class ExistingVMService {

	@Autowired
	private ExistingVMRepository existingVMRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	public ResponseEntity<List<ExistingVM>> getVMsByEmail(String email) {
		try {
			List<ExistingVM> vms = new ArrayList<ExistingVM>();
			existingVMRepository.findByUserEmail(email).forEach(vms::add);
			if(vms.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(vms, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	public ResponseEntity<ExistingVM> getVMByVMName(String vmName) {
		ExistingVM _existingVM = existingVMRepository.findByvmName(vmName);
		if(_existingVM != null) {
			return new ResponseEntity<>(_existingVM, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<List<String>> getVMInfo(String resourceGroup, String vmName) {
		try {
			List<String> vmInfo = new ArrayList<String>();
			final File credFile = new File("C:\\Users\\tonem\\azureauth.properties");
        	Azure azure = Azure.configure()
                .withLogLevel(LogLevel.BASIC)
                .authenticate(credFile)
                .withDefaultSubscription();
        	VirtualMachine vm = azure.virtualMachines().getByResourceGroup(resourceGroup, vmName);
        	vmInfo.add(vm.storageProfile().osDisk().osType().toString());
        	vmInfo.add(Integer.toString(vm.osDiskSize()));
        	vmInfo.add(vm.osProfile().adminUsername());
        	vmInfo.add(vm.osProfile().adminPassword());
        	return new ResponseEntity<>(vmInfo, HttpStatus.OK);
		} catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<List<String>>(HttpStatus.INTERNAL_SERVER_ERROR);
        } 
	}
	
	public ResponseEntity<HttpStatus> stopVM(String resourceGroup, String vmName) {
		try {
			final File credFile = new File("C:\\Users\\tonem\\azureauth.properties");
        	Azure azure = Azure.configure()
                .withLogLevel(LogLevel.BASIC)
                .authenticate(credFile)
                .withDefaultSubscription();
        	VirtualMachine vm = azure.virtualMachines().getByResourceGroup(resourceGroup, vmName);
        	vm.powerOff();
        	return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } 
	}
	
	public ResponseEntity<HttpStatus> startVM(String resourceGroup, String vmName) {
		try {
			final File credFile = new File("C:\\Users\\tonem\\azureauth.properties");
        	Azure azure = Azure.configure()
                .withLogLevel(LogLevel.BASIC)
                .authenticate(credFile)
                .withDefaultSubscription();
        	VirtualMachine vm = azure.virtualMachines().getByResourceGroup(resourceGroup, vmName);
        	vm.start();
        	return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
	}

	public ResponseEntity<HttpStatus> deleteVM(String resourceGroup, String vmName) {
		try {
			ExistingVM existingVM = existingVMRepository.findByvmName(vmName);
			
			final File credFile = new File("C:\\Users\\tonem\\azureauth.properties");
        	Azure azure = Azure.configure()
                .withLogLevel(LogLevel.BASIC)
                .authenticate(credFile)
                .withDefaultSubscription();
        	VirtualMachine vm = azure.virtualMachines().getByResourceGroup(resourceGroup, vmName);
        	//azure.publicIPAddresses().deleteByResourceGroup(resourceGroup, existingVM.getPublicAddressName());
        	//azure.availabilitySets().deleteById(vm.availabilitySetId());
        	//azure.disks().deleteById(vm.osDiskId());
        	//azure.networkInterfaces().deleteById(vm.primaryNetworkInterfaceId());
        	azure.virtualMachines().deleteById(vm.id());
        	
        	User user = userRepository.findByEmail(existingVM.getUserEmail());
            user.setNum_VM(user.getNum_VM() - 1);
            userRepository.save(user);
            
            existingVMRepository.deleteByvmName(vmName);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
}
