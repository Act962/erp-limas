import "dotenv/config";

interface FreeMarketRequestOptions extends RequestInit {
  body?: any;
  path: string;
}

export async function mercadoLibreFetch<T>(
  options: FreeMarketRequestOptions,
): Promise<T> {
  const { path, ...fetchOptions } = options;
  const url = `https://api.mercadolibre.com${path}`;

  const defaultHeaders: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
    acessToken: process.env.FREE_MARKET_KEY_SECRET!,
  };

  const response = await fetch(url, {
    headers: {
      ...defaultHeaders,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message ||
        `UAZAPI error: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}
