import * as React from "react";

export const NavLink = ({
  to,
  label,
  icon
}: {
  to: string;
  label: string;
  icon?: () => JSX.Element;
}) => (
  <a
    href={`#${to}`}
    className="f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa2 ba border-box mr1"
  >
    {icon && icon()}
    <span className="pl1">{label}</span>
  </a>
);
