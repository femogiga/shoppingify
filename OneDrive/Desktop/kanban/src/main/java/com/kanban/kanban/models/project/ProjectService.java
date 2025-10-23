package com.kanban.kanban.models.project;

import com.kanban.kanban.models.projectcolumn.ProjectColumn;
import com.kanban.kanban.models.projectcolumn.ProjectColumnDTO;
import com.kanban.kanban.models.subtask.SubTaskDTO;
import com.kanban.kanban.models.task.Task;
import com.kanban.kanban.models.task.TaskDTO;
import com.kanban.kanban.models.user.UserDTO;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.Arrays;
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



    // Keep original method if you still need flat list
    public List<Project> getProjects(){
        return projectRepository.findAll();
    }

    public Project createProject (Project project) {
        return projectRepository.save(project);
    }

    public Project createProjectWithColumns(Project project){
       project.addProjectColumn(new ProjectColumn("TODO"));
       project.addProjectColumn(new ProjectColumn("DOING"));
       project.addProjectColumn(new ProjectColumn("DONE"));

       return projectRepository.save(project);

    }



    public List<ProjectDTO> getAllProjects(){
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

}