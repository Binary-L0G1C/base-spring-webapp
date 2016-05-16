package com.logiclodge.springwebapp.employees;

import com.logiclodge.springwebapp.base.BaseResourceObject;

public class Employee implements BaseResourceObject {
	private String id;
	private String name;
	private String dateOfBirth;
	private String imageUrl;

	public Employee() {
	}

	public Employee(final String id, final String name) {
		this.id = id;
		this.name = name;
	}

	@Override
	public String getId() {
		return id;
	}

	public void setId(final String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(final String name) {
		this.name = name;
	}

	public String getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(final String dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(final String imageUrl) {
		this.imageUrl = imageUrl;
	}

}
