import React, { createContext, useContext, useState } from "react";

const EnrollmentContext = createContext({});

export const EnrollmentProvider = (props: any) => {
    const [enrolls, setEnrolls] = useState()
    return (
        <EnrollmentContext.Provider value={{enrolls}}>
            {props.children}
        </EnrollmentContext.Provider>
    )
}

export const useEnrollmentContext = () => {
    return useContext(EnrollmentContext);
}


