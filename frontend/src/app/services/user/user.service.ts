import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, take, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../models/user.interface';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	/**
	 * The server to hit
	 */
	private REST_API_SERVER = 'http://localhost:8000/';

	/**
	 *
	 */
	constructor(
		private httpClient: HttpClient,
		private router: Router,
	) {}

	/**
	 * Get the logged in user's information
	 */
	getCurrentUser() {
		return this.httpClient
			.get<any>(this.REST_API_SERVER + `user/me`, {})
			.pipe(
				take(1),
				map((res: any) => {
					return res;
				}),
				catchError((error: HttpErrorResponse) => {
					// Something went really wrong
					if (
						this.router.url != '/landing' &&
						this.router.url != '/signup' &&
						this.router.url != '/signin'
					) {
						this.router.navigate(['/error']);
					}
					return throwError(() => error);
				}),
			);
	}

	updateCurrentUser(new_user_data: User) {
		return this.httpClient
			.post<any>(this.REST_API_SERVER + `user/update_user`, new_user_data)
			.pipe(
				take(1),
				map((res: any) => {
					console.log(res);
					return res;
				}),
				catchError((error: HttpErrorResponse) => {
					// Something went really wrong
					return throwError(() => error);
				}),
			);
	}
}
