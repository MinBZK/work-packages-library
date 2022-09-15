import React from "react";
import { Link } from "react-router-dom";


export default function NotFound() {
    return <div>
        <Link to="/">Home</Link>
        <h1>404 - Page not found</h1>
    </div>;
}
