import { talksAndWritings } from "@/constants/quick-portfolio/talks";

export default function Talks() {
  return (
    <div className="mt-10">
      <h3 className="text-xl md:text-2xl font-semibold text-text-primary font-sora">글/발표</h3>
      <ul className="mt-4 space-y-2 text-sm text-text-secondary font-pret">
        {talksAndWritings.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}


