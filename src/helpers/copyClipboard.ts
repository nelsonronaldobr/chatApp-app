export const copyClipboard = async (messageContent: string) => {
    try {
        // Copiar el contenido al portapapeles
        await navigator.clipboard.writeText(messageContent);

        // Mostrar una retroalimentación (opcional)
        alert('Mensaje copiado al portapapeles');
    } catch (error) {
        console.error('Error al copiar al portapapeles:', error);
        // Mostrar una retroalimentación en caso de error (opcional)
        alert('Error al copiar al portapapeles');
    }
};
