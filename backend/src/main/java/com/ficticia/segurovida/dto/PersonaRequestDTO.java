package com.ficticia.segurovida.dto;

import lombok.Data;

import java.util.List;

@Data
public class PersonaRequestDTO {
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
