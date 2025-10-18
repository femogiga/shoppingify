package com.kanban.kanban.models.project;


import com.kanban.kanban.models.task.Status;
import com.kanban.kanban.models.task.Task;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="project")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String title;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "project",orphanRemoval = true,cascade = CascadeType.ALL)
    private List<Task> tasks = new ArrayList<>();


    @Enumerated(EnumType.STRING)
    private Status status;

    public Project(String title){
        this.title = title;
        this.tasks = new ArrayList<Task>();
        this.status = Status.TODO;
    }
    public Project() {

    }


    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
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

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }
}
