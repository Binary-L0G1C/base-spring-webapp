package com.logiclodge.springwebapp.employees;

import java.util.Collection;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.logiclodge.springwebapp.base.BaseResource;

@Path("/employees")
@Service
public class EmployeeResource implements BaseResource {

	private EmployeeService employeeService;

	@Autowired
	public EmployeeResource(final EmployeeService employeeService) {
		this.employeeService = employeeService;
	}

	@Produces({ MediaType.APPLICATION_JSON })
	@GET
	public Collection<Employee> getEmployees() {
		return employeeService.getEmployees();
	}

	@Produces({ MediaType.APPLICATION_JSON })
	@Path("/{id}")
	@GET
	public Employee getEmployee(@PathParam("id") final String id) {
		return employeeService.getEmployeeById(id);
	}
}
