export type AuthCredentials = {
    email: string;
    password: string;
};

export type ResetPasswordParams = {
    password: string;
    verificationCode: string;
}