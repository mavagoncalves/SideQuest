import React from 'react'

const ProtectedRoute = ({ children }) => {
    // just need to replace this "true" with real logic, right now is just dummy variable
    const isAuthenticated = true; 

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute