package com.ficticia.segurovida.exception;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.*;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.*;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<?> manejarNotFound(EntityNotFoundException ex, HttpServletRequest req) {
        log.warn("Recurso no encontrado: {}", ex.getMessage());
        return buildError(HttpStatus.NOT_FOUND, "Recurso no encontrado", ex.getMessage(), req);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> manejarBadRequest(IllegalArgumentException ex, HttpServletRequest req) {
        log.warn("Datos inválidos: {}", ex.getMessage());
        return buildError(HttpStatus.BAD_REQUEST, "Datos inválidos", ex.getMessage(), req);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> manejarValidacion(MethodArgumentNotValidException ex, HttpServletRequest req) {
        String detalles = ex.getBindingResult().getFieldErrors().stream()
                .map(e -> e.getField() + ": " + e.getDefaultMessage())
                .collect(Collectors.joining("; "));
        log.warn("Error de validación: {}", detalles);
        return buildError(HttpStatus.BAD_REQUEST, "Error de validación", detalles, req);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<?> manejarIntegridad(DataIntegrityViolationException ex, HttpServletRequest req) {
        String detalle = Optional.ofNullable(ex.getRootCause())
                .map(Throwable::getMessage)
                .orElse(ex.getMessage());
        log.error("Violación de integridad de datos: {}", detalle);
        return buildError(HttpStatus.CONFLICT, "Violación de integridad de datos", detalle, req);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<?> manejarParseo(HttpMessageNotReadableException ex, HttpServletRequest req) {
        String detalle = "JSON mal formado: " + ex.getMostSpecificCause().getMessage();
        log.warn("JSON mal formado: {}", detalle);
        return buildError(HttpStatus.BAD_REQUEST, "JSON mal formado", detalle, req);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> manejarErrorGeneral(Exception ex, HttpServletRequest req) {
        log.error("Error inesperado", ex);
        return buildError(HttpStatus.INTERNAL_SERVER_ERROR, "Error interno del servidor", ex.getMessage(), req);
    }

    private ResponseEntity<Map<String, Object>> buildError(
            HttpStatus status, String titulo, String detalle, HttpServletRequest req) {

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", status.value());
        body.put("error", titulo);
        body.put("message", detalle);
        body.put("path", req.getRequestURI());

        return new ResponseEntity<>(body, status);
    }
}
