package com.kanban.kanban.models.subtask;

import com.kanban.kanban.models.task.Status;
import com.kanban.kanban.models.task.Task;
import com.kanban.kanban.models.user.User;
import com.kanban.kanban.models.user.UserDTO;

import java.util.List;

public record SubTaskDTO(
        Long id,
        String title,
        String description,
        Status status,
        Long task_id,
        List<UserDTO> subTaskMembers
) {}
