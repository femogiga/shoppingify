package com.kanban.kanban.models.task;

import com.kanban.kanban.exceptions.TaskAlreadyExistException;
import com.kanban.kanban.models.project.Project;
import com.kanban.kanban.models.project.ProjectRepository;
import com.kanban.kanban.models.projectcolumn.ProjectColumn;
import com.kanban.kanban.models.projectcolumn.ProjectColumnRepository;
import com.kanban.kanban.models.subtask.SubTask;
import com.kanban.kanban.models.subtask.SubTaskDTO;
import com.kanban.kanban.models.subtask.SubTaskRepository;
import com.kanban.kanban.models.user.User;
import com.kanban.kanban.models.user.UserDTO;
import com.kanban.kanban.models.user.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class TaskService {
    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final ProjectColumnRepository projectColumnRepository;
    @Autowired
    private final SubTaskRepository subTaskRepository;

    @Autowired
    private UserRepository userRepository;
    public TaskService(TaskRepository taskRepository, ProjectRepository projectRepository, ProjectColumnRepository projectColumnRepository, SubTaskRepository subTaskRepository ,UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
        this.projectColumnRepository = projectColumnRepository;
        this.subTaskRepository = subTaskRepository;
        this.userRepository = userRepository;
    }

    public List<Task> getTasks() {
        return (List<Task>) taskRepository.findAll();
    }

    public Task createTask(Task task) {
        if (taskRepository.existsByTitle(task.getTitle())) {
            throw new TaskAlreadyExistException();
        }

        Project project = projectRepository.findById(task.getProjectId()).orElseThrow(() -> new RuntimeException("Project not found"));
        task.setProject(project);
        return taskRepository.save(task);


    }

    public List<Task> getTaskAndUser() {
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
                                        subTask.getTask().getId(),
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


    public Task saveTaskDefault(Task task) {
        if (taskRepository.existsByTitle(task.getTitle())) {
            throw new TaskAlreadyExistException();
        }

        Project project = projectRepository.findById(task.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project does not exist"));

        // Get the FIRST column instead of hardcoded "TODO"
        ProjectColumn firstColumn = project.getProjectColumns().stream()
                .findFirst() // Get the first column
                .orElseThrow(() -> new RuntimeException("No columns exist in this project"));

        // Or if you want to ensure it's sorted by creation order:
        // Sort by ID (creation order)
        ProjectColumn column = project.getProjectColumns().stream().min(Comparator.comparing(ProjectColumn::getId))
                .orElseThrow(() -> new RuntimeException("No columns exist in this project"));

        System.out.println("Adding task to first column: " + firstColumn.getName());

        // Set relationships
        task.setProject(project);
        task.setProjectColumn(column);


        if (task.getSubTasks() != null) {
            for (SubTask subtask : task.getSubTasks()) {
                subtask.setStatus(Status.TODO);
                subtask.setDescription("Fill in later");

                subtask.setTask(task); // Set the relationship BEFORE saving

                System.out.println("Subtask with task reference: " + subtask);
            }
        }

        // Save task (subtasks will be saved due to cascade if configured properly)
        return taskRepository.save(task);
    }


    public Task updateTask(Long id, Task updatedTask) {
        try {
            System.out.println("=== TASK DETAILS ===");
            System.out.println("ID: " + updatedTask.getId());
            System.out.println("Title: " + updatedTask.getTitle());
            System.out.println("Description: " + updatedTask.getDescription());
            System.out.println("Status: " + updatedTask.getStatus());

            if (updatedTask.getProjectColumn() != null) {
                System.out.println("ProjectColumn ID: " + updatedTask.getProjectColumn().getId());
                System.out.println("ProjectColumn Name: " + updatedTask.getProjectColumn().getName());
            } else {
                System.out.println("ProjectColumn: null");
            }

            System.out.println("====================");

            Task currentTask = taskRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Task not found"));

            // Basic fields
            if (updatedTask.getTitle() != null) currentTask.setTitle(updatedTask.getTitle());
            if (updatedTask.getDescription() != null) currentTask.setDescription(updatedTask.getDescription());
            if (updatedTask.getStatus() != null) currentTask.setStatus(updatedTask.getStatus());
            if (updatedTask.getSubTasks() != null && !updatedTask.getSubTasks().isEmpty()) {
                List<SubTask> newSubtasks = updatedTask.getSubTasks().stream()
                        .filter(subTask -> subTask.getId() == null) // Only new subtasks
                        .filter(subTask -> !subTaskRepository.existsByTitleAndTaskId(
                                subTask.getTitle(), currentTask.getId())) // Check within current task
                        .map(subTask -> {
                            subTask.setTask(currentTask); // Set the task relationship
                            return subTaskRepository.save(subTask);
                        })
                        .toList();

                newSubtasks.forEach(currentTask::addSubTask);
                System.out.println("Added " + newSubtasks.size() + " new subtasks");
            }

            // Handle column move
            if (updatedTask.getProjectColumn() != null && updatedTask.getProjectColumn().getId() != null) {
                Long columnId = updatedTask.getProjectColumn().getId();
                ProjectColumn newColumn = projectColumnRepository.findById(columnId)
                        .orElseThrow(() -> new RuntimeException("Column not found"));

                if (currentTask.getProjectColumn() != null) {
                    currentTask.getProjectColumn().removeTask(currentTask);
                }

                currentTask.setProjectColumn(newColumn);
                newColumn.addTask(currentTask);
            }

            return taskRepository.save(currentTask);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e);
             throw new RuntimeException();
        }

    }


    public TaskDTO getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        return new TaskDTO(
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
        );
    }

    public void deleteTask(Long id){
        Task task = taskRepository.findById(id).orElseThrow(()->new RuntimeException("Task not found"));
        if (task.getProjectColumn() != null) {
            task.getProjectColumn().removeTask(task);
        }
        task.getSubTasks().clear();
        task.getTaskMembers().clear();

        taskRepository.delete(task);
    }

    public User addUserToTask(Long taskId,User addedUser){
        User user = userRepository.findById(addedUser.getId()).orElseThrow(()-> new RuntimeException("User does not exist"));
        Task task = taskRepository.findById(taskId).orElseThrow(()-> new RuntimeException("Task does not exist"));
        if(task.getTaskMembers().contains(user)){
            throw new RuntimeException("User already exist in task");
        }
        task.addTaskMember(user);
        user.addTask(task);
        taskRepository.save(task);
        return userRepository.save(user);
    }
}