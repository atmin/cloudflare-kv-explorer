import * as React from "react";
import { useState } from "react";

export const Table = ({
  header,
  render,
  data,
  onRowSelect
}: {
  header: string[];
  render: (row: Object) => JSX.Element[];
  data?: Object[];
  onRowSelect?: (row: Object) => void;
}) => {
  const [selected, setSelected] = useState({});
  return (
    <div className="overflow-auto">
      <table className="f6 w-100 mw8 center" cellSpacing="0">
        <thead>
          <tr>
            {header.map(th => (
              <th
                key={JSON.stringify(th)}
                className="fw6 bb b--black-20 tl pb3 ph3 bg-white"
              >
                {th}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="lh-copy">
          {data &&
            data.map(row => (
              <tr
                key={JSON.stringify(row)}
                className={selected === row ? "bg-black-80 white" : ""}
                onClick={() => {
                  if (onRowSelect) {
                    setSelected(row);
                    onRowSelect(row);
                  }
                }}
              >
                {render(row).map(td => (
                  <td
                    key={JSON.stringify(td)}
                    className="pv3 ph3 bb b--black-20"
                  >
                    {td}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
