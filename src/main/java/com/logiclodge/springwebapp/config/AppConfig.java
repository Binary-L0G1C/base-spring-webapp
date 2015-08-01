package com.logiclodge.springwebapp.config;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.ext.RuntimeDelegate;

import org.apache.cxf.bus.spring.SpringBus;
import org.apache.cxf.endpoint.Server;
import org.apache.cxf.jaxrs.JAXRSServerFactoryBean;
import org.codehaus.jackson.jaxrs.JacksonJsonProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;

import com.logiclodge.springwebapp.base.BaseResource;

@Configuration
@ComponentScan("com.logiclodge.springwebapp")
public class AppConfig {
	@Inject
	List<BaseResource> resources;

	@Inject
	ApiApplication apiApplication;

	@Bean(destroyMethod = "shutdown")
	public SpringBus cxf() {
		return new SpringBus();
	}

	@Bean
	@DependsOn("cxf")
	public Server getServer() {
		JAXRSServerFactoryBean factory = RuntimeDelegate.getInstance().createEndpoint(apiApplication,
				JAXRSServerFactoryBean.class);
		factory.setServiceBeans(new ArrayList<Object>(resources));
		//factory.setAddress(factory.getAddress());
		factory.setProvider(new JacksonJsonProvider());
		return factory.create();
	}
}
