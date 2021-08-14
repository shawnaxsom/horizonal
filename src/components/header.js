import React from "react";

import Slider from "rc-slider";

import { Column, Field, Control, Input, Button } from "bloomer";
import withLocalStorageUnits from "../utils/with-local-storage-units";

const CloudIcon = require("../reshot-icon-sun-cloud-Z68ADE74PR.svg");
const SunIcon = require("../reshot-icon-sun-energy-WL9MVB4TYD.svg");

const Header = ({
  address,
  data,
  getForecast,
  hourFilter,
  isLoading,
  setAddress,
  setDayFilter,
  setHourFilter,
}) => {
  const isDesktop = window.innerWidth > 768;

  return (
    <header
      style={{
        position: "fixed",
        width: "100vw",
        top: 0,
        left: 0,
        right: 0,
        display: "flex",
        flexWrap: "wrap",
        overflow: "visible",
        padding: 10,
        background:
          "linear-gradient(to top, #333333, #38373a, #3f3b40, #463f45, #4e424a)",
        height: 100,
        zIndex: 2000,
        boxShadow:
          "rgba(15, 15, 0, 0.1) 0px 2px 10px 1px, rgba(35, 45, 40, 0.16) 0px -3px 80px 1px inset, rgba(145, 145, 155, 0.06) 1px 8px 8px 5px inset",
      }}
    >
      <div
        role="button"
        onClick={() => {
          setDayFilter(null);
          setHourFilter(null);
        }}
      >
        {data && data.currently && data.currently.cloudCover > 0.6 ? <img
          src={CloudIcon}
          alt={"Horizonal"}
          style={{
            cursor: "pointer",
            position: "absolute",
            left: 0,
            top: 0,
            marginLeft: 8,
            opacity: 0.7,
            ...(isDesktop
              ? { width: 96, marginTop: 0 }
              : { width: 32, marginTop: 12 }),
          }}
        /> : data && data.currently ? <img
          src={SunIcon}
          alt={"Horizonal"}
          style={{
            cursor: "pointer",
            position: "absolute",
            left: 0,
            top: 0,
            marginLeft: 8,
            ...(isDesktop
              ? { width: 96, marginTop: 0 }
              : { width: 32, marginTop: 12 }),
          }}
        /> : null}
        {data && data.currentTemperature ? (
          <div
            style={{
              position: "absolute",
              mixBlendMode: "hard-light",
              left: 18,
              top: 12,
              fontSize: isDesktop ? "4.15em" : "1.15em",
              color: data && data.currently && data.currently.cloudCover > 0.6 ? "#0ff" : "#ff0"
            }}
          >
            {Math.round(withLocalStorageUnits(data.currentTemperature))}
            &#176;
          </div>
        ) : null}
      </div>
      <div
        style={{
          width: "100%",
          ...(isDesktop
            ? { marginLeft: 100, paddingLeft: 10 }
            : { marginLeft: 40 }),
        }}
      >
        <Field hasAddons>
          <Control>
            <Input
              placeholder="Westfield, IN"
              value={address}
              onMouseDown={event => {
                event.preventDefault();
                event.target.select();
              }}
              onKeyDown={event => event.keyCode === 13 && getForecast()}
              onChange={event => setAddress(event.target.value)}
              style={{ boxShadow: "inset 3px 3px 2px #eed" }}
            />
          </Control>
          <Control>
            <Button
              isColor="dark"
              isLoading={isLoading}
              render={props => (
                <Column
                  onClick={getForecast}
                  style={{ cursor: "pointer", padding: 0, margin: 0 }}
                >
                  <span
                    style={{
                      backgroundColor: "rgba(200, 200, 200, 0.1)",
                      boxShadow:
                        "rgba(68, 68, 68, 0.3) 0px 4px 2px inset, rgba(64, 67, 71, 0.35) -4px -4px 8px inset",
                    }}
                    {...props}
                  >
                    Forecast
                  </span>
                </Column>
              )}
            />
          </Control>
        </Field>
      </div>
      <div
        style={{
          width: "100%",
          marginTop: 8,
          ...(isDesktop ? { marginLeft: 100 } : { marginLeft: 0 }),
        }}
      >
        <Slider
          min={0}
          max={24}
          marks={{
            0: { label: "High", style: { color: "#ffa" } },
            8: { label: "8", style: { color: "#ddb" } },
            12: { label: "12p", style: { color: "#ffa" } },
            17: { label: "5", style: { color: "#ddb" } },
            21: { label: "9", style: { color: "#ddb" } },
            24: { label: "Low", style: { color: "#ffa" } },
          }}
          style={{
            height: 30,
            color: "red",
            width: "unset",
            margin: "2px 20px 20px",
          }}
          value={hourFilter}
          onChange={setHourFilter}
        />
      </div>
    </header>
  );
};

export default Header;
