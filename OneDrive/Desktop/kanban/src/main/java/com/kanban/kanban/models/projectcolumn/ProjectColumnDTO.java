package com.kanban.kanban.models.projectcolumn;

import com.kanban.kanban.models.task.TaskDTO;

import java.util.List;

public record ProjectColumnDTO(Long id , Long project_id , String name, List<TaskDTO> tasks ) {
}
