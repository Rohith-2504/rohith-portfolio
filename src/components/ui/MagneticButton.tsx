"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  download?: boolean;
  onClick?: () => void;
  target?: string;
  rel?: string;
};

export default function MagneticButton({
  children,
  className = "",
  href,
  download,
  onClick,
  target,
  rel,
}: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.12,
      y: (e.clientY - rect.top - rect.height / 2) * 0.12,
    });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        download={download || undefined}
        target={target}
        rel={rel}
        className={className}
        style={{ x: pos.x, y: pos.y }}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      className={className}
      style={{ x: pos.x, y: pos.y }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
