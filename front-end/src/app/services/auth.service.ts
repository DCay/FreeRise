import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { RegisterModel } from "../models/register.model";
import { LoginModel } from "../models/login.model";




const registerClientUrl = `http://192.168.14.13:8000/api/users/client/register`;
const registerFreelancerUrl = `http://192.168.14.13:8000/api/users/freelancer/register`
const loginUrl = `http://192.168.14.13:8000/api/users/login`;
// const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;


@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private currentAuthtoken: string;

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

    registerFreelancer(model){
        return this.http.post(registerFreelancerUrl,
            JSON.stringify(model), this.options)
    }
    
    private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    // logout() {
    //     return this.http.post(logoutUrl,
    //         {});
    // }

    checkIfLogged() {
        return this.currentAuthtoken === localStorage.getItem('authtoken');
    }

    get authToken() {
        return this.currentAuthtoken;
    }

    set authToken(value: string) {
        this.currentAuthtoken = value;
    }

}