export class PasswordResetModel {
    userId: number;
    password: string;
    confirmPassword: string;
    newPassword: string;
    token: string;
    temporaryPassword: string;
}