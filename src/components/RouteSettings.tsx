import * as React from "react";
import { LocalStorageAccessor } from "./types";

export const RouteSettings = ({
  useLocalStorage
}: {
  useLocalStorage: LocalStorageAccessor;
}) => {
  const [accountId, setAccountId] = useLocalStorage("accountId");
  const [authEmail, setAuthEmail] = useLocalStorage("authEmail");
  const [authKey, setAuthKey] = useLocalStorage("authKey");
  return (
    <div>
      <h2>Settings</h2>
      <form className="measure">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f4 fw6 ph0 mh0">Cloudflare Credentials</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="account-id">
              Account ID
            </label>
            <input
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 border-box"
              id="account-id"
              value={accountId}
              onChange={event => setAccountId(event.target.value)}
            />
          </div>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="auth-email">
              Auth Email
            </label>
            <input
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 border-box"
              type="email"
              id="auth-email"
              value={authEmail}
              onChange={event => setAuthEmail(event.target.value)}
            />
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="auth-key">
              Auth Key
            </label>
            <input
              className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="password"
              id="auth-key"
              value={authKey}
              onChange={event => setAuthKey(event.target.value)}
            />
          </div>
        </fieldset>
      </form>
    </div>
  );
};
