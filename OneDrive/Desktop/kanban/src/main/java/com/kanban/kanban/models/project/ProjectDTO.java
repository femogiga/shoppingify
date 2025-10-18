package com.kanban.kanban.models.project;

import com.kanban.kanban.models.task.Status;
import com.kanban.kanban.models.task.Task;
import com.kanban.kanban.models.task.TaskDTO;

import java.util.List;
import java.util.Map;

//public record ProjectDTO(Long id, String title ,Status status, List<TaskDTO> tasks) {
//}

public record ProjectDTO(Long id, String title ,Status status, Map<String,List<TaskDTO>> tasksByStatus) {
}
