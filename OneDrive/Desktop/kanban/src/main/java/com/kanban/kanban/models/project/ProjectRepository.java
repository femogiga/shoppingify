package com.kanban.kanban.models.project;

import com.kanban.kanban.models.task.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProjectRepository extends JpaRepository<Project,Long> {
    @Query("SELECT p FROM Project p LEFT JOIN FETCH p.tasks")
    List<Project> getProjectWithTask();
}