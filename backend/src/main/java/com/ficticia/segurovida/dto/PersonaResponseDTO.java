package com.ficticia.segurovida.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PersonaResponseDTO {
    private Long id;
    private String nombreCompleto;
    private String identificacion;
    private Integer edad;
    private String genero;
    private Boolean estado;
    private Boolean maneja;
    private Boolean usaLentes;
    private Boolean diabetico;
    private List<EnfermedadDTO> enfermedades;
}
