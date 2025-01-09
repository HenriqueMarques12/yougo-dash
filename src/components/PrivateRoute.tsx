import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { APP_ROUTES } from "@/app/constants/app-routes";
import { checkUserAuthenticated } from "@/app/functions/check-user-authenticated";


type PrivateRouteProps = {
    children: ReactNode
}

const PrivateRoute = ({children}: PrivateRouteProps) => {
    const { push } = useRouter()
    const isUserAuthenticated = checkUserAuthenticated()

    useEffect(()=> {
        if(!isUserAuthenticated) {
            push(APP_ROUTES.public.login)
        }
    }, [isUserAuthenticated, push])
    return (
        <>
            {!isUserAuthenticated && null}
            {isUserAuthenticated && children}
        </>
    )
}

export default PrivateRoute