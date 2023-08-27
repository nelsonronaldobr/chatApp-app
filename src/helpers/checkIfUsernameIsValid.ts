import { chatApi } from '@/api';

export const checkIfUsernameIsValid = async (
    username: string
): Promise<boolean> => {
    try {
        await chatApi.post('/profile/user', { username });
        return true;
    } catch (error) {
        console.error('Error al verificar el correo electrónico:', error);
        return false;
    }
};
