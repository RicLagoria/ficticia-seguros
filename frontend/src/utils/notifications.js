/**
 * Muestra un mensaje de error al usuario.
 */
export function showError(msg) {
    // Para producción, cambial esto por una notificación gráfica:
    alert(`Error: ${msg}`);
    console.error('Error mostrado al usuario:', msg);
}
