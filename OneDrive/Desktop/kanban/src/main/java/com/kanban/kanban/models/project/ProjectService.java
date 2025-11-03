package com.kanban.kanban.models.project;

import com.kanban.kanban.models.projectcolumn.ProjectColumn;
import com.kanban.kanban.models.projectcolumn.ProjectColumnDTO;
import com.kanban.kanban.models.projectcolumn.ProjectColumnRepository;
import com.kanban.kanban.models.subtask.SubTaskDTO;
import com.kanban.kanban.models.task.TaskDTO;
import com.kanban.kanban.models.user.UserDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class ProjectService {

    private final ProjectRepository projectRepository;

    @Autowired
    private ProjectColumnRepository projectColumnRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }


    // Keep original method if you still need flat list
    public List<Project> getProjects() {
        return projectRepository.findAll();
    }

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    @Transactional
    public Project createProjectWithColumns(Project project) {
        // Handle default columns if none provided
        if (project.getProjectColumns() == null || project.getProjectColumns().isEmpty()) {
            project.addProjectColumn(new ProjectColumn("TODO"));
            project.addProjectColumn(new ProjectColumn("DOING"));
            project.addProjectColumn(new ProjectColumn("DONE"));
        } else {
            // Ensure bidirectional relationship for provided columns
            for (ProjectColumn column : project.getProjectColumns()) {
                column.setProject(project);
            }
        }

        // Save project (columns will be saved due to cascade)
        return projectRepository.save(project);
    }

    public List<ProjectDTO> getAllProjects() {
        return projectRepository.findAll().stream().map(project -> new ProjectDTO(
                project.getId(),
                project.getTitle(),
                project.getStatus(),
                project.getProjectColumns().stream().map(column -> new ProjectColumnDTO(
                        column.getId(),
                        column.getProject().getId(),
                        column.getName(),
                        column.getTasks().stream().map(task -> new TaskDTO(
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
                                        subTask.getTask().getId(),
                                        subTask.getMembers().stream().map(user -> new UserDTO(
                                                user.getId(),
                                                user.getFirstname(),
                                                user.getLastname(),
                                                user.getEmail(),
                                                user.getPhotoUrl()
                                        )).toList()
                                )).toList()
                        )).toList()
                )).toList()
        )).toList();
    }


    public ProjectDTO getProjectById(Long id) {
        return projectRepository.findAll().stream().map(project -> new ProjectDTO(
                project.getId(),
                project.getTitle(),
                project.getStatus(),
                project.getProjectColumns().stream().map(column -> new ProjectColumnDTO(
                        column.getId(),
                        column.getProject().getId(),
                        column.getName(),
                        column.getTasks().stream().map(task -> new TaskDTO(
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
                                        subTask.getTask().getId(),
                                        subTask.getMembers().stream().map(user -> new UserDTO(
                                                user.getId(),
                                                user.getFirstname(),
                                                user.getLastname(),
                                                user.getEmail(),
                                                user.getPhotoUrl()
                                        )).toList()
                                )).toList()
                        )).toList()
                )).toList()
        )).filter(project->project.id().equals(id)).findFirst().orElseThrow(()->new RuntimeException("project not found"));
    }

    public Project updateProject(Long id, Project updatedProject) {
        System.out.println("Incoming title: " + updatedProject.getTitle());

        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        System.out.println("title of update: " + updatedProject.getTitle());

        // Update title - this part actually works
        if (updatedProject.getTitle() != null && !project.getTitle().equals(updatedProject.getTitle())) {
            project.setTitle(updatedProject.getTitle());
        }

        // Fix column updating logic
        if (updatedProject.getProjectColumns() != null) {
            for (ProjectColumn updatedColumn : updatedProject.getProjectColumns()) {
                // Find the corresponding column in the existing project
                project.getProjectColumns().stream()
                        .filter(existingColumn -> existingColumn.getId().equals(updatedColumn.getId()))
                        .findFirst()
                        .ifPresent(existingColumn -> {
                            // Update the column name if changed
                            if (!existingColumn.getName().equals(updatedColumn.getName())) {
                                existingColumn.setName(updatedColumn.getName());
                            }
                        });
            }
        }

        return projectRepository.save(project);
    }
}