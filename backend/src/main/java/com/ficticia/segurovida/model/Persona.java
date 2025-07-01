package com.ficticia.segurovida.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "persona")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Persona {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_completo", nullable = false)
    private String nombreCompleto;

    @Column(name = "identificacion", nullable = false, unique = true)
    private String identificacion;

    @Column(nullable = false)
    private Integer edad;

    @Column(nullable = false)
    private String genero;

    @Column(nullable = false)
    private Boolean estado;

    private Boolean maneja;
    private Boolean usaLentes;
    private Boolean diabetico;

    @OneToMany(mappedBy = "persona", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Enfermedad> enfermedades = new ArrayList<>();

}
