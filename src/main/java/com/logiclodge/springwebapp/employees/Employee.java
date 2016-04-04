package com.logiclodge.springwebapp.employees;

import com.logiclodge.springwebapp.base.BaseResourceObject;

public class Employee implements BaseResourceObject{
	private String id;
	private String name;

	public Employee() {
	}

	public Employee(final String id, final String name) {
		this.id = id;
		this.name = name;
	}

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

}
