import { X, ExternalLink } from "lucide-react";
import type { Meal } from "@/lib/mealdb";

interface Props {
  meal: Meal;
  onClose: () => void;
}

export function MealDetailModal({ meal, onClose }: Props) {
  const youtubeId = meal.strYoutube?.includes("v=")
    ? meal.strYoutube.split("v=")[1]?.split("&")[0]
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overlay-bg" onClick={onClose}>
      <div
        className="relative bg-card text-card-foreground rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto card-shadow animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 rounded-full bg-secondary hover:bg-muted transition-colors">
          <X size={18} />
        </button>

        {/* Header image */}
        <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-56 object-cover rounded-t-2xl" />

        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <h2 className="text-2xl font-bold">{meal.strMeal}</h2>
            <div className="flex gap-2 mt-2 text-sm">
              <span className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground font-medium">{meal.strCategory}</span>
              <span className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground font-medium">{meal.strArea}</span>
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Ingredients ({meal.ingredientCount})</h3>
            <div className="grid grid-cols-2 gap-2">
              {meal.ingredients.map((ing, i) => (
                <div key={i} className="flex items-center gap-2 text-sm p-2 rounded-lg bg-secondary">
                  <span className="font-medium text-card-foreground">{ing.ingredient}</span>
                  <span className="text-muted-foreground">— {ing.measure}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Instructions</h3>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {meal.strInstructions}
            </p>
          </div>

          {/* YouTube */}
          {youtubeId && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Video Tutorial</h3>
              <div className="aspect-video rounded-xl overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title="Video tutorial"
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2 text-sm text-primary hover:underline"
              >
                Watch on YouTube <ExternalLink size={14} />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
