import { APP_ROUTES } from "@/app/constants/app-routes";

/**
 * @param asPath string
 * @returns boolean
 */

export const checkIsPublicRoute = (asPath: string) => {
    const appPublicRoute = Object.values(APP_ROUTES.public)

    return appPublicRoute.includes(asPath)
}