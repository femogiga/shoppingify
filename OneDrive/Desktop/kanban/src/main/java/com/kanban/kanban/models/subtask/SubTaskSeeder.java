package com.kanban.kanban.models.subtask;



import com.kanban.kanban.models.project.Project;
import com.kanban.kanban.models.project.ProjectRepository;
import com.kanban.kanban.models.task.Task;
import com.kanban.kanban.models.task.Status;
import com.kanban.kanban.models.subtask.SubTask;
import com.kanban.kanban.models.task.TaskRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class SubTaskSeeder implements CommandLineRunner {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;

    public SubTaskSeeder(TaskRepository taskRepository, ProjectRepository projectRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository =projectRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (taskRepository.count() == 0) {
            seedSampleTasks();
        }
    }

    private void seedSampleTasks() {
        System.out.println("🎯 Seeding sample tasks and subtasks...");

        Project project1 = new Project("Create front end");
        projectRepository.save(project1);

        Project project2 = new Project("Create backend end");
        projectRepository.save(project2);

        // ✅ FIXED: Use the constructor that only takes title, description, status
        Task task1 = new Task("Develop Company Website",
                "Create a responsive company website with modern design and SEO optimization. The website should showcase our services and portfolio.",
                Status.DOING,project1
        );

        // ✅ FIXED: Add subtasks after creating the task
        task1.addSubTask(new SubTask(
                "Design homepage layout",
                "Create wireframes and mockups for the homepage with focus on user experience",
                Status.DONE,
                task1
        ));

        task1.addSubTask(new SubTask(
                "Implement responsive navigation",
                "Build mobile-friendly navigation menu with dropdown functionality",
                Status.DOING,
                task1
        ));

        task1.addSubTask(new SubTask(
                "Optimize website performance",
                "Implement lazy loading and optimize images for faster page loads",
                Status.TODO,
                task1
        ));

        // Task 2
        Task task2 = new Task(
                "Build Mobile Application",
                "Develop a cross-platform mobile app for both iOS and Android using React Native.",
                Status.TODO,project1
        );

        task2.addSubTask(new SubTask(
                "Setup development environment",
                "Install React Native, Android Studio, and Xcode with necessary dependencies",
                Status.TODO,
                task2
        ));

        task2.addSubTask(new SubTask(
                "Design app user interface",
                "Create UI mockups and design system for consistent user experience",
                Status.TODO,
                task2
        ));

        // Task 3
        Task task3 = new Task(
                "Database Migration Project",
                "Transfer existing database from local server to cloud with zero downtime migration strategy.",
                Status.DOING,project2
        );

        task3.addSubTask(new SubTask(
                "Backup current database",
                "Create complete backup of all tables and stored procedures",
                Status.DONE,
                task3
        ));

        task3.addSubTask(new SubTask(
                "Setup cloud database instance",
                "Configure database instance with proper security groups and monitoring",
                Status.DONE,
                task3
        ));

        // Task 4
        Task task4 = new Task(
                "API Development for Frontend",
                "Develop comprehensive REST API for frontend applications with proper documentation and error handling.",
                Status.DONE,project2
        );

        task4.addSubTask(new SubTask(
                "Design API schema",
                "Create OpenAPI specification for all endpoints and data models",
                Status.DONE,
                task4
        ));

        task4.addSubTask(new SubTask(
                "Implement user management endpoints",
                "Build CRUD operations for user registration, login, and profile management",
                Status.DONE,
                task4
        ));

        // Save all tasks
        List<Task> tasks = Arrays.asList(task1, task2, task3, task4);
        taskRepository.saveAll(tasks);

        System.out.println("✅ Seeded " + tasks.size() + " sample tasks!");
        System.out.println("📊 Status Breakdown:");
        System.out.println("   - TODO: " + countTasksByStatus(tasks, Status.TODO));
        System.out.println("   - DOING: " + countTasksByStatus(tasks, Status.DOING));
        System.out.println("   - DONE: " + countTasksByStatus(tasks, Status.DONE));

        int totalSubTasks = tasks.stream()
                .mapToInt(task -> task.getSubTasks().size())
                .sum();
        System.out.println("   - Total Subtasks: " + totalSubTasks);
    }

    private long countTasksByStatus(List<Task> tasks, Status status) {
        return tasks.stream().filter(task -> task.getStatus() == status).count();
    }
}