import React from "react";
import { useLocation } from "react-router-dom";
export const Image = ({ egImage, phImage }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isPrefrencePage = location.pathname === "/designs";
  return (
    <div className="gallery-item">
      <div className="hover-bg">
        {isHomePage && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={egImage}
            data-lightbox-gallery="gallery1"
          >
            <div className="hover-text"></div>
            <img src={egImage} className="img-responsive" alt="Example" />
          </a>
        )}

        {isPrefrencePage && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={phImage}
            data-lightbox-gallery="gallery1"
          >
            <div className="hover-text"></div>
            <img src={phImage} className="img-responsive" alt="Example" />
          </a>
        )}
      </div>
    </div>
  );
};
