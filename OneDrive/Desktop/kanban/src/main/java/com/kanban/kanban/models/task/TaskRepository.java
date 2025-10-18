package com.kanban.kanban.models.task;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {
    boolean existsByTitle(String title);

   @Query("SELECT t FROM Task t LEFT JOIN FETCH t.taskMembers ")
   List<Task> getTaskWithUser();

    @EntityGraph(attributePaths = {"taskMembers"})
       List<Task> findAll();

}
