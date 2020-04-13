package com.vm.project.model;

import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
	"id",
	"name",
	"num_people"
})

@Document(collection = "group")
public class Group {
	
	@JsonProperty("id")
	private String id;
	
	@JsonProperty("name")
	private String name;
	
	@JsonProperty("num_people")
	private int num_people;
	
	public Group() {
		
	}
	
	public Group(String id, String name, int num_people) {
		super();
		this.id = id;
		this.name = name;
		this.num_people = num_people;
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

	public int getNum_people() {
		return num_people;
	}

	public void setNum_people(int num_people) {
		this.num_people = num_people;
	}
	
}
