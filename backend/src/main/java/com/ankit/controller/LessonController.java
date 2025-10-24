package com.ankit.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ankit.model.Course;
import com.ankit.model.Lesson;
import com.ankit.model.LessonCompletion;
import com.ankit.model.User;
import com.ankit.repo.CourseRepository;
import com.ankit.repo.LessonCompletionRepository;
import com.ankit.repo.LessonRepository;

@RestController
@RequestMapping("/lessons")
public class LessonController {

    @Autowired
    private LessonRepository lessonRepo;

    @Autowired
    private CourseRepository courseRepo;
    @Autowired
    private LessonCompletionRepository lessonCompletionRepository;

    // Add lesson (only TEACHER)
    @PostMapping("/add/{courseId}")
    public Lesson addLesson(@PathVariable Long courseId, @RequestBody Lesson lesson) {
        Course course = courseRepo.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        lesson.setCourse(course);
        return lessonRepo.save(lesson);
    }

    // Get all lessons for a course
    @GetMapping("/course/{courseId}")
    public List<Lesson> getLessonsByCourse(@PathVariable Long courseId) {
        return lessonRepo.findByCourseId(courseId);
    }
    
    @PostMapping("/{lessonId}/complete")
    public String completeLesson(@PathVariable Long lessonId, @AuthenticationPrincipal User user) {
        Lesson lesson = lessonRepo.findById(lessonId).orElseThrow();
        LessonCompletion lc = new LessonCompletion();
        lc.setLesson(lesson);
        lc.setStudent(user);
        lc.setCompletedAt(LocalDateTime.now());
        lessonCompletionRepository.save(lc);
        return "Lesson marked as completed!";
    }

    
}
