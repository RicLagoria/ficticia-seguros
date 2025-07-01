package com.ficticia.segurovida.controller;

import com.ficticia.segurovida.dto.PersonaRequestDTO;
import com.ficticia.segurovida.dto.PersonaResponseDTO;
import com.ficticia.segurovida.model.Persona;
import com.ficticia.segurovida.service.PersonaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/personas")
@CrossOrigin(origins = "http://localhost:3000")
public class PersonaController {

    private final PersonaService service;

    public PersonaController(PersonaService service) {
        this.service = service;
    }

    @GetMapping
    public List<PersonaResponseDTO> obtenerTodas() {
        return service.listarPersonas();
    }

    @PostMapping
    public ResponseEntity<PersonaResponseDTO> crear(@RequestBody PersonaRequestDTO dto) {
        return ResponseEntity.ok(service.crearPersona(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PersonaResponseDTO> actualizar(@PathVariable Long id, @RequestBody PersonaRequestDTO dto) {
        return ResponseEntity.ok(service.actualizarPersona(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminarPersona(id);
        return ResponseEntity.noContent().build();
    }
}
