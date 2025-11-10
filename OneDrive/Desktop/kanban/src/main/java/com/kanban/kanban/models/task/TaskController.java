package com.kanban.kanban.models.task;


import com.kanban.kanban.models.user.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

            return new ResponseEntity<>(created, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


    @GetMapping("/{id}")
    public ResponseEntity<TaskDTO> getById(@PathVariable Long id){
        try{
            TaskDTO task = taskService.getTaskById(id);
            return new ResponseEntity<>(task,HttpStatus.OK);

        }
        catch(RuntimeException e){
            System.out.println(e);
            return new  ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<Task> updateTask(@RequestBody Task task){
//        try{
//            System.out.println(task.getProjectColumn());
//            Task updatedTask = taskService.updateTask(task);
//            return new ResponseEntity<>(updatedTask,HttpStatus.OK);
//        } catch (RuntimeException e) {
//            System.out.println(e);
//    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
@PutMapping("/{id}")
public ResponseEntity<Task> updateTask(@PathVariable Long id ,@RequestBody Task task) {
    try {
        System.out.println("Received task: " + task);
        System.out.println("ProjectColumn: " + task.getProjectColumn());
        System.out.println("ProjectColumn ID: " + (task.getProjectColumn() != null ? task.getProjectColumn().getId() : "null"));

        Task updatedTask = taskService.updateTask(id,task);
        return new ResponseEntity<>(updatedTask, HttpStatus.OK);
    } catch (RuntimeException e) {
        System.out.println("Update error: " + e.getMessage());
        e.printStackTrace();
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

@DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id){
        try {
            taskService.deleteTask(id);
            return new ResponseEntity<>("Task was sucessfully deleted",HttpStatus.OK);
        } catch (RuntimeException e) {
            System.out.println(e);
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
}

@PostMapping("/{id}/users")
    public  ResponseEntity<User> addUserToTask (@PathVariable  Long id , @RequestBody User user){
        try{
           User addedUser =  taskService.addUserToTask(id, user);
            return new ResponseEntity<>(addedUser, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return  new ResponseEntity<>( HttpStatus.INTERNAL_SERVER_ERROR);
        }
}
}
