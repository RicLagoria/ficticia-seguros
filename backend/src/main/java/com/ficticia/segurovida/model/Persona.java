package com.ficticia.segurovida.model;

import jakarta.persistence.*;
import lombok.*;

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

    @Column(name = "otra_enfermedad")
    private String otraEnfermedad;
}
