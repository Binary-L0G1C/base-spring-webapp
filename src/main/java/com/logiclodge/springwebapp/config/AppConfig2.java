package com.logiclodge.springwebapp.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.logiclodge.springwebapp.websocket.DefaultEchoService;
import com.logiclodge.springwebapp.websocket.EchoWebSocketHandler;

@Configuration
@EnableWebSocket
@ComponentScan("com.logiclodge.springwebapp")
public class AppConfig2 implements WebSocketConfigurer{
	
	private static final Logger LOGGER = LoggerFactory.getLogger(AppConfig2.class);
	

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		LOGGER.info("registerWebSocketHandlers");
		registry.addHandler(echoWebSocketHandler(), "/echo", "/echo-issue4");
	}
	
	@Bean
	public WebSocketHandler echoWebSocketHandler() {
		return new EchoWebSocketHandler(echoService());
	}
	

	
	@Bean
	public DefaultEchoService echoService() {
		//return new DefaultEchoService("Did you say \"%s\"?");
		return new DefaultEchoService("{\"type\": \"update\", \"data\": {\"answer\": %s} }");
	}
}
