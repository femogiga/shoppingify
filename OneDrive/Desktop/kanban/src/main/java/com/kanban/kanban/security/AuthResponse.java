package com.kanban.kanban.security;

import java.util.List;

public class AuthResponse {

    private String token;
    private String email;
    private String firstname;
    private String lastname;
    private List<String>  roles;

    public AuthResponse(){}

    public AuthResponse(String token , String email , String firstname,String lastname ,List<String> roles){
        this.token = token ;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.roles = roles;
    }


    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
