import Image from "next/image";

import { ProbeAnchor } from "./ProbeAnchor";

/**
 * The probe's home in the hero. Shows the static poster (loading state and the fallback for
 * reduced motion / weak devices) and holds the anchor the 3D probe flies to. Once ProbeLayer
 * is ready it sets html[data-probe="ready"] and the poster fades out (globals.css).
 */
export function ProbeStage({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-square w-full ${className}`}>
      <div className="probe-poster absolute inset-x-[22%] bottom-[18%] h-[7%] rounded-[50%] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--text)_14%,transparent),transparent)] blur-md" />
      <Image
        src="/images/zondas-poster.webp"
        alt=""
        fill
        loading="eager"
        sizes="(min-width: 1024px) 560px, 80vw"
        className="probe-poster object-contain"
      />
      <ProbeAnchor yaw={-0.32} className="absolute inset-0" />
    </div>
  );
}
