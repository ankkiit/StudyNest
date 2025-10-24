package com.ankit.repo;

import com.ankit.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LessonRepository extends JpaRepository<Lesson, Long> {
    List<Lesson> findByCourseId(Long courseId);
    // Count total lessons in a course
    int countByCourseId(Long courseId);
}
