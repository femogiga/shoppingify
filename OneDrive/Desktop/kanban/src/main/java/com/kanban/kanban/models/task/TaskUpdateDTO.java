package com.kanban.kanban.models.task;

public class TaskUpdateDTO {
    public Long id;
    private String title;
    private String description;
    private Status status;
    private Long projectColumnId; // Only pass column ID

    public TaskUpdateDTO(Long id ,String title , String description, Status status ,Long projectColumnId){
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.projectColumnId = projectColumnId;
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

    public void setStatus(Status status) {
        this.status = status;
    }

    public Long getProjectColumnId() {
        return projectColumnId;
    }

    public void setProjectColumnId(Long projectColumnId) {
        this.projectColumnId = projectColumnId;
    }
}
