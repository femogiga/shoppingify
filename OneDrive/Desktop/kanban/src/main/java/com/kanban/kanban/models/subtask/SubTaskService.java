package com.kanban.kanban.models.subtask;

import com.kanban.kanban.exceptions.TaskAlreadyExistException;
import jakarta.transaction.Transactional;
import org.springframework.dao.DataIntegrityViolationException;
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

    public SubTask updateSubtask(SubTask subTask){
        try {
            System.out.println(subTask);
            SubTask currentSubTask = subTaskRepository.findById(subTask.getId()).orElseThrow(() -> new RuntimeException("Subtask not found"));
            if(subTask.getStatus() != null){
                System.out.println(subTask.getStatus());
                currentSubTask.setStatus(subTask.getStatus());


            }
            System.out.println(currentSubTask.getStatus());
//        currentSubTask.setId(subTask.getId());
            if(subTask.getDescription() != null){
                currentSubTask.setDescription(subTask.getDescription());

            }

            if(subTask.getTitle() !=null){
                currentSubTask.setTitle(subTask.getTitle());

            }
            System.out.println("Subtask updated successfully");

            return subTaskRepository.save(currentSubTask);
        }
        catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Database constraint violation: " + e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("Failed to update subtask: " + e.getMessage());
        }
    }
}
