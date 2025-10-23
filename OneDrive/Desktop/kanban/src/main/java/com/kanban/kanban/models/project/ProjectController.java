package com.kanban.kanban.models.project;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("api/projects")
public class ProjectController {


    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }


    @GetMapping
    public ResponseEntity<List<ProjectDTO>> getProjects(){
        try {
            List<ProjectDTO> projects = projectService.getAllProjects();
            if(projects.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(projects,HttpStatus.OK);
        } catch (RuntimeException e) {
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/projectwithtask")
    public ResponseEntity<List<Project>> getProjectsWithTask(){
        try {
            List<Project> projects = projectService.getProjects();
            if(projects.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(projects,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/doing")
    public ResponseEntity<Project> createProject(@RequestBody Project project){
        try {
            Project created = projectService.createProject(project);
            return new ResponseEntity<>(created, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping
    public ResponseEntity<Project> createProjectWithDefaultColumns (@RequestBody Project project){
        try{
            Project created = projectService.createProjectWithColumns(project);
            return new ResponseEntity<>(created , HttpStatus.CREATED);
        }
        catch(RuntimeException e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
