package com.kanban.kanban.models.subtask;

import com.kanban.kanban.exceptions.TaskAlreadyExistException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class SubTaskService {
    private final SubTaskRepository subTaskRepository;
    public SubTaskService(SubTaskRepository subTaskRepository){
        this.subTaskRepository = subTaskRepository;
    }

    public List<SubTask> getTasks(){
        return (List <SubTask>) subTaskRepository.findAll();
    }

    public SubTask createTask (SubTask subTask){
        if(subTaskRepository.existsByTitle(subTask.getTitle())){
            throw new TaskAlreadyExistException();
        }
        return subTaskRepository.save(subTask);
    }
}
