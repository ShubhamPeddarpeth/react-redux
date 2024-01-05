import React, { useState, useEffect } from 'react';

const ErrorBoundary = ({ children }) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const errorHandler = (error, errorInfo) => {
            // Log the error to an error reporting service
            console.error(error, errorInfo);
            setHasError(true);
        };

        // Listen for unhandled errors during rendering
        const unhandledErrorListener = window.addEventListener('error', errorHandler);

        // Listen for unhandled promise rejections
        const unhandledRejectionListener = window.addEventListener('unhandledrejection', errorHandler);

        return () => {
            // Clean up event listeners
            window.removeEventListener('error', errorHandler);
            window.removeEventListener('unhandledrejection', errorHandler);
        };
    }, []);

    if (hasError) {
        // You can render a fallback UI here
        return <h1>Something went wrong.</h1>;
    }

    return children;
};

export default ErrorBoundary;
