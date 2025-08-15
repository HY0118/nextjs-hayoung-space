import { whatIBringItems } from "@/constants/quick-portfolio/whatIBring";

export default function WhatIBring() {
  return (
    <div className="mt-6">
      <h3 className="text-xs font-semibold tracking-[0.2em] text-text-secondary/80">WHAT I BRING</h3>
      <ul className="mt-3 space-y-2 text-text-primary list-disc list-inside font-pret">
        {whatIBringItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}


