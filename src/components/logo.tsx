import * as React from 'react';

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 40"
      width="100"
      height="25"
      {...props}
    >
      <text
        x="80"
        y="30"
        fontFamily="Poppins, sans-serif"
        fontSize="32"
        fontWeight="bold"
        fill="currentColor"
        textAnchor="middle"
      >
        عملة
        <tspan fill="hsl(var(--primary))">.</tspan>
      </text>
    </svg>
  );
}
