import { protectedRoutes } from "../../constants/protectedRoutes.constant";

export const isProtectedRoutes = (path: string) => {
    return protectedRoutes.some((route) => route.startsWith(path));
} 