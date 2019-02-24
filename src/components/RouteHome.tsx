import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { LocalStorageAccessor } from "./types";
import { Table } from "./Table";

const loadNamespaces = async (
  setNamespaces: Function,
  accountId: string,
  authEmail: string,
  authKey: string
) => {
  const response = await axios({
    url: `https://api.cloudflare.com/client/v4/accounts/${accountId}/storage/kv/namespaces`,
    headers: {
      "X-Auth-Email": authEmail,
      "X-Auth-Key": authKey
    }
  });
  setNamespaces(response.data.result);
};

export const RouteHome = ({
  useLocalStorage
}: {
  useLocalStorage: LocalStorageAccessor;
}) => {
  const [accountId] = useLocalStorage("accountId");
  const [authEmail] = useLocalStorage("authEmail");
  const [authKey] = useLocalStorage("authKey");

  const [namespaces, setNamespaces] = useState(false as boolean | Object[]);
  useEffect(() => {
    if (!namespaces) {
      loadNamespaces(setNamespaces, accountId, authEmail, authKey);
    }
  });

  return (
    <div>
      {accountId && authEmail && authKey ? (
        <React.Fragment>
          <h2>Namespaces</h2>
          {!namespaces && <div>loading...</div>}
          {namespaces && (
            <Table
              header={["Id", "Title"]}
              data={namespaces}
              render={row => [row.id, row.title]}
            />
          )}
        </React.Fragment>
      ) : (
        <h2>Home</h2>
      )}
    </div>
  );
};
