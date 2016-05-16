package com.logiclodge.springwebapp.employees;

import java.util.Collection;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;

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
	
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("/{id}")
	@PUT
	public Employee saveEmployee(final Employee employee) {
		return employeeService.saveEmployee(employee);
	}
	
	@ResponseStatus(value = HttpStatus.OK)
	@Path("/{id}")
	@DELETE
	public void deleteEmployee(@PathParam("id") final String id) {
		employeeService.deleteEmployee(id);
	}
}
