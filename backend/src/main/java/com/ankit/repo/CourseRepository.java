package com.ankit.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ankit.model.Course;
import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByTeacherId(Long teacherId);
}
