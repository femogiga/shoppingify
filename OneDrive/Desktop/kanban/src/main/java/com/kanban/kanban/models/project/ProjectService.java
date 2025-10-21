package com.kanban.kanban.models.project;

import com.kanban.kanban.models.subtask.SubTaskDTO;
import com.kanban.kanban.models.task.Task;
import com.kanban.kanban.models.task.TaskDTO;
import com.kanban.kanban.models.user.UserDTO;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository){
        this.projectRepository = projectRepository;
    }

    public List<ProjectDTO> getAllProjectsWithTasksGroupedByStatus(){
        return projectRepository.findAll().stream()
                .map(project -> {
                    // Group tasks by status for this specific project
                    Map<String, List<TaskDTO>> tasksByStatus = project.getTasks().stream()
                            .collect(Collectors.groupingBy(
                                    task->task.getStatus().name(), // Group by task status
                                    Collectors.mapping(this::convertToTaskDTO, Collectors.toList())
                            ));

                    return new ProjectDTO(
                            project.getId(),
                            project.getTitle(),
                            project.getStatus(),
                            tasksByStatus // Map of status -> List<TaskDTO>
                    );
                }).toList();
    }

    // Helper method to convert Task to TaskDTO
    private TaskDTO convertToTaskDTO(Task task) {
        return new TaskDTO(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getTaskMembers().stream().map(user -> new UserDTO(
                        user.getId(),
                        user.getFirstname(),
                        user.getLastname(),
                        user.getEmail(),
                        user.getPhotoUrl()
                )).toList(),
                task.getSubTasks().stream().map(subTask -> new SubTaskDTO(
                        subTask.getId(),
                        subTask.getTitle(),
                        subTask.getDescription(),
                        subTask.getStatus(),
                        subTask.getMembers().stream().map(user -> new UserDTO(
                                user.getId(),
                                user.getFirstname(),
                                user.getLastname(),
                                user.getEmail(),
                                user.getPhotoUrl()
                        )).toList()
                )).toList()
        );
    }

    // Keep original method if you still need flat list
    public List<Project> getProjects(){
        return projectRepository.findAll();
    }

    public Project createProject (Project project) {
        return projectRepository.save(project);
    }
}