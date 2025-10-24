package com.ankit.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ankit.model.Enrollment;
import com.ankit.model.User;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByStudentId(Long studentId);
    List<Enrollment> findByCourseId(Long courseId);
    @Query("SELECT e.student FROM Enrollment e WHERE e.course.id = :courseId")
    List<User> findStudentsByCourseId(@Param("courseId") Long courseId);

}
