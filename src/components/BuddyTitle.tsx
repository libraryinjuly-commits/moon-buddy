interface BuddyTitleProps {
  epithet: string;
  customName: string;
  epithetClassName?: string;
  nameClassName?: string;
  layout?: "stacked" | "inline";
}

export function BuddyTitle({
  epithet,
  customName,
  epithetClassName = "text-[11px] font-medium leading-snug text-violet-500",
  nameClassName = "text-lg font-bold leading-tight text-violet-900",
  layout = "stacked",
}: BuddyTitleProps) {
  if (layout === "inline") {
    return (
      <p className="leading-snug">
        <span className={epithetClassName}>{epithet} </span>
        <span className={nameClassName}>{customName}</span>
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-0.5 text-center">
      <p className={epithetClassName}>{epithet}</p>
      <p className={nameClassName}>{customName}</p>
    </div>
  );
}
