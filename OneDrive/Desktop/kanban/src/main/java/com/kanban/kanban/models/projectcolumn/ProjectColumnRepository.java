package com.kanban.kanban.models.projectcolumn;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface ProjectColumnRepository extends JpaRepository<ProjectColumn, Long> {

//    @Query(value = "SELECT * FROM project_column pc WHERE pc.name = :name AND pc.project_id = :projectId", nativeQuery = true)
//    ProjectColumn findByNameAndProjectId(@Param("name") String name, @Param("projectId") Long projectId);
}
