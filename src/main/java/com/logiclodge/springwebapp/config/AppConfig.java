package com.logiclodge.springwebapp.config;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.websocket.DeploymentException;
import javax.websocket.server.ServerContainer;
import javax.websocket.server.ServerEndpointConfig;
import javax.ws.rs.ext.RuntimeDelegate;

import org.apache.cxf.bus.spring.SpringBus;
import org.apache.cxf.endpoint.Server;
import org.apache.cxf.jaxrs.JAXRSServerFactoryBean;
import org.codehaus.jackson.jaxrs.JacksonJsonProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.logiclodge.springwebapp.base.BaseResource;
import com.logiclodge.springwebapp.websocket.DefaultEchoService;
import com.logiclodge.springwebapp.websocket.EchoWebSocketHandler;

@Configuration
// @EnableWebSocket
@ComponentScan("com.logiclodge.springwebapp")
public class AppConfig implements WebSocketConfigurer {

	private static final Logger LOGGER = LoggerFactory.getLogger(AppConfig.class);

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
		LOGGER.info("getServer");
		JAXRSServerFactoryBean factory = RuntimeDelegate.getInstance().createEndpoint(apiApplication,
				JAXRSServerFactoryBean.class);
		factory.setServiceBeans(new ArrayList<Object>(resources));
		// factory.setAddress(factory.getAddress());
		factory.setProvider(new JacksonJsonProvider());
		return factory.create();
	}

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		LOGGER.info("registerWebSocketHandlers");
		registry.addHandler(echoWebSocketHandler(), "/echo", "/echo-issue4");
	}

	@Bean
	public WebSocketHandler echoWebSocketHandler() {
		LOGGER.info("echoWebSocketHandler");
		return new EchoWebSocketHandler(echoService());
	}

	@Bean
	public DefaultEchoService echoService() {
		LOGGER.info("echoService");
		// return new DefaultEchoService("Did you say \"%s\"?");
		return new DefaultEchoService("{\"type\": \"update\", \"data\": {\"answer\": %s} }");
	}

	@Inject
	private WebApplicationContext context;
	private ServerContainer container;

	public class SpringServerEndpointConfigurator extends ServerEndpointConfig.Configurator {
		@Override
		public <T> T getEndpointInstance(Class<T> endpointClass) throws InstantiationException {
			LOGGER.info("getEndpointInstance");
			return context.getAutowireCapableBeanFactory().createBean(endpointClass);
		}
	}

	@Bean
	public ServerEndpointConfig.Configurator configurator() {
		LOGGER.info("configurator");
		return new SpringServerEndpointConfigurator();
	}

	@PostConstruct
	public void init() throws DeploymentException {
		LOGGER.info("init");
		container = (ServerContainer) context.getServletContext()
				.getAttribute(javax.websocket.server.ServerContainer.class.getName());

//		container.addEndpoint(new AnnotatedServerEndpointConfig(BroadcastServerEndpoint.class,
//				BroadcastServerEndpoint.class.getAnnotation(ServerEndpoint.class)) {
//			@Override
//			public Configurator getConfigurator() {
//				return configurator();
//			}
//		});
	}
}
