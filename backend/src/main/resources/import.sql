INSERT INTO persona (nombre_completo, identificacion, edad, genero, estado, maneja, usa_lentes, diabetico) VALUES
                                                                                                               ('Diego Maradona', 'D10S001', 60, 'Masculino', true, true, false, true),
                                                                                                               ('Franco Colapinto', 'FCO2025', 21, 'Masculino', true, true, false, false),
                                                                                                               ('Mercedes Sosa', 'MESA1945', 72, 'Femenino', false, false, true, false);

INSERT INTO enfermedades (nombre, persona_id) VALUES
                                                  ('Diabetes tipo 1', 1),
                                                  ('Hipertensión', 1),
                                                  ('Miopía', 3),
                                                  ('Asma', 3),
                                                  ('Colapso emocional post GP', 2);
