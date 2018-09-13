import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RegisterModel } from "../models/register.model";
import { LoginModel } from "../models/login.model";


const registerClientUrl = `http://192.168.14.13:8000/api/users/client/register`;
const registerFreelancerUrl = `http://192.168.14.13:8000/api/users/freelancer/register`
const loginUrl = `http://192.168.14.13:8000/api/users/login`;
const logoutUrl = `http://192.168.14.13:8000/api/users/logout`;


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
            JSON.stringify(model), this.options);
    }

    registerClient(model: RegisterModel) {
        return this.http.post(registerClientUrl,
            JSON.stringify(model), this.options);
    }

    registerFreelancer(model) {
        return this.http.post(registerFreelancerUrl,
            JSON.stringify(model), this.options);
    }

    logout() {
        return this.http.post(logoutUrl, this.options)
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
