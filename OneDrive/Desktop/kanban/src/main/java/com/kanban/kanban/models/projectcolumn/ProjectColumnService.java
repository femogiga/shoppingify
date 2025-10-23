package com.kanban.kanban.models.projectcolumn;


import com.kanban.kanban.models.project.ProjectService;
import com.kanban.kanban.models.task.Task;
import com.kanban.kanban.models.task.TaskRepository;
import com.kanban.kanban.models.task.TaskService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class ProjectColumnService {

    public final ProjectColumnRepository projectColumnRepository;
    public final TaskService taskService;
    public final TaskRepository taskRepository;


    public ProjectColumnService(ProjectColumnRepository projectColumnRepository, TaskService taskService, TaskRepository taskRepository) {
        this.projectColumnRepository = projectColumnRepository;
        this.taskService = taskService;
        this.taskRepository = taskRepository;
    }

    public ProjectColumn moveTaskToColumn(Long taskId, Long columnId) {
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("Task not found"));
        ProjectColumn targetColumn = projectColumnRepository.findById(columnId).orElseThrow(() -> new RuntimeException("Column not found"));

        ProjectColumn currentColumn = task.getProjectColumn();
        if (currentColumn != null) {
            currentColumn.removeTask(task);
            projectColumnRepository.save(currentColumn);
        }
        targetColumn.addTask(task);
        return projectColumnRepository.save(targetColumn);
    }

    public List<ProjectColumn> getAll() {

        return projectColumnRepository.findAll();
    }
}


