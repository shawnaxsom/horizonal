import React from "react";

import Slider from "rc-slider";

import { Column, Field, Control, Input, Button } from "bloomer";

const CloudIcon = require("../if_cloud_126565.svg");

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
        background: "#444",
        height: 100,
        zIndex: 2000,
      }}
    >
      <div
        role="button"
        onClick={() => {
          setDayFilter(null);
          setHourFilter(null);
        }}
      >
        <img
          src={CloudIcon}
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
        />
        {data && data.currentTemperature ? (
          <div
            style={{
              position: "absolute",
              mixBlendMode: "hard-light",
              left: 18,
              top: 12,
              fontSize: "4.15em",
            }}
          >
            {Math.round(data.currentTemperature)}
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
                  <span {...props}>Forecast</span>
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
            margin: "0 20px 20px",
          }}
          value={hourFilter}
          onChange={setHourFilter}
        />
      </div>
    </header>
  );
};

export default Header;
