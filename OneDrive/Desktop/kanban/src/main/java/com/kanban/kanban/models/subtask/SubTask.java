package com.kanban.kanban.models.subtask;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.kanban.kanban.models.task.Status;
import com.kanban.kanban.models.task.Task;
import com.kanban.kanban.models.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@Entity
@Table(name = "subtask")
public class SubTask {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title cannot be null")
    @Size(min=5 , max = 100 ,message = "Title must be between 5 and 100 characters")
    @Column(nullable = false,length = 255)
    private String title;

    @NotBlank(message = "Description cannot be null")
    @Size(min=5 , max = 1000 ,message = "Description must be between 5 and 1000 characters")
    @Column(nullable = false)
    private String description;

//    @NotBlank(message = "Status cannot be null and must be TODO or DOING or DONE")
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @JoinColumn( name="task_id",nullable = false)
    private Task task;

   @ManyToMany(mappedBy = "subTasks")
   @JsonIgnore
   private List<User> members = new ArrayList<>();

    public SubTask (String title, String description , Status status , Task task){
        this.title = title;
        this.description = description;
        this.status = status;
        this.task = task;
        this.members = new ArrayList<>();
    }

    public SubTask(){

    }
/**************************************************************************/
    public void  addMembers(User user){
        members.add(user);
        user.getSubTasks().add(this);

    }

    public void removeMembers(User user){
        members.remove(user);
        user.getSubTasks().remove(this);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Status getStatus() {
        return status;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public List<User> getMembers() {
        return members;
    }

    public void setMembers(List<User> members) {
        this.members = members;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
