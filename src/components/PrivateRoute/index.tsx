import React from 'react';
import { AuthProps } from "../../redux/lib/auth.type";

interface Props extends AuthProps {
    altComponent: React.ReactNode;
}
const PrivateRoute: React.FC<Props> = (props) => {
    return (<>{ props.authenticated ? props.children  : props.altComponent}</>);
}

export default PrivateRoute