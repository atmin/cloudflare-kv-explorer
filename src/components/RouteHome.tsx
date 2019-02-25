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

const loadKeys = async (
  selectedNamespace: { id: string; title: string },
  setKeys: Function,
  accountId: string,
  authEmail: string,
  authKey: string
) => {
  const response = await axios({
    url: `https://api.cloudflare.com/client/v4/accounts/${accountId}/storage/kv/namespaces/${
      selectedNamespace.id
    }/keys`,
    headers: {
      "X-Auth-Email": authEmail,
      "X-Auth-Key": authKey
    }
  });
  setKeys(response.data.result);
};

export const RouteHome = ({
  useLocalStorage
}: {
  useLocalStorage: LocalStorageAccessor;
}) => {
  const [accountId] = useLocalStorage("accountId");
  const [authEmail] = useLocalStorage("authEmail");
  const [authKey] = useLocalStorage("authKey");

  const [namespaces, setNamespaces] = useState(null);
  useEffect(() => {
    if (!namespaces) {
      loadNamespaces(setNamespaces, accountId, authEmail, authKey);
    }
  });

  const [selectedNamespace, setSelectedNamespace] = useState(null);
  const [keys, setKeys] = useState(null);
  useEffect(() => {
    if (!keys && selectedNamespace) {
      loadKeys(
        selectedNamespace as any,
        setKeys,
        accountId,
        authEmail,
        authKey
      );
    }
  });

  const [selectedKey, setSelectedKey] = useState(null);
  useEffect(() => {
    if (selectedKey) {
      console.log(selectedKey);
    }
  });

  return (
    <div>
      {accountId && authEmail && authKey ? (
        <article className="cf">
          <div className="fl w-100 w-50-l pr4">
            <h2>Namespaces</h2>
            {!namespaces && <div>loading...</div>}
            {namespaces && (
              <Table
                header={["Id", "Title"]}
                data={namespaces}
                render={(row: any) => [row.id, row.title]}
                onRowSelect={(row: any) => {
                  setSelectedNamespace(row);
                  setKeys(null);
                }}
              />
            )}
          </div>
          {selectedNamespace && (
            <div className="fl w-100 w-50-l">
              <h2>Keys</h2>
              {!keys && <div>loading...</div>}
              {keys && (
                <Table
                  header={["Key"]}
                  data={keys}
                  render={(row: any) => [row.name]}
                  onRowSelect={(row: any) => setSelectedKey(row)}
                />
              )}
            </div>
          )}
        </article>
      ) : (
        <h2>Home</h2>
      )}
    </div>
  );
};
