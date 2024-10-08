import { ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { OAuth2Service } from "./oauth2.service";
import {UserService} from "../services/user/user.service";

/**
 * Require a user to be signed in to proceed
 * @returns
 */
export const signedInGuard: CanActivateFn = async () => {
    const authService = inject(OAuth2Service);
    const router = inject(Router);

    const isUserAuthenticated = await firstValueFrom(authService.validate_token());

    if (!isUserAuthenticated) {
        router.navigate(['/landing']);
        return false;
    }
    return true;
};

/**
 * Require a user to be signed out to proceed
 * @returns
 */
export const signedOutGuard: CanActivateFn = async () => {
    const authService = inject(OAuth2Service);
    const router = inject(Router);

    const isUserAuthenticated = await firstValueFrom(authService.validate_token());

    if (isUserAuthenticated) {
        router.navigate(['/dashboard']);
        return false;
    }

    return true;
};
