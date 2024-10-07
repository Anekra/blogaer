import React from 'react';
import { cn } from '../../utils/shadcn';

export default function Logo2Icon({
  className
}: {
  className?: string | undefined;
}) {
  return (
    <svg
      width="111"
      height="111"
      viewBox="0 0 111 111"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        'h-[50px] w-[80px] fill-current text-primary-foreground',
        className
      )}
    >
      <g clipPath="url(#clip0_239_224)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 1.6992C118 -9.3373 108 36.1627 97 58.1992L110.5 110.699H0C25.3019 71.5191 23.3772 47.3951 0 1.6992ZM92 96.1627L85 96.1627L85.5 98.1627H70.5L70 96.1627L28 96.1627C31.8922 90.0351 34.5 80 34.5 80H32.5C33.5 76.5 34 72.5 34 70H36C36 70 36.223 67.1281 36 65.1627H62.0821L61.5625 63.1627H76.5733L77.0675 65.1627H84L92 96.1627ZM85 52.1627H73.7617L74.2891 54.1627H59.2813L58.7735 52.1627H36C35.1642 37.3886 32.5808 27.1669 26 15.1627C33.4627 14.2847 49.0001 14.1627 49.0001 14.1627L48.5001 12.1627C54.7167 11.9713 58.1233 12.3367 64.0001 14.1627L64.5001 16.1627C86.3514 19.4824 97.4005 29.3183 85 52.1627Z"
        />
        <path d="M63.4044 70H36C35.9288 73.8768 35.4524 76.0664 34.5 80H65.9141L63.4044 70Z" />
        <path d="M84.914 96H69.914L65.9141 80H67.9141L65.4141 70H63.4141L62 65H76.9878L84.914 96Z" />
        <path d="M58.5436 52.0086L49 14.0086C55.3311 13.9202 59 14.5086 64.5 16.0086L74 52.0086H58.5436Z" />
      </g>
      <defs>
        <clipPath id="clip0_239_224">
          <rect width="110.5" height="110.699" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
