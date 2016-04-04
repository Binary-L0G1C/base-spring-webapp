package com.logiclodge.springwebapp.employees;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.NotFoundException;

import org.springframework.stereotype.Service;

import com.logiclodge.springwebapp.base.BaseDao;

@Service
public class EmployeeDao implements BaseDao<Employee> {

	// Hold demo data.
	// This would normally be retrieved from some type of backend database
	private final Map<String, Employee> employees = new HashMap<>();

	// This is for demo purposes
	private void addEmployee(final String id, final String name) {
		employees.put(id, new Employee(id, name));
	}

	public EmployeeDao() {
		// add demo data
		addEmployee("1", "Horo");
		addEmployee("42", "Ahri");
		addEmployee("47", "M'Ress");
		addEmployee("100-C", "Eris");
	}

	@Override
	public Employee get(String id) {
		checkContains(id);
		return employees.get(id);

	}

	@Override
	public Collection<Employee> getAll() {
		return employees.values();
	}

	@Override
	public void save(Employee employee) {
		employees.put(employee.getId(), employee);
	}

	@Override
	public void delete(String id) {
		checkContains(id);
		employees.remove(id);
	}

	private void checkContains(String id) {
		if (!employees.containsKey(id)) {
			throw new NotFoundException("The employee was not found");
		}
	}
}
