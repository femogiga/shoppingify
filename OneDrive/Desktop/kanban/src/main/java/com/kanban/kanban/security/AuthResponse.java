package com.kanban.kanban.security;

import java.util.List;

public class AuthResponse {
    private String token;
    private String email;
    private String firstname;
    private String lastname;
    private String photoUrl; // ✅ ADD THIS FIELD
    private List<String> roles;

    public AuthResponse(){}

    public AuthResponse(String token, String email, String firstname, String lastname, String photoUrl, List<String> roles){
        this.token = token;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.photoUrl = photoUrl; // ✅ ADD THIS
        this.roles = roles;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getFirstname() { return firstname; }
    public void setFirstname(String firstname) { this.firstname = firstname; }
    public String getLastname() { return lastname; }
    public void setLastname(String lastname) { this.lastname = lastname; }
    public String getPhotoUrl() { return photoUrl; } // ✅ ADD GETTER
    public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; } // ✅ ADD SETTER
    public List<String> getRoles() { return roles; }
    public void setRoles(List<String> roles) { this.roles = roles; }
}