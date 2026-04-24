export interface ApiPayload {
  success?: boolean;
  error?: string;
  data?: any;
  [key: string]: any;
}

export async function fetchJson<T = ApiPayload>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init);
  const text = await response.text();

  let data: any = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      const message = text.trim() || `Request failed (${response.status})`;
      throw new Error(message);
    }
  }

  if (!response.ok) {
    const message =
      data?.error ||
      data?.message ||
      text.trim() ||
      `Request failed (${response.status})`;
    throw new Error(message);
  }

  return (data ?? {}) as T;
}
