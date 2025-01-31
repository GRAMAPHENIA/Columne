import React from "react";

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 68 68"
    className="w-4 h-4 text-rose-400" // Aquí aplicamos el color de Tailwind
  >
    <g>
      <path
        d="M22.5,59.881c1.104,0,2-0.896,2-2v-31c0-1.104-0.896-2-2-2s-2,0.896-2,2v31C20.5,58.985,21.396,59.881,22.5,59.881z"
        fill="currentColor" // Esto hace que el color sea controlado por Tailwind
      />
      <path
        d="M33.5,59.881c1.104,0,2-0.896,2-2v-31c0-1.104-0.896-2-2-2s-2,0.896-2,2v31C31.5,58.985,32.396,59.881,33.5,59.881z"
        fill="currentColor"
      />
      <path
        d="M44.5,59.881c1.104,0,2-0.896,2-2v-31c0-1.104-0.896-2-2-2s-2,0.896-2,2v31C42.5,58.985,43.396,59.881,44.5,59.881z"
        fill="currentColor"
      />
      <path
        d="M15.72,67.5h36.839c3.492,0,5.941-2.464,5.941-5.83V20.5h4c3.033,0,5.5-2.468,5.5-5.5s-2.467-5.5-5.5-5.5h-12V6.938
          c0-3.51-1.916-6.438-5.243-6.438H23.254c-3.241,0-5.754,2.701-5.754,6.438V9.5h-12C2.467,9.5,0,11.968,0,15s2.467,5.5,5.5,5.5h3
          v41.17C8.5,64.979,12.14,67.5,15.72,67.5z M21.5,6.938c0-2.057,1.254-2.438,1.754-2.438h22.003c1.517,0,1.243,1.669,1.243,2.438
          V9.5h-25C21.5,9.5,21.5,6.938,21.5,6.938z M5.5,16.5C4.673,16.5,4,15.827,4,15s0.673-1.5,1.5-1.5h57c0.827,0,1.5,0.673,1.5,1.5
          s-0.673,1.5-1.5,1.5H5.5z M54.5,20.5v41.17c0,1.157-0.664,1.83-1.941,1.83H15.72c-1.347,0-3.22-0.735-3.22-1.83V20.5H54.5z"
        fill="currentColor"
      />
    </g>
  </svg>
);

export default TrashIcon;
