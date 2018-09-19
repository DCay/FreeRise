import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ChangeEmailModel } from "../models/change-email.model";
import { ChangePasswordModel } from "../models/change-password.model";
import { DeleteProfileModel } from "../models/delete-profile.model";

//Ivo DatabaseURL - http://192.168.14.13:8000
//My DatabaseUrl - http://localhost:8000
const DATABASE_URL = 'http://localhost:8000';

const changeEmailUrl = `${DATABASE_URL}/api/users/change/email`;
const changePasswordUrl = `${DATABASE_URL}/api/users/change/password`;
const deleteUserUrl = `${DATABASE_URL}/api/users/delete`;



@Injectable({
    providedIn: 'root'
})

export class ProfileService {
    private currentAuthtoken: string;
    
    constructor(private http: HttpClient) {

    }

    changeEmail(model: ChangeEmailModel) {
        return this.http.post(changeEmailUrl,
            JSON.stringify(model));
    }

    changePassword(model: ChangePasswordModel) {
        return this.http.post(changePasswordUrl,
            JSON.stringify(model));
    }

    deleteProfile(model: DeleteProfileModel) {
        return this.http.post(deleteUserUrl,
            JSON.stringify(model.password));
    }

}
