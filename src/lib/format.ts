import type { Language } from "@/types";

export function formatDateKo(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
}

export function formatDateByLanguage(
  dateStr: string,
  language: Language,
): string {
  const [year, month, day] = dateStr.split("-");
  const monthNum = Number(month);
  const dayNum = Number(day);

  if (language === "EN") {
    return new Date(`${dateStr}T12:00:00`).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  if (language === "JA") {
    return `${year}年${monthNum}月${dayNum}日`;
  }

  return formatDateKo(dateStr);
}

export function formatMonthYear(
  year: number,
  month: number,
  language: Language,
): string {
  if (language === "EN") {
    return new Date(year, month, 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  }

  if (language === "JA") {
    return `${year}年${month + 1}月`;
  }

  return `${year}년 ${month + 1}월`;
}

export function formatTimeByLanguage(
  isoTime: string,
  language: Language,
): string {
  const date = new Date(isoTime);

  if (language === "EN") {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  if (language === "JA") {
    return date.toLocaleTimeString("ja-JP", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  return date.toLocaleTimeString("ko-KR", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

