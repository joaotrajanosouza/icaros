import type { SVGProps } from "react";
import { APP_NAME } from "@core/constants";

type BrandMarkProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export function BrandMark({ size = 40, ...props }: BrandMarkProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="48" height="48" rx="15" fill="#7C3AED" />
      <path
        d="M14.5 24.2c0-4.75 3.85-8.6 8.6-8.6h3.15a7.25 7.25 0 0 1 0 14.5H23.1"
        stroke="white"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path
        d="M33.5 23.8c0 4.75-3.85 8.6-8.6 8.6h-3.15a7.25 7.25 0 0 1 0-14.5h3.15"
        stroke="#FDE68A"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BrandLockup({
  markSize = 42,
  className,
}: {
  markSize?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <BrandMark size={markSize} />
        <span className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
          {APP_NAME}
        </span>
      </div>
    </div>
  );
}