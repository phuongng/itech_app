import React from "react";
import titleize from "titleize";
import { RiArrowRightSLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = (customerName) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="breadcrumb">
      <Link to="/dashboard" className="breadcrumb-link">
        <span style={{ color: "#26599F", fontWeight: "normal" }}>Home</span>
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const decodedName = index > 0 ? decodeURIComponent(name) : name; // Decode only if not the first segment
        const isActive = index === pathnames.length - 1;

        return (
          <React.Fragment key={index}>
            <RiArrowRightSLine />
            <Link to={routeTo} className={`breadcrumb-link ${isActive ? "active" : ""}`}>
              <span className={name === "" ? "home-segment" : ""}>
                {name === "" ? (
                  <span style={{ color: "#26599F", fontWeight: "normal" }}>Home</span>
                ) : (
                  titleize(decodedName.split('_').join(' ')) // Split by underscore and join with space
                )}
              </span>
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
