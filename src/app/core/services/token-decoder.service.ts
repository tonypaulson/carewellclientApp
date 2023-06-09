import { Injectable } from '@angular/core';
// var jwtDecode = require('jwt-decode');
import jwt_decode from "jwt-decode";

@Injectable()
export class TokenDecoderService {
    getTenantIdFromJWT() {
        var token = localStorage.getItem('jwt');
        if (token !== null && token !== undefined) {
            var decoded = jwt_decode(token);
            const tenantId = 1; //add below code later
            // JSON.parse(decoded.TenantId);
            return tenantId.toString();
        }

        return '0';
    }

    getUserId() {
        var token = localStorage.getItem('jwt');
        if (token !== null && token !== undefined) {
            var decoded = jwt_decode(token);
            const userId = 1; //add below code later 
            // JSON.parse(decoded.UserId);
            return userId.toString();
        }

        return '0';
    }
}