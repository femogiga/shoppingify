package com.kanban.kanban.models.subtask;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("api/subtasks")
public class SubTaskController {
//    private final TaskRepository taskRepository;
    private final SubTaskService subTaskService;

    public SubTaskController(SubTaskService subTaskService){
        this.subTaskService = subTaskService;
    }

    @GetMapping
    public ResponseEntity<List<SubTask>> getTasks(){
        try{
            List<SubTask> subTasks = subTaskService.getTasks();
            if(subTasks.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(subTasks , HttpStatus.OK );
        } catch (RuntimeException e) {

            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
