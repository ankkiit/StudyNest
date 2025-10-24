package com.ankit.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Course {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String title;

	@Column(length = 1000)
	private String description;

	private String category;

	@ManyToOne
	@JoinColumn(name = "teacher_id")
	private User teacher; // course created by teacher
}
