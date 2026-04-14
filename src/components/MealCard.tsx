import { Heart, Star } from "lucide-react";
import type { Meal } from "@/lib/mealdb";

interface Props {
  meal: Meal;
  isLeast: boolean;
  isFav: boolean;
  onSelect: () => void;
  onToggleFav: () => void;
  index: number;
}

export function MealCard({ meal, isLeast, isFav, onSelect, onToggleFav, index }: Props) {
  return (
    <div
      className={`relative group rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer card-shadow hover:card-shadow-hover hover:-translate-y-1 animate-fade-in ${
        isLeast ? "highlight-card border-2" : "bg-card border-border"
      }`}
      style={{ animationDelay: `${index * 60}ms` }}
      onClick={onSelect}
    >
      {/* Highlight badge */}
      {isLeast && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
          <Star size={12} /> Fewest Ingredients
        </div>
      )}

      {/* Favorite button */}
      <button
        onClick={(e) => { e.stopPropagation(); onToggleFav(); }}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-colors"
        aria-label="Toggle favorite"
      >
        <Heart size={16} className={isFav ? "fill-primary text-primary" : "text-muted-foreground"} />
      </button>

      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <h3 className="font-bold text-lg text-card-foreground line-clamp-1">{meal.strMeal}</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground text-xs font-medium">
            {meal.strCategory}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground text-xs font-medium">
            {meal.strArea}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          🧂 <span className="font-semibold text-card-foreground">{meal.ingredientCount}</span> ingredients
        </p>
      </div>
    </div>
  );
}
