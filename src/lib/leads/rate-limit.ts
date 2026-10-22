const buckets = new Map<string, number[]>();

export function rateLimit(
  key: string,
  limit = 8,
  windowMs = 10 * 60 * 1000,
): boolean {
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((stamp) => now - stamp < windowMs);
  if (hits.length >= limit) {
    buckets.set(key, hits);
    return false;
  }
  hits.push(now);
  buckets.set(key, hits);
  if (buckets.size > 5000) {
    for (const [bucketKey, stamps] of buckets) {
      if (stamps.every((stamp) => now - stamp >= windowMs)) buckets.delete(bucketKey);
    }
  }
  return true;
}

export function resetRateLimitForTests(): void {
  buckets.clear();
}

export function clientAddress(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}
