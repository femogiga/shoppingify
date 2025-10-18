package com.kanban.kanban.models.task;

import com.kanban.kanban.exceptions.TaskAlreadyExistException;
import com.kanban.kanban.models.subtask.SubTaskDTO;
import com.kanban.kanban.models.user.UserDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class TaskService {
    private final TaskRepository taskRepository;
    public TaskService (TaskRepository taskRepository){
        this.taskRepository = taskRepository;
    }

    public List<Task> getTasks(){
        return (List <Task>) taskRepository.findAll();
    }

    public Task createTask (Task task){
        if(taskRepository.existsByTitle(task.getTitle())){
            throw new TaskAlreadyExistException();
        }
        return taskRepository.save(task);
    }

    public List<Task> getTaskAndUser(){
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


}
