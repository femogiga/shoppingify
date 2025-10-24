package com.kanban.kanban.models.task;

import com.kanban.kanban.exceptions.TaskAlreadyExistException;
import com.kanban.kanban.models.project.Project;
import com.kanban.kanban.models.project.ProjectRepository;
import com.kanban.kanban.models.projectcolumn.ProjectColumn;
import com.kanban.kanban.models.projectcolumn.ProjectColumnRepository;
import com.kanban.kanban.models.subtask.SubTaskDTO;
import com.kanban.kanban.models.user.UserDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
}