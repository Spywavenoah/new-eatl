import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...p,
});

export const PhoneIcon = (p: P) => (
  <svg {...base(p)}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.9 2z"/></svg>
);
export const MailIcon = (p: P) => (
  <svg {...base(p)}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>
);
export const PinIcon = (p: P) => (
  <svg {...base(p)}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>
);
export const ArrowRight = (p: P) => (
  <svg {...base(p)}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
);
export const ChevronDown = (p: P) => (
  <svg {...base(p)}><path d="m6 9 6 6 6-6"/></svg>
);
export const CheckIcon = (p: P) => (
  <svg {...base(p)}><path d="M20 6 9 17l-5-5"/></svg>
);
export const ShieldIcon = (p: P) => (
  <svg {...base(p)}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
);
export const GaugeIcon = (p: P) => (
  <svg {...base(p)}><path d="M12 14l4-4"/><path d="M3.3 17a10 10 0 1 1 17.4 0"/><circle cx="12" cy="14" r="1"/></svg>
);
export const CpuIcon = (p: P) => (
  <svg {...base(p)}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>
);
export const WrenchIcon = (p: P) => (
  <svg {...base(p)}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
);
export const DraftingIcon = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="5" r="2"/><path d="m12 7-7 14M12 7l7 14M7.5 16h9"/></svg>
);
export const FlaskIcon = (p: P) => (
  <svg {...base(p)}><path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2.2h12.4a1.5 1.5 0 0 0 1.3-2.2L14 9V3"/><path d="M7 15h10"/></svg>
);
export const AwardIcon = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="8" r="6"/><path d="M15.5 13 17 22l-5-3-5 3 1.5-9"/></svg>
);
export const UsersIcon = (p: P) => (
  <svg {...base(p)}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></svg>
);
export const GlobeIcon = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>
);
export const ClockIcon = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
);
export const SearchIcon = (p: P) => (
  <svg {...base(p)}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);
export const MenuIcon = (p: P) => (
  <svg {...base(p)}><path d="M4 6h16M4 12h16M4 18h16"/></svg>
);
export const XIcon = (p: P) => (
  <svg {...base(p)}><path d="M18 6 6 18M6 6l12 12"/></svg>
);
export const QuoteIcon = (p: P) => (
  <svg {...p} viewBox="0 0 24 24" fill="currentColor" width={p.width ?? 24} height={p.height ?? 24}><path d="M7.2 5C4.3 5 2 7.3 2 10.2c0 2.6 1.9 4.7 4.4 5.1-.4 1.6-1.5 2.8-3.3 3.6l.8 1.1C8 18.6 10 15.9 10 11.4V10c0-2.8-1.2-5-2.8-5zm10 0c-2.9 0-5.2 2.3-5.2 5.2 0 2.6 1.9 4.7 4.4 5.1-.4 1.6-1.5 2.8-3.3 3.6l.8 1.1c4.1-1.4 6.1-4.1 6.1-8.6V10c0-2.8-1.2-5-2.8-5z"/></svg>
);
export const LinkedInIcon = (p: P) => (
  <svg {...p} viewBox="0 0 24 24" fill="currentColor" width={p.width ?? 20} height={p.height ?? 20}><path d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.1 2.1 2.1 0 0 1 0 4.1zM7.1 20.4H3.6V9h3.5v11.4zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.5c0 1 .8 1.8 1.8 1.8h20.5c1 0 1.8-.8 1.8-1.8V1.7C24 .8 23.2 0 22.2 0z"/></svg>
);
export const XSocialIcon = (p: P) => (
  <svg {...p} viewBox="0 0 24 24" fill="currentColor" width={p.width ?? 20} height={p.height ?? 20}><path d="M18.2 2h3.4l-7.4 8.5L23 22h-6.8l-5.3-7-6.1 7H1.4l7.9-9L1 2h7l4.8 6.4L18.2 2zm-1.2 18h1.9L7.1 3.9H5.1L17 20z"/></svg>
);

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const props = { className, width: 28, height: 28 };
  switch (name) {
    case "drafting": return <DraftingIcon {...props} />;
    case "wrench": return <WrenchIcon {...props} />;
    case "cpu": return <CpuIcon {...props} />;
    case "gauge": return <GaugeIcon {...props} />;
    case "shield": return <ShieldIcon {...props} />;
    case "flask": return <FlaskIcon {...props} />;
    default: return <GaugeIcon {...props} />;
  }
}
