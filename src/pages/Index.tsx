import { useCallback, useEffect, useState } from "react";
import { searchMeals, getMinIngredientCount, type Meal } from "@/lib/mealdb";
import { getFavorites, toggleFavorite } from "@/lib/favorites";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { SearchBar } from "@/components/SearchBar";
import { MealCard } from "@/components/MealCard";
import { MealDetailModal } from "@/components/MealDetailModal";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ChefHat, UtensilsCrossed } from "lucide-react";

const Index = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [favs, setFavs] = useState<string[]>(getFavorites);

  /* Load default meals on mount */
  useEffect(() => {
    handleSearch("chicken");
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    setSearched(true);
    try {
      const results = await searchMeals(query);
      setMeals(results);
    } catch {
      setError("Something went wrong. Please try again.");
      setMeals([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleToggleFav = useCallback((id: string) => {
    setFavs(toggleFavorite(id));
  }, []);

  const minCount = getMinIngredientCount(meals);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl hero-gradient">
              <ChefHat size={22} className="text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">MealDB Finder</h1>
          </div>
          <DarkModeToggle />
        </div>
      </header>

      {/* Hero / Search */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
            Discover <span className="text-primary">Delicious</span> Recipes
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Search thousands of meals and find your next favorite dish. The simplest recipe is highlighted!
          </p>
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>
      </section>

      {/* Results */}
      <main className="max-w-6xl mx-auto px-4 pb-16">
        {loading && <LoadingSpinner />}

        {error && (
          <div className="text-center py-16 text-destructive">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {!loading && !error && searched && meals.length === 0 && (
          <div className="text-center py-16 space-y-3">
            <UtensilsCrossed size={48} className="mx-auto text-muted-foreground" />
            <p className="text-lg font-medium text-muted-foreground">No meals found</p>
            <p className="text-sm text-muted-foreground">Try a different search term</p>
          </div>
        )}

        {!loading && meals.length > 0 && (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              Found <span className="font-semibold text-foreground">{meals.length}</span> meals
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {meals.map((meal, i) => (
                <MealCard
                  key={meal.idMeal}
                  meal={meal}
                  isLeast={meal.ingredientCount === minCount}
                  isFav={favs.includes(meal.idMeal)}
                  onSelect={() => setSelectedMeal(meal)}
                  onToggleFav={() => handleToggleFav(meal.idMeal)}
                  index={i}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Detail Modal */}
      {selectedMeal && (
        <MealDetailModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
      )}
    </div>
  );
};

export default Index;
