package com.kanban.kanban.models.task;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.kanban.kanban.models.project.Project;
import com.kanban.kanban.models.projectcolumn.ProjectColumn;
import com.kanban.kanban.models.subtask.SubTask;
import com.kanban.kanban.models.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Entity
@Table(name = "task")
public class Task {
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

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL ,mappedBy = "task",orphanRemoval = true)
    private List<SubTask> subTasks = new ArrayList<>();

    @ManyToMany(mappedBy = "tasks")
    private List<User> taskMembers = new ArrayList<>();

    @Transient
    @JsonProperty("project_id")
    private Long projectId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="project_id")
    @JsonIgnore
    private Project project;

    @ManyToOne
    @JoinColumn(name = "project_column_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "project"})
    public ProjectColumn projectColumn;

    public Task (String title,String description , Status status,Project project){
        this.title = title;
        this.description = description;
        this.status = status;
        this.subTasks =  new ArrayList<>();
        this.taskMembers = new ArrayList<>();
        this.project = project;
    }

    public Task(){

    }


    public Long getId() {
        return id;
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

    public List<SubTask> getSubTasks() {
        return subTasks;
    }

    public void setSubTasks(List<SubTask> subTasks) {
        this.subTasks = subTasks;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public void addSubTask(SubTask subTask) {
        subTasks.add(subTask);
        subTask.setTask(this);
    }

    public void removeSubTask(SubTask subTask) {
        subTasks.remove(subTask);
        subTask.setTask(null);
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTaskMembers(List<User> taskMembers) {
        this.taskMembers = taskMembers;
    }
    @JsonProperty("project_id")
    public Long getProjectId() {
        return project != null ? project.getId() : this.projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public List<User> getTaskMembers(){
        return taskMembers;
    }

    public void setTaskMember(List<User> taskMembers){
        this.taskMembers = taskMembers;
    }

    public void addTaskMember(User user){
        this.taskMembers.add(user);
    }

    public void removeTaskMember(User user){
        this.taskMembers.remove(user);

    }

    public ProjectColumn getProjectColumn() {
        return projectColumn;
    }

    public void setProjectColumn(ProjectColumn projectColumn) {
        this.projectColumn = projectColumn;
    }


}
