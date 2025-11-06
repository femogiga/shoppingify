package com.kanban.kanban.models.user;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kanban.kanban.models.subtask.SubTask;
import com.kanban.kanban.models.task.Task;
import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Firstname is required")
    @Size(min = 2 , max=50 , message = "firstname must be between 2 and 50 characters")
    @Column(nullable = false)
    private String firstname;

    @NotBlank(message = "Lastname is required")
    @Size(min = 2 , max=50 , message = "Lastname must be between 2 and 50 characters")
    @Column(nullable = false)
    private String lastname;

    @NotBlank(message = "Email is required")
//    @Email(message = "Email should be valid")
    @Column(unique = true, nullable = false)
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 4, message = "Password must be at least 4 characters")
    @Column(nullable = false)
    private String password;

    public String photoUrl;
    @ManyToMany
    @JsonIgnore
    @JoinTable(name="subtask_users",joinColumns =@JoinColumn(name="user_id") , inverseJoinColumns = @JoinColumn(name="subtask_id"))
    private List<SubTask> subTasks = new ArrayList<>();

    @ManyToMany
    @JsonIgnore
    @JoinTable(name="task_users" , joinColumns = @JoinColumn(name="user_id",insertable = true,updatable = true) , inverseJoinColumns = @JoinColumn(name="task_id",insertable = true,updatable = true))
    private List<Task> tasks = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name="user_roles" , joinColumns = @JoinColumn(name="user_id"))
    @Column(name="roles")
    private List<String> roles = new ArrayList<>();

    public User(String firstname,String lastname,String email,String password,String photoUrl , List<String> roles){
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.photoUrl = photoUrl;
        this.tasks = new ArrayList<>();
        this.roles = roles != null ? roles : List.of("USER");
    }

    public User(){

    }

    public Long getId(){
        return id;
    }

    public String getFirstname(){
        return firstname;
    }



    public String getLastname(){
        return lastname;
    }


    public String getEmail(){
        return email;
    }

    public String getPassword(){
        return password;
    }

    public String getPhotoUrl(){
        return photoUrl;
    }

    public void setFirstname(String firstname){
        this.firstname = firstname;
    }

    public void setId(Long id){
        this.id = id;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<SubTask> getSubTasks(){
        return subTasks;
    }

    public void setSubTasks(List<SubTask> subTasks){
        this.subTasks = subTasks ;
    }

    public void addSubTasks(SubTask subTask){
        subTasks.add(subTask);
        subTask.getMembers().add(this);
    }


    public void removeSubTask(SubTask subTask){
        subTasks.remove(subTask);
        subTask.getMembers().remove(this);
    }


    public List<Task> getTasks(){
        return tasks;
    }

    public void setTasks(List<Task> tasks){
        this.tasks = tasks;
    }

    public void addTask(Task task){
        this.tasks.add(task);
        task.getTaskMembers().add(this);
    }

    public void removeTask(Task task){
        this.tasks.remove(task);
        task.getTaskMembers().remove(this);
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
