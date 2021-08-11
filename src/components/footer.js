import React from "react";

const Footer = ({setUnits, units}) => {
  const changeUnits = () => {
    if (units === "Fahrenheit") {
      setUnits("Celsius");
    } else {
      setUnits("Fahrenheit");
    }
  }

  return ( 
    <footer
      style={{
        position: "fixed",
        display: "flex",
        justifyContent: "space-between",
        bottom: ".25em",
        right: "1em",
        left: "1em",
        color: "#888",
        fontSize: "0.7em",
      }}
    >
      <button style={{
        border: "none",
       }} onClick={changeUnits}>
         {units}
      </button>
      <div>
        Powered by{" "}
        <a
          href="https://darksky.net"
          target="_blank"
          rel="noopener noreferrer"
          style={{textDecoration: "none", color: "#88a"}}
        >
          Dark Sky
        </a>
      </div>
    </footer>
  );
}

export default Footer;
