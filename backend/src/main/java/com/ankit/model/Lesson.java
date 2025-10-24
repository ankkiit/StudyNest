package com.ankit.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String videoUrl; // or PDF, doc — optional

    @Column(length = 2000)
    private String content; // lesson text

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;
}
