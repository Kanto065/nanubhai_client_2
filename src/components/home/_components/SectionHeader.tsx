import React from "react";

export default function SectionHeader({ content }: { content: string }) {
  return (
    <div
      className="text-center mb-6 animate-fadeIn"
      style={{ animation: "fadeIn 0.6s ease-out" }}
    >
      <h2
        className="text-2xl md:text-3xl font-extrabold text-black "
        style={{ color: "black" }}
      >
        {content}
      </h2>
    </div>
  );
}
