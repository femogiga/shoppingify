package com.kanban.kanban.models.task;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("api/tasks")
public class TaskController {
//    private final TaskRepository taskRepository;
    private final TaskService taskService;

    public TaskController(TaskService taskService){
        this.taskService  = taskService;
    }
    @GetMapping("/taskwithusers")
    public ResponseEntity<List<TaskDTO>> getTaskWithAllUsers (){
        List<TaskDTO> tasks = taskService.getAllTasks();
        return new ResponseEntity<>(tasks , HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity<List<Task>> getTasks(){
        try{
            List<Task> tasks = taskService.getTasks();
            if(tasks.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(tasks , HttpStatus.OK );
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @GetMapping("/id")
//    public ResponseEntity<List<Task>> getTaskById (@PathVariable Long id){
//        List<Task> task = taskService.getTask
//    }


    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody  Task task){
        try{
            Task created = taskService.saveTaskDefault(task);

            return new ResponseEntity<>(task, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


}
