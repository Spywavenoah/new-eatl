"use client";

import { useState, type ReactNode } from "react";

export type TabItem = { id: string; label: string; content: ReactNode };

export default function Tabs({ items, variant = "pill" }: { items: TabItem[]; variant?: "pill" | "underline" }) {
  const [active, setActive] = useState(items[0]?.id);
  const current = items.find((i) => i.id === active) ?? items[0];

  return (
    <div>
      <div
        role="tablist"
        className={`flex gap-2 overflow-x-auto pb-2 ${
          variant === "underline" ? "border-b border-line" : ""
        }`}
      >
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(item.id)}
              className={
                variant === "pill"
                  ? `shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-brand-green text-white shadow-lift"
                        : "bg-white text-ink hover:bg-brand-green-light hover:text-brand-green"
                    }`
                  : `relative shrink-0 px-4 py-3 text-sm font-semibold transition-colors ${
                      isActive ? "text-brand-green" : "text-muted hover:text-ink"
                    }`
              }
            >
              {item.label}
              {variant === "underline" && isActive && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 bg-brand-red" />
              )}
            </button>
          );
        })}
      </div>
      <div key={current?.id} className="animate-fade-up pt-6">
        {current?.content}
      </div>
    </div>
  );
}
