// authService.ts

export const registerUser = async (userData: { email: string; password: string; }): Promise<void> => {
    // Registration logic here
    console.log('User registered:', userData);
};

export const loginUser = async (credentials: { email: string; password: string; }): Promise<string> => {
    // Login logic here
    console.log('User logged in:', credentials);
    return 'token'; // return a token or user data
};
