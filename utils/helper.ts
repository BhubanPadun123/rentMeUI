export const validateUserName = (userName: string): boolean => {
    return userName.trim().length >= 6
}

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
};

export const validateContactNumber = (contactNumber: string): boolean => {
    const contactRegex = /^\d{10}$/;
    return contactRegex.test(contactNumber.trim());
};
export const validatePassword = (password: string): string | null => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!strongPasswordRegex.test(password.trim())) {
        return "Password must be at least 6 characters long and include uppercase, lowercase, number, and special character.";
    }
    return null;
};
export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
    if (password !== confirmPassword) {
        return "Passwords do not match.";
    }
    return null;
};
export function formatDateTime(input: string) {
    const date = new Date(input);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return {
        date: `${day}-${month}-${year}`,
        time: `${hours}:${minutes}:${seconds}`
    };
}
