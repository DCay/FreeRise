import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ChangeEmailModel } from "../models/change-email.model";

//Ivo DatabaseURL - http://192.168.14.13:8000
//My DatabaseUrl - http://localhost:8000
const DATABASE_URL = 'http://localhost:8000';

const changeEmailUrl = `${DATABASE_URL}/api/users/change/email`;


@Injectable({
    providedIn: 'root'
})

export class ProfileService {
    private currentAuthtoken: string;
    private options = { headers: new HttpHeaders().set('Authorization', 'Beader ' + localStorage.getItem('authToken')) };
    constructor(private http: HttpClient) {

    }

    changeEmail(model: ChangeEmailModel) {
        return this.http.post(changeEmailUrl,
            JSON.stringify(model));
    }

    changePassword() {

    }

    deleteProfile() {

    }

}
