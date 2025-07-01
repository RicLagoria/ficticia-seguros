-- PERSONAS
INSERT INTO persona (nombre_completo, identificacion, edad, genero, estado, maneja, usa_lentes, diabetico)
VALUES
    ('Diego Maradona', 'D10S001', 60, 'Masculino', true, true, false, true),
    ('Franco Colapinto', 'FCO2025', 21, 'Masculino', true, true, false, false),
    ('Mercedes Sosa', 'MESA1945', 72, 'Femenino', false, false, true, false),
    ('Carlos Tévez', 'CTEV1975', 40, 'Masculino', true, true, false, false),
    ('Rodolfo Walsh', 'RWAL1970', 50, 'Masculino', false, false, false, false),
    ('Juana Molina', 'JMOL1980', 44, 'Femenino', true, false, true, false),
    ('Ricardo Darín', 'RDAR1960', 66, 'Masculino', true, true, false, false),
    ('Gabriela Sabatini', 'GSAB1970', 52, 'Femenino', true, true, false, false),
    ('Fito Páez', 'FPAE1963', 61, 'Masculino', true, false, true, false),
    ('Lali Espósito', 'LESP1991', 33, 'Femenino', true, true, false, false);

-- ENFERMEDADES
INSERT INTO enfermedades (nombre, persona_id)
VALUES
    ('Diabetes tipo 1', 1),
    ('Hipertensión', 1),
    ('Miopía', 3),
    ('Asma', 3),
    ('Colesterol alto', 4),
    ('Celiaquía', 6),
    ('Hipotiroidismo', 6),
    ('Alergia estacional', 7),
    ('Hipermetropía', 8),
    ('Lumbalgia', 9),
    ('Fatiga crónica', 10),
    ('Sinusitis', 10);
