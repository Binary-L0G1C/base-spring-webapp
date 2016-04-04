package com.logiclodge.springwebapp.employees;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

	private final EmployeeDao dao;

	@Autowired
	public EmployeeService(EmployeeDao dao) {
		this.dao = dao;
	}

	public Collection<Employee> getEmployees() {
		return dao.getAll();
	}

	public Employee getEmployeeById(String id) {
		return dao.get(id);
	}

}
