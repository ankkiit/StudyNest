package com.ankit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ankit.model.Course;
import com.ankit.model.Enrollment;
import com.ankit.model.User;
import com.ankit.repo.CourseRepository;
import com.ankit.repo.EnrollmentRepository;

@RestController
@RequestMapping("/enroll")
public class EnrollmentController {

    @Autowired
    private EnrollmentRepository enrollmentRepo;

    @Autowired
    private CourseRepository courseRepo;

    // Student enrolls in a course
    @PostMapping("/{courseId}")
    public String enroll(@PathVariable Long courseId, @AuthenticationPrincipal User student) {
        Course course = courseRepo.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Enrollment enrollment = Enrollment.builder()
                .course(course)
                .student(student)
                .build();

        enrollmentRepo.save(enrollment);
        return "Enrolled successfully!";
    }

    // Get all enrolled courses for student
    @GetMapping("/my")
    public List<Course> getMyCourses(@AuthenticationPrincipal User student) {
        return enrollmentRepo.findByStudentId(student.getId())
                .stream()
                .map(Enrollment::getCourse)
                .toList();
    }
    
 // Teacher fetches all students enrolled in a course
    @GetMapping("/course/{courseId}")
    public List<User> getEnrolledStudents(@PathVariable Long courseId) {
        List<Enrollment> enrollments = enrollmentRepo.findByCourseId(courseId);
        // extract student from each enrollment
        return enrollments.stream()
                .map(Enrollment::getStudent)
                .toList();
    }
}
