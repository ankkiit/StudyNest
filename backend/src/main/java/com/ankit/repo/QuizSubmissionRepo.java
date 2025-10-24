package com.ankit.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ankit.model.QuizSubmission;

public interface QuizSubmissionRepo extends JpaRepository<QuizSubmission, Long> {
	List<QuizSubmission> findByStudentId(Long studentId);
	@Query("SELECT s FROM QuizSubmission s WHERE s.student.id = :studentId AND s.quiz.course.id = :courseId")
    List<QuizSubmission> findByStudentIdAndQuizCourseId(@Param("studentId") Long studentId,
                                                        @Param("courseId") Long courseId);
}
