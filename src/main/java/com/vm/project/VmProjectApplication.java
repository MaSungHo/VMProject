package com.vm.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@EnableWebMvc
@SpringBootApplication
public class VmProjectApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(VmProjectApplication.class, args);
	}

}
