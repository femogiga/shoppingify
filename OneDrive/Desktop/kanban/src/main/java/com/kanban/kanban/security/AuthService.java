package com.kanban.kanban.security;

import com.kanban.kanban.models.user.User;
import com.kanban.kanban.models.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    public AuthResponse register(RegisterRequest registerRequest){
        if(userRepository.existsByEmail(registerRequest.getEmail())){
            throw new RuntimeException("Email is Already taken");
        }

        User user = new User();
        user.setFirstname(registerRequest.getFirstname());
        user.setLastname(registerRequest.getLastname());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setPhotoUrl(registerRequest.getPhotoUrl());

        if(registerRequest.getRoles() == null || registerRequest.getRoles().isEmpty()){
            user.setRoles(List.of("USER"));
        }
        else{
            user.setRoles(registerRequest.getRoles());
        }
        User savedUser  = userRepository.save(user);

        String token = jwtService.generateToken(savedUser.getEmail(),savedUser.getRoles());

        return new AuthResponse(
                token,
                savedUser.getEmail(),
                savedUser.getFirstname(),
                savedUser.getLastname(),
                savedUser.getPhotoUrl(), // ✅ ADDED THIS
                savedUser.getRoles()
        );
    }

    public AuthResponse login (LoginRequest loginRequest){
        Authentication authentication  = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),loginRequest.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(()-> new RuntimeException("User not found"));
        System.out.println(user);

        String token = jwtService.generateToken(user.getEmail(),user.getRoles());

        System.out.println(token);

        return new AuthResponse(
                token,
                user.getEmail(),
                user.getFirstname(),
                user.getLastname(),
                user.getPhotoUrl(), // ✅ ADDED THIS
                user.getRoles()
        );
    }

    public Optional<User> getCurrentUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null && authentication.isAuthenticated()){
            String email = authentication.getName();
            return userRepository.findByEmail(email);
        }
        return Optional.empty();
    }
}