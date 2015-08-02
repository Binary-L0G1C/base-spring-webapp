package com.logiclodge.springwebapp;

import org.apache.cxf.transport.servlet.CXFServlet;
import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;

import com.logiclodge.springwebapp.config.AppConfig;

public class Start {
	public static void main(final String[] args) throws Exception {
		Server server = new Server(8181);

		// Register and map the dispatcher servlet
		final ServletHolder servletHolder = new ServletHolder(new CXFServlet());
		final ServletContextHandler context = new ServletContextHandler();
		context.setContextPath("/");
		context.addServlet(servletHolder, "/rest/*");
		context.addEventListener(new ContextLoaderListener());
		context.setInitParameter("contextClass", AnnotationConfigWebApplicationContext.class.getName());
		context.setInitParameter("contextConfigLocation", AppConfig.class.getName());

		final ResourceHandler resource_handler = new ResourceHandler();
		resource_handler.setDirectoriesListed(true);
		resource_handler.setWelcomeFiles(new String[] { "index.html" });
		resource_handler.setResourceBase("./src/main/webapp/");

		final HandlerList handlers = new HandlerList();
		handlers.setHandlers(new Handler[] { resource_handler, context });
		server.setHandler(handlers);
		server.start();
		server.join();
	}
}
