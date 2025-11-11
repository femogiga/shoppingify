package com.kanban.kanban.models.user;

import com.kanban.kanban.exceptions.EmailAlreadyExistException;
import com.kanban.kanban.exceptions.UserNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

import java.util.Optional;

@Service
@Transactional
public class UserService {
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public List<User> getAllUser(){
        return (List<User>) userRepository.findAll();
    }

    public Optional<User> findById(Long id){
        return userRepository.findById(id);
    }

    public User create(User user){
        if(userRepository.existsByEmail(user.getEmail())){
            throw new EmailAlreadyExistException(user.getEmail());
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User update(Long id, User userDetails){
        try {
            User user = userRepository.findById(id)
                    .orElseThrow(() -> new UserNotFoundException(id));

            // Update fields
            if (userDetails.getFirstname() != null) {
                user.setFirstname(userDetails.getFirstname());
            }
            if (userDetails.getLastname() != null) {
                user.setLastname(userDetails.getLastname());
            }
            if (userDetails.getEmail() != null && !userDetails.getEmail().equals(user.getEmail())) {
                if (userRepository.existsByEmail(userDetails.getEmail())) {
                    throw new EmailAlreadyExistException(userDetails.getEmail());
                }
                user.setEmail(userDetails.getEmail());
            }
            if (userDetails.getPassword() != null) {
                user.setPassword(userDetails.getPassword());
            }
            if (userDetails.getPhotoUrl() != null) {
                user.setPhotoUrl(userDetails.getPhotoUrl());
            }

            return userRepository.save(user);
        } catch (Exception e) {
            System.out.println(e);
            throw new RuntimeException(e);
        }
    }

    public void delete(Long id){
        User user = userRepository.findById(id).orElseThrow();
        userRepository.deleteById(id);
    }


    public Optional<User> findUserByEmail (String email){
       return  userRepository.findUserByEmail(email);
    }


    public User updateUserRoles(Long id, List<String> roles) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        user.setRoles(roles);
        return userRepository.save(user);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }


}
