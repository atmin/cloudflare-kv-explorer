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
  namespace: string,
  setKeys: Function,
  accountId: string,
  authEmail: string,
  authKey: string
) => {
  const response = await axios({
    url: `https://api.cloudflare.com/client/v4/accounts/${accountId}/storage/kv/namespaces/${namespace}/keys`,
    headers: {
      "X-Auth-Email": authEmail,
      "X-Auth-Key": authKey
    }
  });
  setKeys(response.data.result);
};

const getValue = async (
  namespace: string,
  key: string,
  keys: [],
  setKeys: Function,
  accountId: string,
  authEmail: string,
  authKey: string
) => {
  const value = (await axios({
    url: `https://api.cloudflare.com/client/v4/accounts/${accountId}/storage/kv/namespaces/${namespace}/values/${key}`,
    headers: {
      "X-Auth-Email": authEmail,
      "X-Auth-Key": authKey
    }
  })).data;
  const idx = keys.findIndex(row => (row as any).name === key);
  setKeys([
    ...keys.slice(0, idx),
    { ...(keys[idx] as any), value },
    ...keys.slice(idx + 1)
  ]);
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
        (selectedNamespace as any).id,
        setKeys,
        accountId,
        authEmail,
        authKey
      );
    }
  });

  const [selectedKey, setSelectedKey] = useState(null);
  useEffect(() => {
    if (
      selectedKey &&
      !(((keys || []).find(
        row => (row as any).name === (selectedKey as any).name
      ) || {}) as any).value
    ) {
      getValue(
        (selectedNamespace as any).id,
        (selectedKey as any).name,
        keys as any,
        setKeys,
        accountId,
        authEmail,
        authKey
      );
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
                  header={["Key", "Value"]}
                  data={keys}
                  render={(row: any) => [
                    row.name,
                    row.value ? JSON.stringify(row.value) : "…"
                  ]}
                  onRowSelect={(row: any) => setSelectedKey(row)}
                />
              )}
            </div>
          )}
        </article>
      ) : (
        <>
          <h2>Home</h2>
          <p>Enter your Cloudflare credentials to continue</p>
        </>
      )}
    </div>
  );
};
