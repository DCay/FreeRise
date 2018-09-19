export class ChangePasswordModel {
    constructor(
        public oldPassword: string,
        public newPassword: string,
        public confirmNewPassword: string,
    ) { }
}