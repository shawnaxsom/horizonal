import React from "react";

const Footer = () =>
  <footer
    style={{
      position: "fixed",
      bottom: 0,
      right: 0,
      margin: 4,
      color: "#ccc",
      fontSize: "0.7em",
    }}
  >
    Powered by{" "}
    <a
      href="https://darksky.net"
      target="_blank"
      rel="noopener noreferrer"
      style={{textDecoration: "none", color: "#ccf"}}
    >
      Dark Sky
    </a>
  </footer>;

export default Footer;
