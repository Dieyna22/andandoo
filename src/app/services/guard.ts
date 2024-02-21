import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const AdminGuard = () => {
    const router = inject(Router);
    const auth = JSON.parse(localStorage.getItem("isAdmin") || "");

    if (!auth) {
        router.navigateByUrl('/accueil')
        return false;
    }

    return true;
}

export const UsersGuard = () => {
    const router = inject(Router);
    const auth = JSON.parse(localStorage.getItem("isUsers") || "");
    if (!auth) {
        router.navigateByUrl('/accueil')
        return false;
    }

    return true;
}

export const ChauffeurGuard = () => {
    const router = inject(Router);
    const auth = JSON.parse(localStorage.getItem("isChauffeur") || "");
    if (!auth) {
        router.navigateByUrl('/accueil')
        return false;
    }

    return true;
}