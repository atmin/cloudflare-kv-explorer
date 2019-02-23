import * as React from "react";
import { render } from "react-dom";
import { App } from "../components/App";
import "tachyons/css/tachyons.css";

const accountId = localStorage.getItem("accountId");
const setAccountId = value => localStorage.setItem("accountId", accountId);

render(
  <App {...{ accountId, setAccountId }} />,
  document.querySelector("#app")
);
