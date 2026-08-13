export function createId(prefix: string): string {
  const random = crypto.randomUUID().split("-")[0];
  return `${prefix}_${random}`;
}
