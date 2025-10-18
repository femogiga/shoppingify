package com.kanban.kanban.models.subtask;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubTaskRepository extends CrudRepository<SubTask,Long> {
    boolean existsByTitle(String title);
}
