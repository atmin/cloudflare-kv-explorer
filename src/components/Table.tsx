import * as React from "react";

export const Table = ({
  header,
  render,
  data
}: {
  header: string[];
  render: (row: Object) => JSX.Element[];
  data: Object[];
}) => (
  <div className="overflow-auto">
    <table className="f6 w-100 mw8 center" cellSpacing="0">
      <thead>
        <tr>
          {header.map(th => (
            <th
              key={JSON.stringify(th)}
              className="fw6 bb b--black-20 tl pb3 pr3 bg-white"
            >
              {th}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="lh-copy">
        {data.map(datum => (
          <tr key={JSON.stringify(datum)}>
            {render(datum).map(td => (
              <td key={JSON.stringify(td)} className="pv3 pr3 bb b--black-20">
                {td}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
