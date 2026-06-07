export const QA_QUERY_KEY = "qa";
export const QA_TOKEN_QUERY_KEY = "token";

export interface QAAccessParams {
  qa: string | null;
  token: string | null;
}

export function parseQAAccessParams(
  searchParams: URLSearchParams,
): QAAccessParams {
  return {
    qa: searchParams.get(QA_QUERY_KEY),
    token: searchParams.get(QA_TOKEN_QUERY_KEY),
  };
}

/** True when running locally in development. */
export function isDevelopmentEnvironment(): boolean {
  return process.env.NODE_ENV === "development";
}

/** True when the `qa=true` query flag is present. */
export function isQAQueryEnabled(qaParam: string | null | undefined): boolean {
  return qaParam === "true";
}

/**
 * Core QA visibility gate.
 * Development: always on. Production: only with ?qa=true.
 */
export function isQAMode(params?: Partial<QAAccessParams> | null): boolean {
  if (isDevelopmentEnvironment()) return true;
  return isQAQueryEnabled(params?.qa ?? null);
}

/**
 * Central access check — extend here for token auth later.
 * Future example: ?qa=true&token=moonbuddy-admin
 */
export function shouldShowQAPanel(params: QAAccessParams): boolean {
  if (!isQAMode(params)) return false;

  // Future: require and validate params.token before granting QA access.
  // if (params.token) return validateQAToken(params.token);
  void params.token;

  return true;
}

export function shouldShowQAPanelFromSearch(
  searchParams: URLSearchParams,
): boolean {
  return shouldShowQAPanel(parseQAAccessParams(searchParams));
}
