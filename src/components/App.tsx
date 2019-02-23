import * as React from "react";
import { Table } from "./Table";
import { SettingsButton } from "./SettingsButton";

export const App = ({ accountId }: { accountId: string }) => {
  return (
    <div className="sans-serif w-100 vh-100 pa4">
      {accountId} hello <Table />
      <SettingsButton />
    </div>
  );
};
