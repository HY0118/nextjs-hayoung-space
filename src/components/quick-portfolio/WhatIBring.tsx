import { whatIBringItems } from '@/constants/quick-portfolio/whatIBring';

export default function WhatIBring() {
  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold tracking-[0.2em] text-text-secondary/80 font-pret">
        WHAT I BRING
      </h3>
      <ul className="mt-2 space-y-1 text-text-primary text-base list-disc list-inside font-pret">
        {whatIBringItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
