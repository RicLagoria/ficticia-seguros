package com.ficticia.segurovida.service;

import com.ficticia.segurovida.dto.PersonaRequestDTO;
import com.ficticia.segurovida.dto.PersonaResponseDTO;
import com.ficticia.segurovida.model.Persona;
import com.ficticia.segurovida.repository.PersonaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonaService {

    private final PersonaRepository repository;

    public PersonaService(PersonaRepository repository) {
        this.repository = repository;
    }

    public PersonaResponseDTO crearPersona(PersonaRequestDTO dto) {
        Persona persona = toEntity(dto);
        validarDatos(persona);
        return toDTO(repository.save(persona));
    }

    public PersonaResponseDTO actualizarPersona(Long id, PersonaRequestDTO dto) {
        Persona existente = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Persona no encontrada"));

        existente.setNombreCompleto(dto.getNombreCompleto());
        existente.setEdad(dto.getEdad());
        existente.setGenero(dto.getGenero());
        existente.setEstado(dto.getEstado());
        existente.setManeja(dto.getManeja());
        existente.setUsaLentes(dto.getUsaLentes());
        existente.setDiabetico(dto.getDiabetico());
        existente.setOtraEnfermedad(dto.getOtraEnfermedad());

        return toDTO(repository.save(existente));
    }

    public void eliminarPersona(Long id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("No se encontró ninguna persona con ID: " + id);
        }
        repository.deleteById(id);
    }


    public List<PersonaResponseDTO> listarPersonas() {
        return repository.findAll().stream()
                .map(this::toDTO)
                .toList();
    }


    private void validarDatos(Persona persona) {
        if (persona.getNombreCompleto() == null || persona.getNombreCompleto().isBlank()) {
            throw new IllegalArgumentException("El nombre completo es obligatorio.");
        }

        if (persona.getEdad() == null || persona.getEdad() < 0 || persona.getEdad() > 120) {
            throw new IllegalArgumentException("La edad debe estar entre 0 y 120.");
        }

        if (persona.getGenero() == null || persona.getGenero().isBlank()) {
            throw new IllegalArgumentException("El género es obligatorio.");
        }

        if (persona.getIdentificacion() == null || persona.getIdentificacion().isBlank()) {
            throw new IllegalArgumentException("La identificación es obligatoria.");
        }

        if (persona.getEstado() == null) {
            throw new IllegalArgumentException("El estado (activo/inactivo) es obligatorio.");
        }
    }

    private Persona toEntity(PersonaRequestDTO dto) {
        return Persona.builder()
                .nombreCompleto(dto.getNombreCompleto())
                .identificacion(dto.getIdentificacion())
                .edad(dto.getEdad())
                .genero(dto.getGenero())
                .estado(dto.getEstado())
                .maneja(dto.getManeja())
                .usaLentes(dto.getUsaLentes())
                .diabetico(dto.getDiabetico())
                .otraEnfermedad(dto.getOtraEnfermedad())
                .build();
    }

    private PersonaResponseDTO toDTO(Persona entity) {
        return PersonaResponseDTO.builder()
                .id(entity.getId())
                .nombreCompleto(entity.getNombreCompleto())
                .identificacion(entity.getIdentificacion())
                .edad(entity.getEdad())
                .genero(entity.getGenero())
                .estado(entity.getEstado())
                .maneja(entity.getManeja())
                .usaLentes(entity.getUsaLentes())
                .diabetico(entity.getDiabetico())
                .otraEnfermedad(entity.getOtraEnfermedad())
                .build();
    }
}