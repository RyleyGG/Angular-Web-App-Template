import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, catchError, map, of, take, throwError } from 'rxjs';

import { SignInInfo, SignUpInfo, SuccessfulUserAuth } from '../models/auth.interface';
import {LocalStorageService} from "../services/local-storage/local-storage.service";

/**
 * A service to handle OAuth2 authentication control flow.
 */
@Injectable({
    providedIn: 'root'
})
export class OAuth2Service {
    /**
     * The authentication server to hit
     */
    private REST_API_SERVER = "http://localhost:8000/";

    /**
     * Creates a new OAuth2Service
     *
     * @param { HttpClient } httpClient an injected HttpClient
     * @param { LocalStorageService } localStorageService an injected instance of the LocalStorageService
     */
    constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) { }

    /**
     * Sign up a new user to the backend.
     *
     * @param { SignUpInfo } signUpInfo the information to use to register a new user
     * @returns { Observable<any> } the resulting api response as an observable stream
     */
    public sign_up(signUpInfo: SignUpInfo): Observable<any> {
        return this.httpClient.post<any>(this.REST_API_SERVER + "auth/sign_up", signUpInfo).pipe(
            take(1),
            map((res: any) => {
                console.log(res);
                return res;
            }),
            catchError((error: HttpErrorResponse) => {
                // Something went really wrong
                this.localStorageService.delete('access_token');
                this.localStorageService.delete('refresh_token');
                return throwError(() => error);
            })
        );
    }

    /**
     * Sign in to the backend using OAuth2.
     *
     * @param { SignInInfo } signInInfo the information to use to sign in
     * @returns { Observable<SuccessfulUserAuth> } the resulting api response as an observable stream
     */
    public sign_in(signInInfo: SignInInfo): Observable<SuccessfulUserAuth> {
        this.localStorageService.delete('access_token');
        this.localStorageService.delete('refresh_token');

        let body = new FormData();
        body.append('username', signInInfo.username);
        body.append('password', signInInfo.password);

        return this.httpClient.post<SuccessfulUserAuth>(this.REST_API_SERVER + "auth/sign_in", body).pipe(
            take(1),
            map((res: SuccessfulUserAuth) => {
                this.localStorageService.set('access_token', res.access_token);
                this.localStorageService.set('refresh_token', res.refresh_token);
                return res;
            }),
            catchError((error: HttpErrorResponse) => {
                // Something went really wrong
                this.localStorageService.delete('access_token');
                this.localStorageService.delete('refresh_token');
                return throwError(() => error);
            })
        );
    }

    /**
     * Clear the tokens from storage, effectively signing out the user.
     */
    public sign_out(): void {
        this.localStorageService.delete('access_token');
        this.localStorageService.delete('refresh_token');
        // navigate the router to the login or main landing page??
    }

    /**
     * Refreshes the users access tokens.
     *
     * @returns { Observable<SuccessfulUserAuth> } the resulting api response as an observable stream
     */
    public refresh_token(): Observable<SuccessfulUserAuth> {
        // Ensure valid token before making request
        const token = this.localStorageService.get('refresh_token');
        if (token == null) {
            return throwError(() => new Error('Tried to refresh bad token!'));
        }

        const body = { refresh_token: token };
        return this.httpClient.post<SuccessfulUserAuth>(this.REST_API_SERVER + "auth/refresh", body).pipe(
            take(1),
            map((res: SuccessfulUserAuth) => {
                this.localStorageService.set('access_token', res.access_token);
                this.localStorageService.set('refresh_token', res.refresh_token);
                return res;
            }),
            catchError((error: HttpErrorResponse) => {
                // Token is invalid or user is unauthorized.
                this.localStorageService.delete('access_token');
                this.localStorageService.delete('refresh_token');
                return throwError(() => error);
            })
        );
    }

    /**
     * Validates and refreshes the users access tokens (used by route guards)
     *
     * @returns { boolean } true if tokens are valid, false if not.
     */
    public validate_token(): Observable<boolean> {
        const token = this.localStorageService.get('refresh_token');
        if (token == null) {
            return of(false);
        }

        return this.httpClient.post<boolean>(this.REST_API_SERVER + 'auth/validate', {}).pipe(
            take(1),
            map((res) => {
                return true;
            }),
            catchError((error: HttpErrorResponse) => {
                return of(false);
            })
        );
    }
}
