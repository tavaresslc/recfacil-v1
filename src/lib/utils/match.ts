export function getMatchColor(compatibilidade: number): string {
  if (compatibilidade >= 90) return "bg-emerald-100 text-emerald-700";
  if (compatibilidade >= 80) return "bg-blue-100 text-blue-700";
  return "bg-gray-100 text-gray-600";
}