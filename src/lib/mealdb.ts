/** MealDB API utilities */

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
  ingredients: { ingredient: string; measure: string }[];
  ingredientCount: number;
}

/** Parse raw API meal object into our Meal type */
function parseMeal(raw: Record<string, string | null>): Meal {
  const ingredients: { ingredient: string; measure: string }[] = [];

  for (let i = 1; i <= 20; i++) {
    const ing = raw[`strIngredient${i}`]?.trim();
    const measure = raw[`strMeasure${i}`]?.trim() || "";
    if (ing) {
      ingredients.push({ ingredient: ing, measure });
    }
  }

  return {
    idMeal: raw.idMeal || "",
    strMeal: raw.strMeal || "",
    strCategory: raw.strCategory || "",
    strArea: raw.strArea || "",
    strInstructions: raw.strInstructions || "",
    strMealThumb: raw.strMealThumb || "",
    strYoutube: raw.strYoutube || "",
    ingredients,
    ingredientCount: ingredients.length,
  };
}

/** Search meals by name */
export async function searchMeals(query: string): Promise<Meal[]> {
  const res = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Failed to fetch meals");
  const data = await res.json();
  if (!data.meals) return [];
  return data.meals.map(parseMeal);
}

/** Find the minimum ingredient count in a list of meals */
export function getMinIngredientCount(meals: Meal[]): number {
  if (meals.length === 0) return 0;
  return Math.min(...meals.map((m) => m.ingredientCount));
}
