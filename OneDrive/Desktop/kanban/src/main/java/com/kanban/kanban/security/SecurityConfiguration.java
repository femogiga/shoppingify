package com.kanban.kanban.security;

/*
 * Copyright 2020 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

/**
 * An example of explicitly configuring Spring Security with the defaults.
 *
 * @author Rob Winch
 */
@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
       return  http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/api/users/public/**").permitAll() // Public endpoints
                        .requestMatchers(HttpMethod.GET, "/api/users/**").permitAll() // Allow GET without auth
                        .requestMatchers(HttpMethod.POST, "/api/users").permitAll() // Allow POST without auth
                        .requestMatchers(HttpMethod.PUT, "/api/users/**").permitAll()
                        .requestMatchers(HttpMethod.DELETE, "/api/users/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/tasks/**").permitAll()
                        .requestMatchers(HttpMethod.DELETE, "/api/tasks/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/tasks/**").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/api/tasks/**").permitAll()
                       .requestMatchers(HttpMethod.GET, "/api/projects").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/projects/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/projects/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/tasks/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/tasks/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/columns/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/columns/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/subtasks/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/subtasks/**").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/api/subtasks/**").permitAll()





                        .anyRequest().authenticated() // All other requests require auth
                )
                .httpBasic(Customizer.withDefaults()).build();
    }



}