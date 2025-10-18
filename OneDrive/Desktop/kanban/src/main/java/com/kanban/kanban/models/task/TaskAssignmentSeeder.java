package com.kanban.kanban.models.task;

import com.kanban.kanban.models.subtask.SubTaskRepository;
import com.kanban.kanban.models.user.User;
import com.kanban.kanban.models.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Order(1)
public class TaskAssignmentSeeder  implements CommandLineRunner {
    private  TaskRepository taskRepository;
    private UserRepository userRepository;
    private SubTaskRepository subTaskRepository;

    public TaskAssignmentSeeder(TaskRepository taskRepository , UserRepository userRepository , SubTaskRepository subTaskRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.subTaskRepository = subTaskRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        assignUsersToTasks();


    }

    public void assignUsersToTasks(){
        List<User> users = (List<User>) userRepository.findAll();
        List<Task> tasks = (List<Task>) taskRepository.findAll();
        System.out.println(tasks);
        if(users.isEmpty() || tasks.isEmpty()){
            System.out.println("⚠️ No users or tasks found for assignment");
return;
        }
        System.out.println("👥 Assigning users to tasks...");
        if (users.size() >= 3 && !tasks.isEmpty()) {
            users.get(0).addTask(tasks.getFirst()); // John → Website Development
            users.get(1).addTask(tasks.getFirst()); // Sarah → Website Development
            users.get(2).addTask(tasks.getFirst()); // Mike → Website Development
        }

        if (users.size() >= 2 && tasks.size() >= 2) {
            users.get(1).addTask(tasks.get(1)); // Sarah → Mobile App
        }

        // Task 3: Different users
        if (users.size() >= 3 && tasks.size() >= 3) {
            users.get(2).addTask(tasks.get(2)); // Mike → Database Migration
            users.get(0).addTask(tasks.get(2)); // John → Database Migration
        }

        userRepository.saveAll(users);
        System.out.println("✅ User-task assignments completed!");

        // Print assignments
        for (Task task : tasks) {
            System.out.println("📋 Task: " + task.getTitle() +
                    " | Assigned Users: " + task.getTaskMembers().size());
        }

    }
}
