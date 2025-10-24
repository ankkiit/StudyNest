package com.ankit.controller;

import com.ankit.model.Question;
import com.ankit.model.Quiz;
import com.ankit.repo.QuestionRepository;
import com.ankit.repo.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionController {

	@Autowired
	private QuestionRepository questionRepo;

	@Autowired
	private QuizRepository quizRepo;

	// Add question to quiz (Teacher)
	@PostMapping("/add/{quizId}")
	public Question addQuestion(@PathVariable Long quizId, @RequestBody Question question) {
		Quiz quiz = quizRepo.findById(quizId).orElseThrow(() -> new RuntimeException("Quiz not found"));
		question.setQuiz(quiz);
		return questionRepo.save(question);
	}

	// Get all questions for a quiz (Student)
	@GetMapping("/quiz/{quizId}")
	public List<Question> getQuestionsByQuiz(@PathVariable Long quizId) {
		return questionRepo.findByQuizId(quizId);
	}
}
