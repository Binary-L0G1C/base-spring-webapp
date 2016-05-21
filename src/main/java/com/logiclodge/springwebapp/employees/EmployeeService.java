package com.logiclodge.springwebapp.employees;

import java.util.Collection;
import java.util.UUID;

import org.apache.commons.lang3.math.NumberUtils;
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
	
	public Employee saveEmployee(Employee employee) {
		// check if it is a new
		if (NumberUtils.toInt(employee.getId()) < 0){
			employee.setId(UUID.randomUUID().toString());
		}
		
		dao.save(employee);
		return getEmployeeById(employee.getId());
	}
	
	public void deleteEmployee(String id) {
		dao.delete(id);
	}

}
