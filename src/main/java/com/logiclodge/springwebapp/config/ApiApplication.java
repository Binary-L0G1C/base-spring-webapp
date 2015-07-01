package com.logiclodge.springwebapp.config;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import org.springframework.stereotype.Component;

@ApplicationPath("api")
@Component
public class ApiApplication extends Application {
}
