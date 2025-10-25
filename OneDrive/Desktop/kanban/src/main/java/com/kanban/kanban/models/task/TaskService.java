package com.kanban.kanban.models.task;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kanban.kanban.exceptions.TaskAlreadyExistException;
import com.kanban.kanban.models.project.Project;
import com.kanban.kanban.models.project.ProjectRepository;
import com.kanban.kanban.models.projectcolumn.ProjectColumn;
import com.kanban.kanban.models.projectcolumn.ProjectColumnRepository;
import com.kanban.kanban.models.subtask.SubTaskDTO;
import com.kanban.kanban.models.user.UserDTO;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class TaskService {
    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final ProjectColumnRepository projectColumnRepository;

    public TaskService(TaskRepository taskRepository, ProjectRepository projectRepository, ProjectColumnRepository projectColumnRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
        this.projectColumnRepository = projectColumnRepository;

    }

    public List<Task> getTasks() {
        return (List<Task>) taskRepository.findAll();
    }

    public Task createTask(Task task) {
        if (taskRepository.existsByTitle(task.getTitle())) {
            throw new TaskAlreadyExistException();
        }

        Project project = projectRepository.findById(task.getProjectId()).orElseThrow(() -> new RuntimeException("Project not found"));
        task.setProject(project);
        return taskRepository.save(task);


    }

    public List<Task> getTaskAndUser() {
        return taskRepository.findAll();
    }

    public List<TaskDTO> getAllTasks() {
        return taskRepository.findAll().stream()
                .map(task -> new TaskDTO(
                        task.getId(),
                        task.getTitle(),
                        task.getDescription(),
                        task.getStatus(),

                        // Map task members
                        task.getTaskMembers().stream()
                                .map(user -> new UserDTO(
                                        user.getId(),
                                        user.getFirstname(),
                                        user.getLastname(),
                                        user.getEmail(),
                                        user.getPhotoUrl() // ✅ fixed
                                ))
                                .toList(),

                        // Map subtasks
                        task.getSubTasks().stream()
                                .map(subTask -> new SubTaskDTO(
                                        subTask.getId(),
                                        subTask.getTitle(),
                                        subTask.getDescription(),
                                        subTask.getStatus(),
                                        subTask.getTask().getId(),
                                        // Map subtask members
                                        subTask.getMembers().stream().distinct()
                                                .map(member -> new UserDTO(
                                                        member.getId(),
                                                        member.getFirstname(),
                                                        member.getLastname(),
                                                        member.getEmail(),
                                                        member.getPhotoUrl() // ✅ fixed
                                                ))
                                                .toList()
                                ))
                                .toList() // ✅ close subTask mapping
                ))
                .toList(); // ✅ close task mapping
    }


    public Task saveTaskDefault(Task task) {
        if (taskRepository.existsByTitle(task.getTitle())) {
            throw new TaskAlreadyExistException();
        }
        System.out.println("projectId " + task.getProjectId());

        Project project = projectRepository.findById(task.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project does not exist"));

        ProjectColumn todoColumn = project.getProjectColumns().stream()
                .filter(column -> column.getName().equals("TODO"))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("TODO column does not exist"));
        System.out.println(task.getProjectId());
        // Set both relationships
        task.setProject(project);
        task.setProjectColumn(todoColumn);
        System.out.println("Working here");
        // Just save the task - JPA will handle the rest
        return taskRepository.save(task);
    }


    public Task updateTask(Long id,Task updatedTask) {

            System.out.println("=== TASK DETAILS ===");
            System.out.println("ID: " + updatedTask.getId());
            System.out.println("Title: " + updatedTask.getTitle());
            System.out.println("Description: " + updatedTask.getDescription());
            System.out.println("Status: " + updatedTask.getStatus());

            if (updatedTask.getProjectColumn() != null) {
                System.out.println("ProjectColumn ID: " + updatedTask.getProjectColumn().getId());
                System.out.println("ProjectColumn Name: " + updatedTask.getProjectColumn().getName());
            } else {
                System.out.println("ProjectColumn: null");
            }

            System.out.println("====================");

        Task currentTask = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        // Basic fields
        if (updatedTask.getTitle() != null) currentTask.setTitle(updatedTask.getTitle());
        if (updatedTask.getDescription() != null) currentTask.setDescription(updatedTask.getDescription());
        if (updatedTask.getStatus() != null) currentTask.setStatus(updatedTask.getStatus());

        // Handle column move
        if (updatedTask.getProjectColumn() != null && updatedTask.getProjectColumn().getId() != null) {
            Long columnId = updatedTask.getProjectColumn().getId();
            ProjectColumn newColumn = projectColumnRepository.findById(columnId)
                    .orElseThrow(() -> new RuntimeException("Column not found"));

            if (currentTask.getProjectColumn() != null) {
                currentTask.getProjectColumn().removeTask(currentTask);
            }

            currentTask.setProjectColumn(newColumn);
            newColumn.addTask(currentTask);
        }

        return taskRepository.save(currentTask);
    }

//    public Task updateTask( TaskUpdateDTO taskUpdate) {
//        Task currentTask = taskRepository.findById(taskUpdate.getId())
//                .orElseThrow(() -> new RuntimeException("Task not found"));
//
//        // Update basic fields
//        if (taskUpdate.getTitle() != null) {
//            currentTask.setTitle(taskUpdate.getTitle());
//        }
//        if (taskUpdate.getDescription() != null) {
//            currentTask.setDescription(taskUpdate.getDescription());
//        }
//        if (taskUpdate.getStatus() != null) {
//            currentTask.setStatus(taskUpdate.getStatus());
//        }
//
//        // Handle column change
//        if (taskUpdate.getProjectColumnId() != null) {
//            ProjectColumn newColumn = projectColumnRepository.findById(taskUpdate.getProjectColumnId())
//                    .orElseThrow(() -> new RuntimeException("Column not found"));
//
//            // Remove from old column
//            if (currentTask.getProjectColumn() != null) {
//                currentTask.getProjectColumn().removeTask(currentTask);
//            }
//
//            // Add to new column
//            currentTask.setProjectColumn(newColumn);
//            newColumn.addTask(currentTask);
//        }
//
//        return taskRepository.save(currentTask);
//    }
}