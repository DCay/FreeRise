import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RegisterModel } from "../models/register.model";
import { LoginModel } from "../models/login.model";


//Ivo DatabaseURL - http://192.168.14.13:8000
//My DatabaseUrl - http://localhost:8000
const DATABASE_URL = 'http://localhost:8000';

const registerClientUrl = `${DATABASE_URL}/api/users/client/register`;
const registerFreelancerUrl = `${DATABASE_URL}/api/users/freelancer/register`
const loginUrl = `${DATABASE_URL}/api/users/login`;
const logoutUrl = `${DATABASE_URL}/api/users/logout`;


@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private currentAuthtoken: string;
    private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    constructor(private http: HttpClient) {

    }

    login(model: LoginModel) {
        return this.http.post(loginUrl,
            JSON.stringify(model));
    }

    registerClient(model: RegisterModel) {

        return this.http.post(registerClientUrl,
            JSON.stringify(model));
    }

    registerFreelancer(model) {
        return this.http.post(registerFreelancerUrl,
            JSON.stringify(model));
    }

    logout() {
        return this.http.post(logoutUrl,
            {});
    }

    checkIfLogged() {
        if (localStorage.getItem('authToken')) return true;
        return false
    }

    get authToken() {
        return this.currentAuthtoken;
    }

    set authToken(value: string) {
        this.currentAuthtoken = value;
    }

}
