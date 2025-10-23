package com.kanban.kanban.models.project;

import com.kanban.kanban.models.projectcolumn.ProjectColumnDTO;
import com.kanban.kanban.models.task.Status;

import java.util.List;


public record ProjectDTO(Long id, String title , Status status, List<ProjectColumnDTO> projectColumn) {
}
