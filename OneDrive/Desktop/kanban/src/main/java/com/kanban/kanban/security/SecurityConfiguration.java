package com.kanban.kanban.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Autowired
    private JwtAuthEntryPoint jwtAuthEntryPoint;

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)

                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint(jwtAuthEntryPoint)
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(authz -> authz
                        // Public endpoints - no auth required
                        .requestMatchers("/api/auth/**").permitAll() // Allow login/register
                        .requestMatchers("/api/users/public/**").permitAll()

                        // 🔒 USER ENDPOINTS - SECURED
                        .requestMatchers(HttpMethod.POST, "/api/users").permitAll() // Allow registration only
                        .requestMatchers(HttpMethod.GET, "/api/users").hasRole("ADMIN") // Only admin can see all users
                        .requestMatchers(HttpMethod.GET, "/api/users/{id}").authenticated() // Users can see their own profile
                        .requestMatchers(HttpMethod.PUT, "/api/users/**").authenticated() // Require auth for updates
                        .requestMatchers(HttpMethod.DELETE, "/api/users/**").hasRole("ADMIN") // Only admin can delete

                        // Project endpoints
                        .requestMatchers(HttpMethod.GET, "/api/projects").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/projects/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/projects/**").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/projects/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/projects/**").hasRole("ADMIN")

                        // Task endpoints
                        .requestMatchers(HttpMethod.GET, "/api/tasks/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/tasks/**").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/tasks/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/tasks/**").authenticated()

                        // Column endpoints
                        .requestMatchers(HttpMethod.GET, "/api/columns/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/columns/**").authenticated()

                        // Subtask endpoints
                        .requestMatchers(HttpMethod.GET, "/api/subtasks/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/subtasks/**").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/subtasks/**").authenticated()

                        // Admin endpoints
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")

                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}