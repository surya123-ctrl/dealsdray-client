import React from "react";
import "./PageNotFound.scss"; // Import your SCSS file

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <div className="number">404</div>
      <div className="text">
        <span>Ooops...</span>
        <br />
        Page not found
      </div>
    </div>
  );
};

export default PageNotFound;
