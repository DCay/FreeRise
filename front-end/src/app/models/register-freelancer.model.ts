export class RegisterFreelancerModel {
    constructor(
        public username: string,
        public password: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public skills: any[]
    ) { }
}