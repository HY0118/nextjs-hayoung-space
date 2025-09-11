import ExternalLinkIcon from '@/components/ui/icons/ExternalLinkIcon';

import { talksAndWritings } from '@/constants/quick-portfolio/talks';

import type { TalkItem } from '@/interfaces/quickPortfolio';

export default function Talks() {
  return (
    <div className="mt-8">
      <h3 className="text-sm font-semibold tracking-[0.2em] text-text-secondary/80 font-pret">
        TALKS
      </h3>
      <ul className="mt-2 space-y-1 text-text-primary text-base font-pret list-disc list-inside">
        {talksAndWritings.map((t: TalkItem) => (
          <li
            key={t.title}
            className="list-item"
          >
            <span className="inline-flex items-center gap-2">
              <span className="font-pret">{t.title}</span>
              {t.link ? (
                <a
                  href={t.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="외부 링크 열기"
                  className="text-blue-500 hover:text-blue-600"
                >
                  <ExternalLinkIcon className="w-3.5 h-3.5" />
                </a>
              ) : null}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
