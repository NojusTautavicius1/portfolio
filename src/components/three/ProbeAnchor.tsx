/**
 * An invisible box the 3D probe flies to while its section is active. The probe centres on the
 * box and sizes itself to the box width. yaw/pitch (radians) set where it looks at rest:
 * negative yaw turns it toward the left of the screen.
 */
export function ProbeAnchor({ yaw = -0.32, pitch = 0, className = "" }: { yaw?: number; pitch?: number; className?: string }) {
  return <div aria-hidden data-probe-anchor="" data-probe-yaw={yaw} data-probe-pitch={pitch} className={className} />;
}
