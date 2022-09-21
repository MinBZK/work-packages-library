import React, { } from "react";
import { Link } from "react-router-dom";

export default function HomeUser() {

  return (
    <>
      <div className="d-flex justify-content-center align-items-start">
        <Link className="btn btn-primary" to="/new-qr" >
          QR-code genereren
      </Link>
      </div>
    </>
  );
}
