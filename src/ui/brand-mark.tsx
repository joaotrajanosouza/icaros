import { cn } from "@ui/utils";

const WEBP_SRCSET =
  "/brand/logo-64.webp 64w, /brand/logo-128.webp 128w, /brand/logo-256.webp 256w, /brand/logo-512.webp 512w";

type BrandMarkProps = {
  /** Rendered square size in pixels */
  size?: number;
  className?: string;
};

/**
 * Icaros logo mark — renders the real illustrated logo using a <picture>
 * element with WebP srcSet for optimal loading, PNG fallback for legacy browsers.
 * width/height are always set to prevent layout shift (CLS).
 */
export function BrandMark({ size = 40, className }: BrandMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-flex shrink-0 items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <picture>
        <source
          type="image/webp"
          srcSet={WEBP_SRCSET}
          sizes={`${size}px`}
        />
        <img
          src="/brand/logo.png"
          alt=""
          width={size}
          height={size}
          loading="eager"
          decoding="async"
          style={{ objectFit: "contain", display: "block" }}
        />
      </picture>
    </span>
  );
}

/**
 * Brand lockup — the full logo image (already contains the Icaros wordmark).
 * No separate text is rendered since the wordmark is embedded in the illustration.
 */
export function BrandLockup({
  markSize = 96,
  className,
}: {
  markSize?: number;
  className?: string;
}) {
  return (
    <div className={cn("inline-flex items-center", className)}>
      <BrandMark size={markSize} />
    </div>
  );
}
