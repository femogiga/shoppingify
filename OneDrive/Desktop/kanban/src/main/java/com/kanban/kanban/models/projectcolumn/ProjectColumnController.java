package com.kanban.kanban.models.projectcolumn;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/columns")
@Controller
public class ProjectColumnController  {

    private final ProjectColumnService projectColumnService;

    public ProjectColumnController(ProjectColumnService projectColumnService){
        this.projectColumnService = projectColumnService;
    }


    @GetMapping
    public ResponseEntity<List<ProjectColumn>> getAll (){
        try{
            List<ProjectColumn> columns =  projectColumnService.getAll();
            return new ResponseEntity<>(columns, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>( HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
