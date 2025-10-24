package com.ankit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ankit.dto.QuizDTO;
import com.ankit.model.Course;
import com.ankit.model.Quiz;
import com.ankit.repo.CourseRepository;
import com.ankit.repo.QuizRepository;

@RestController
@RequestMapping("/quiz")
public class QuizController {

    @Autowired
    private QuizRepository quizRepo;

    @Autowired
    private CourseRepository courseRepo;

    // Only teacher can create quiz for a course
    @PostMapping("/create/{courseId}")
    public Quiz createQuiz(@PathVariable Long courseId, @RequestBody Quiz quiz) {
        Course course = courseRepo.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        quiz.setCourse(course);
        return quizRepo.save(quiz);
    }

//    // Get quizzes for a course
//    @GetMapping("/course/{courseId}")
//    public List<Quiz> getQuizzesByCourse(@PathVariable Long courseId) {
//        return quizRepo.findByCourseId(courseId);
//    }
    @GetMapping("/course/{courseId}")
    public List<QuizDTO> getQuizzesByCourse(@PathVariable Long courseId) {
        return quizRepo.findByCourseId(courseId)
                       .stream()
                       .map(q -> new QuizDTO(q.getId(), q.getTitle()))
                       .toList();
    }
}
