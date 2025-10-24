package com.ankit.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ankit.model.Course;
import com.ankit.model.User;
import com.ankit.repo.CourseRepository;
import com.ankit.repo.EnrollmentRepository;
import com.ankit.repo.LessonCompletionRepository;
import com.ankit.repo.LessonRepository;
import com.ankit.repo.QuizRepository;
import com.ankit.repo.QuizSubmissionRepo;

@RestController
@RequestMapping("/courses")
public class CourseController {

	@Autowired
	private CourseRepository courseRepo;

	 @Autowired
	    private LessonCompletionRepository lessonCompletionRepo;
	 @Autowired
	    private LessonRepository lessonRepo;
	 @Autowired
	    private QuizRepository quizRepo;
	 @Autowired
		private QuizSubmissionRepo submissionRepo;
	 @Autowired
	    private EnrollmentRepository enrollmentRepo;
	 
	 
	// Create new course (only TEACHER)
	@PostMapping("/create")
	public Course createCourse(@RequestBody Course course, @AuthenticationPrincipal User teacher) {
		course.setTeacher(teacher);
		return courseRepo.save(course);
	}

	// Get all courses
	@GetMapping
	public List<Course> getAllCourses() {
		System.out.println("Fetching all courses");
		return courseRepo.findAll();
	}

	// Get courses created by specific teacher
	@GetMapping("/teacher/{id}")
	public List<Course> getCoursesByTeacher(@PathVariable Long id) {
		return courseRepo.findByTeacherId(id);
	}
	
	@GetMapping("/{courseId}/completion")
	public Map<String, Object> getCourseCompletion(@PathVariable Long courseId, @AuthenticationPrincipal User user) {
	    int totalLessons = lessonRepo.countByCourseId(courseId);
	    int completedLessons = lessonCompletionRepo.findByStudentIdAndLessonCourseId(user.getId(), courseId).size();

	    int totalQuizzes = quizRepo.countByCourseId(courseId);
	    int completedQuizzes = submissionRepo.findByStudentIdAndQuizCourseId(user.getId(), courseId).size();

	    int totalItems = totalLessons + totalQuizzes;
	    int completedItems = completedLessons + completedQuizzes;

	    int percentage = totalItems == 0 ? 0 : (completedItems * 100 / totalItems);

	    Map<String, Object> response = new HashMap<>();
	    response.put("totalLessons", totalLessons);
	    response.put("completedLessons", completedLessons);
	    response.put("totalQuizzes", totalQuizzes);
	    response.put("completedQuizzes", completedQuizzes);
	    response.put("progressPercentage", percentage);

	    return response;
	}
	
	@GetMapping("/{courseId}/students/progress")
	public List<Map<String, Object>> getStudentProgress(@PathVariable Long courseId) {
	    List<User> students = enrollmentRepo.findStudentsByCourseId(courseId);
	    List<Map<String, Object>> response = new ArrayList<>();

	    for (User student : students) {
	        int totalLessons = lessonRepo.countByCourseId(courseId);
	        int completedLessons = lessonCompletionRepo.findByStudentIdAndLessonCourseId(student.getId(), courseId).size();

	        int totalQuizzes = quizRepo.countByCourseId(courseId);
	        int completedQuizzes = submissionRepo.findByStudentIdAndQuizCourseId(student.getId(), courseId).size();

	        int totalItems = totalLessons + totalQuizzes;
	        int completedItems = completedLessons + completedQuizzes;
	        int percentage = totalItems == 0 ? 0 : (completedItems * 100 / totalItems);

	        Map<String, Object> studentData = new HashMap<>();
	        studentData.put("id", student.getId());
	        studentData.put("name", student.getUsername());
	        studentData.put("email", student.getEmail());
	        studentData.put("progress", percentage);
	        response.add(studentData);
	    }

	    return response;
	}


}
