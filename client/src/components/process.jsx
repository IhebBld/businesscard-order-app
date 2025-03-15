import React from "react";

export const Process = (props) => {
  return (
    <div id="process" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Process</h2>
          <p>Your business card, perfected in six simple steps.</p>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-4">
                  {" "}
                  <i className={d.icon}></i>
                  <div className="process-desc">
                    <h3>{d.name}</h3>
                    <p>{d.text}</p>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};
