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

import com.ankit.dto.QuizSubmissionRequest;
import com.ankit.dto.QuizSubmissionResponse;
import com.ankit.model.Question;
import com.ankit.model.Quiz;
import com.ankit.model.QuizSubmission;
import com.ankit.model.User;
import com.ankit.repo.QuestionRepository;
import com.ankit.repo.QuizRepository;
import com.ankit.repo.QuizSubmissionRepo;

@RestController
@RequestMapping("/quiz/submission")
public class QuizSubmissionController {

	@Autowired
	private QuizRepository quizRepo;

	@Autowired
	private QuestionRepository questionRepo;

	@Autowired
	private QuizSubmissionRepo submissionRepo;

	// Submit quiz answers
	@PostMapping("/{quizId}")
	public String submitQuiz(@PathVariable Long quizId, @RequestBody QuizSubmissionRequest submissionRequest,
			@AuthenticationPrincipal User student) {

		Quiz quiz = quizRepo.findById(quizId).orElseThrow(() -> new RuntimeException("Quiz not found"));

		int score = 0;
		List<Question> questions = questionRepo.findByQuizId(quizId);

		for (Question q : questions) {
			String submittedAnswer = submissionRequest.getAnswers().get(q.getId());
			if (submittedAnswer != null && submittedAnswer.equalsIgnoreCase(q.getCorrectAnswer())) {
				score++;
			}
		}

		QuizSubmission submission = QuizSubmission.builder().quiz(quiz).student(student).score(score)
				.totalQuestions(questions.size()).submittedAt(LocalDateTime.now()).build();

		submissionRepo.save(submission);

		return "You scored " + score + "/" + questions.size();
	}

	// View all submissions for current student
	@GetMapping("/my")
	public List<QuizSubmissionResponse> getMySubmissions(@AuthenticationPrincipal User student) {
	    List<QuizSubmission> submissions = submissionRepo.findByStudentId(student.getId());

	    return submissions.stream().map(sub -> QuizSubmissionResponse.builder()
	            .quizId(sub.getQuiz().getId())
	            .quizTitle(sub.getQuiz().getTitle())
	            .courseTitle(sub.getQuiz().getCourse().getTitle())
	            .score(sub.getScore())
	            .totalQuestions(sub.getTotalQuestions())
	            .submittedAt(sub.getSubmittedAt())
	            .build()
	    ).toList();
	}
}
