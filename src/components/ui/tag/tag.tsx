import { cn } from "@/utils";
import { Typography } from "../typography";
import "./tag.scss";

type TagProps = {
  children: React.ReactNode;
  /** ui-kit → tag (0:4843): dark — на тёмном фоне (Default), light — на светлом (Variant2). */
  variant?: "dark" | "light";
  className?: string;
};

export function Tag({ children, variant = "dark", className }: TagProps) {
  return (
    <Typography
      as="span"
      variant="tag"
      color={variant === "dark" ? "blue-400" : "blue-700"}
      nowrap
      className={cn("tag", `tag--${variant}`, className)}
    >
      {children}
    </Typography>
  );
}
