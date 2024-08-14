import { useRouter } from "next/router";
import { Children, ReactNode, useEffect } from "react";
import { APP_ROUTES } from "@/shared/constants/app-routes";
import { checkUserAuthenticated } from 'functions';

type PrivateRouteProps = {
    children: ReactNode;
};

const PrivateRoute = ({ Children }: PrivateRouteProps)=>{
    const { push } = useRouter();

    const isUserAuthenticated = checkUserAuthenticated();

    useEffect(()=> {
        if (!isUserAuthenticated){
            push(APP_ROUTES.public.login);
        }
    },[isUserAuthenticated, push]);
    
    return (
        <>
        {!isUserAuthenticated && null}
        {isUserAuthenticated && Children}
        </>
    );
};

export default PrivateRoute;
