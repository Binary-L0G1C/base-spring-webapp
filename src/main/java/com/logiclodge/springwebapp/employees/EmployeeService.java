package com.logiclodge.springwebapp.employees;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class EmployeeService {
	// Hold demo data. This would normally be retrieved from a DAO layer
	private final Map<String, Employee> employees = new HashMap<>();

	public EmployeeService() {
		// add demo data
		addEmployee("1", "Horo");
		addEmployee("42", "Ahri");
		addEmployee("47", "M'Ress");
		addEmployee("100-C", "Eris");
	}

	public Collection<Employee> getEmployees() {
		return employees.values();
	}

	public Employee getEmployeeById(String id) {
		return employees.get(id);
	}

	// This is for demo purposes
	private void addEmployee(final String id, final String name) {
		employees.put(id, new Employee(id, name));
	}
}
