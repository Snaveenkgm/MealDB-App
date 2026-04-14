const KEY = "mealdb_favorites";

export function getFavorites(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function toggleFavorite(id: string): string[] {
  const favs = getFavorites();
  const idx = favs.indexOf(id);
  if (idx >= 0) favs.splice(idx, 1);
  else favs.push(id);
  localStorage.setItem(KEY, JSON.stringify(favs));
  return [...favs];
}

export function isFavorite(id: string): boolean {
  return getFavorites().includes(id);
}
