export class ChangeEmailModel {
    constructor(
        public password: string,
        public email: string,  
        public confirmEmail: string 
    ) { }
}