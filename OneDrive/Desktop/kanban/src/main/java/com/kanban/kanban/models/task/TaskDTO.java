package com.kanban.kanban.models.task;

import com.kanban.kanban.models.subtask.SubTask;
import com.kanban.kanban.models.subtask.SubTaskDTO;
import com.kanban.kanban.models.user.User;
import com.kanban.kanban.models.user.UserDTO;

import java.util.ArrayList;
import java.util.List;

public record TaskDTO(Long id , String title, String description, Status status, List<UserDTO> taskMembers , List<SubTaskDTO> subTasks ) {

}
