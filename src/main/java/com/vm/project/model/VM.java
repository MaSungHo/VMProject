package com.vm.project.model;

import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({ 
	"id", 
	"name", 
	"offer", 
	"publisher", 
	"sku", 
	"version"
})

@Document(collection = "VMs")
public class VM {

	@JsonProperty("id")
	private String id;

	@JsonProperty("name")
	private String name;

	@JsonProperty("offer")
	private String offer;

	@JsonProperty("publisher")
	private String publisher;

	@JsonProperty("sku")
	private String sku;

	@JsonProperty("version")
	private String version;

	public VM() {

	}

	public VM(String id, String name, String offer, String publisher, String sku, String version) {
		this.id = id;
		this.name = name;
		this.offer = offer;
		this.publisher = publisher;
		this.sku = sku;
		this.version = version;
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

	public String getOffer() {
		return offer;
	}

	public void setOffer(String offer) {
		this.offer = offer;
	}

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

	public String getSku() {
		return sku;
	}

	public void setSku(String sku) {
		this.sku = sku;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

}
