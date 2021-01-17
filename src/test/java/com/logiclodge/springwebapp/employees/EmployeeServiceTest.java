package com.logiclodge.springwebapp.employees;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.matchesPattern;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;

import com.logiclodge.springwebapp.base.BaseDao;

public class EmployeeServiceTest {

	BaseDao<Employee> employeeDao; 

	EmployeeService service;

	private static final String UUID_REGEX = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";

	@BeforeEach
	public void before() {
		employeeDao = getDaoMock();
		service = new EmployeeService(employeeDao);
	}

	@Test
	/**
	 * Test the saveEmployee method. The tests here are probably overkill, but
	 * since there isn't much logic in the project, I wanted to show off some
	 * techniques.
	 */
	public void testSaveEmployee() {
		final Employee initialNewEmployee = new Employee("-22", "Draven");
		final Employee initialExistingEmployee = new Employee("some-id", "Draven");
		final Employee finalEmployee = new Employee("some-new-uuid", "Draven");

		doAnswer(new Answer<Void>() {
			@Override
			public Void answer(InvocationOnMock invocation) throws Throwable {
				Employee transformedEmployee = (Employee) invocation.getArguments()[0];

				// Assert that by the time the dao is called, the id has been
				// converted to a UUID if negative
				assertThat(transformedEmployee.getId(), matchesPattern(UUID_REGEX));
				return null;
			}
		}).when(employeeDao).save(initialNewEmployee);

		doAnswer(new Answer<Void>() {
			@Override
			public Void answer(InvocationOnMock invocation) throws Throwable {
				Employee transformedEmployee = (Employee) invocation.getArguments()[0];

				// Assert that non-negative ids stay the same
				assertThat(transformedEmployee.getId(), is("some-id"));
				return null;
			}
		}).when(employeeDao).save(initialExistingEmployee);

		when(employeeDao.get(anyString())).thenReturn(finalEmployee);

		Employee newResponseEmployee = service.saveEmployee(initialNewEmployee);
		Employee existingResponseEmployee = service.saveEmployee(initialExistingEmployee);

		assertThat(newResponseEmployee, is(finalEmployee));
		assertThat(existingResponseEmployee, is(finalEmployee));
	}

	@SuppressWarnings("unchecked")
	private static BaseDao<Employee> getDaoMock() {
		return Mockito.mock(BaseDao.class);
	}
}
