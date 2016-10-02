package com.logiclodge.springwebapp;

import java.io.File;

import org.apache.cxf.transport.servlet.CXFServlet;
import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.util.resource.PathResource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;

import com.logiclodge.springwebapp.config.AppConfig;

/**
 * Entry class into the application. Primarily responsible for setting up Jetty
 * to wrap the rest of the Spring app.
 * 
 * @author David
 */
public class Start {

	/**
	 * Entry method into the application.
	 * 
	 * @param args
	 *            [unused at the moment]
	 * @throws Exception
	 */
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

		// Try to find the webapp files in source
		File basePath = new File("./src/main/webapp/logiclodge-webapp/");
		if (basePath.exists()) {
			resource_handler.setBaseResource(new PathResource(basePath));
		} else {
			// Otherwise grab them from the classpath (usually inside the jar)
			resource_handler.setResourceBase(new ClassPathResource("logiclodge-webapp").getURI().toString());
		}

		final HandlerList handlers = new HandlerList();
		handlers.setHandlers(new Handler[] { resource_handler, context });
		server.setHandler(handlers);
		server.start();
		server.join();
	}
}
