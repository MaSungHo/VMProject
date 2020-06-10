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
import com.vm.project.jwt.JwtService;
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
	
	@Autowired
	private JwtService jwtService;
	
	public ResponseEntity<List<ExistingVM>> getVMsByAdmin(String email) {
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
	
	public ResponseEntity<List<ExistingVM>> getVMsByEmail(String email, String token) {
		if(jwtService.isUsable(token)) {
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
		else {
			return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED); 
		}
	}
	
	public ResponseEntity<ExistingVM> getVMByVMName(String vmName) {
		ExistingVM _existingVM = existingVMRepository.findByVmName(vmName);
		if(_existingVM != null) {
			return new ResponseEntity<>(_existingVM, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<List<String>> getVMListByEmail(String email) {
		try {
			List<ExistingVM> VMs = new ArrayList<ExistingVM>();
			existingVMRepository.findAll().forEach(VMs::add);
			
			List<String> vms = new ArrayList<String>();
			for(ExistingVM e : VMs) {
				vms.add(e.getOsType());
			}
			
			return new ResponseEntity<>(vms, HttpStatus.OK);
		} catch(Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	public ResponseEntity<HttpStatus> adminStopVM(String resourceGroup, String vmName) {
		try {
			final File credFile = new File("C:\\Users\\tonem\\azureauth.properties");
        	Azure azure = Azure.configure()
                .withLogLevel(LogLevel.BASIC)
                .authenticate(credFile)
                .withDefaultSubscription();
        	VirtualMachine vm = azure.virtualMachines().getByResourceGroup(resourceGroup, vmName);
        	vm.powerOff();
        	ExistingVM existingVM = existingVMRepository.findByVmName(vmName);
        	existingVM.setStatus("stopped");
        	existingVMRepository.save(existingVM);
        	
        	return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } 
	}
	
	public ResponseEntity<HttpStatus> adminStartVM(String resourceGroup, String vmName) {
		try {
			final File credFile = new File("C:\\Users\\tonem\\azureauth.properties");
        	Azure azure = Azure.configure()
                .withLogLevel(LogLevel.BASIC)
                .authenticate(credFile)
                .withDefaultSubscription();
        	VirtualMachine vm = azure.virtualMachines().getByResourceGroup(resourceGroup, vmName);
        	vm.start();
        	
        	ExistingVM existingVM = existingVMRepository.findByVmName(vmName);
        	existingVM.setStatus("running");
        	existingVMRepository.save(existingVM);
        	
        	return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
	}

	public ResponseEntity<HttpStatus> userStopVM(String resourceGroup, String vmName, String token) {
		if(jwtService.isUsable(token)) {
			try {
				final File credFile = new File("C:\\Users\\tonem\\azureauth.properties");
				Azure azure = Azure.configure()
					.withLogLevel(LogLevel.BASIC)
					.authenticate(credFile)
					.withDefaultSubscription();
				VirtualMachine vm = azure.virtualMachines().getByResourceGroup(resourceGroup, vmName);
				vm.powerOff();
				ExistingVM existingVM = existingVMRepository.findByVmName(vmName);
				existingVM.setStatus("stopped");
				existingVMRepository.save(existingVM);
        	
				return new ResponseEntity<>(HttpStatus.OK);
			} catch (Exception e) {
				e.printStackTrace();
				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		else {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED); 
		}
	}
	
	public ResponseEntity<HttpStatus> userStartVM(String resourceGroup, String vmName, String token) {
		if(jwtService.isUsable(token)) {
			try {
				final File credFile = new File("C:\\Users\\tonem\\azureauth.properties");
				Azure azure = Azure.configure()
					.withLogLevel(LogLevel.BASIC)
					.authenticate(credFile)
					.withDefaultSubscription();
				VirtualMachine vm = azure.virtualMachines().getByResourceGroup(resourceGroup, vmName);
				vm.start();
        	
				ExistingVM existingVM = existingVMRepository.findByVmName(vmName);
				existingVM.setStatus("running");
				existingVMRepository.save(existingVM);
				
				return new ResponseEntity<>(HttpStatus.OK);
			} catch (Exception e) {
				e.printStackTrace();
				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		else {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED); 
		}
	}
	
	public ResponseEntity<HttpStatus> deleteVM(String resourceGroup, String vmName) {
		try {
			ExistingVM existingVM = existingVMRepository.findByVmName(vmName);
			
			final File credFile = new File("C:\\Users\\tonem\\azureauth.properties");
        	Azure azure = Azure.configure()
                .withLogLevel(LogLevel.BASIC)
                .authenticate(credFile)
                .withDefaultSubscription();
        	VirtualMachine vm = azure.virtualMachines().getByResourceGroup(resourceGroup, vmName);
        	azure.virtualMachines().deleteById(vm.id());
        	
        	User user = userRepository.findByEmail(existingVM.getUserEmail());
            user.setNum_VM(user.getNum_VM() - 1);
            userRepository.save(user);
            
            existingVMRepository.deleteByVmName(vmName);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
}
