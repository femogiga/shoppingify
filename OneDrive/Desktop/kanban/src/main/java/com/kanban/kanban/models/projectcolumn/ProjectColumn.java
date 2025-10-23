package com.kanban.kanban.models.projectcolumn;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kanban.kanban.models.project.Project;
import com.kanban.kanban.models.task.Task;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;


@Entity
public class ProjectColumn {

    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;


    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "project_id" , nullable = false)
    private Project project;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY ,cascade = CascadeType.DETACH,mappedBy = "projectColumn")
    private List<Task> tasks = new ArrayList<>();

    public ProjectColumn(String name){
        this.name = name;
        this.tasks = new ArrayList<>();
    }

    public ProjectColumn(){

    }

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public String getName(){
        return  name;
    }
    public void setName(String name){
        this.name = name;
    }


    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public void addTask(Task task){
        this.tasks.add(task);
        task.setProjectColumn(this);

    }

    public void removeTask(Task task){
        tasks.remove(task);
        task.setProjectColumn(null);
    }
}

