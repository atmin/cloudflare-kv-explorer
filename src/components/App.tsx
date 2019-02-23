import * as React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { Home } from "./Home";
import { Table } from "./Table";
import { SettingsButton } from "./SettingsButton";

export const App = ({ accountId }: { accountId: string }) => (
  <Router>
    <div className="sans-serif w-100 vh-100 pa4">
      <nav>
        <SettingsButton />
        <a href="#">home</a>
        <a href="#table">table</a>
      </nav>

      <Route exact path="/" component={Home} />
      <Route path="/table" component={Table} />
    </div>
  </Router>
);
