package com.kanban.kanban.models.task;

import com.kanban.kanban.models.project.Project;
import com.kanban.kanban.models.project.ProjectRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


//@Component

public class TaskSeeder implements  CommandLineRunner {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;

    public TaskSeeder(TaskRepository taskRepository,ProjectRepository projectRepository){
        this.taskRepository = taskRepository;
        this.projectRepository =projectRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        taskRepository.deleteAll();

        Project project1 = new Project("Create front end");
        projectRepository.save(project1);
         Task task = new Task("Build UI for pnBoarding", "This must be done asap","DONE",project1);
        Task task1 = new Task("Build UI for Search", "TSearch is important","DOING",project1);
        Task task2 = new Task("Create wireframe", "Use figma software","DONE",project1);
        Task task3 = new Task("Market discovery", "Get sales on the job","TODO",project1);

        taskRepository.save(task);
        taskRepository.save(task1);
        taskRepository.save(task2);
        taskRepository.save(task3);

        System.out.println("Task sample data successfully saved");
        System.out.println(taskRepository.count());

    }
}
