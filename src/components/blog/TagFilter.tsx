"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ModeSwitch from "@/components/common/ModeSwitch";
import ResetIcon from "@/components/icons/ResetIcon";

interface TagFilterProps {
  tags: string[];
  selectedTags?: string[];
  onChange?: (next: string[]) => void;
  mode?: "and" | "or";
  onModeChange?: (mode: "and" | "or") => void;
}

export default function TagFilter({ tags, selectedTags = [], onChange, mode = "and", onModeChange }: TagFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedSet = useMemo(() => new Set(selectedTags), [selectedTags]);

  const applySelected = (nextSelected: string[]) => {
    if (onChange) {
      onChange(nextSelected);
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(searchParams?.toString());
        if (nextSelected.length > 0) params.set("tags", nextSelected.join(","));
        else params.delete("tags");
        const url = `${pathname}?${params.toString()}`;
        window.history.replaceState(null, "", url);
      }
      return;
    }
    const params = new URLSearchParams(searchParams?.toString());
    if (nextSelected.length > 0) params.set("tags", nextSelected.join(","));
    else params.delete("tags");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const toggleTag = (tag: string) => {
    const next = new Set(selectedSet);
    if (next.has(tag)) next.delete(tag);
    else next.add(tag);
    applySelected(Array.from(next));
  };

  const clearAll = () => applySelected([]);

  const changeMode = (next: "and" | "or") => {
    if (onModeChange) onModeChange(next);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(searchParams?.toString());
      params.set("mode", next);
      const url = `${pathname}?${params.toString()}`;
      window.history.replaceState(null, "", url);
    }
  };

  return (
    <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
      {/* Reset */}
      <button
        onClick={clearAll}
        title="초기화"
        aria-label="초기화"
        className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full border border-border text-text-secondary hover:text-primary hover:bg-primary/10"
      >
        <ResetIcon className="w-4 h-4" />
      </button>

      {/* Tags */}
      <div className="flex-1 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 min-w-max">
          {tags.map((tag) => {
            const active = selectedSet.has(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-all border
                  ${active ? "bg-primary text-white border-primary shadow" : "bg-surface text-text-secondary hover:bg-primary/10 hover:text-primary border-border"}`}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* AND/OR Switch */}
      <div className="shrink-0">
        {selectedSet.size > 0 && <ModeSwitch value={mode} onChange={changeMode} />}
      </div>
    </div>
  );
} 