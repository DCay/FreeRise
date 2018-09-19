export class DeleteProfileModel {
    constructor(
        public password: string,
        public confirmPassword: string,
    ) { }
}