package com.ankit.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ankit.model.LessonCompletion;

public interface LessonCompletionRepository extends JpaRepository<LessonCompletion, Long> {
    List<LessonCompletion> findByStudentIdAndLessonCourseId(Long studentId, Long courseId);
}

