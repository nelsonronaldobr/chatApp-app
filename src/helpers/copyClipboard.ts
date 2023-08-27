export const copyClipboard = async (messageContent: string) => {
    try {
        // Copiar el contenido al portapapeles
        await navigator.clipboard.writeText(messageContent);
    } catch (error) {
        console.error('Error al copiar al portapapeles:', error);
    }
};
