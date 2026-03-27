export interface Ingredient {
  name: string;
  amount: string;
}

export interface Recipe {
  id: number;
  title: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Dessert';
  prepTime: number; // in minutes
  calories: number;
  image: string;
  ingredients: Ingredient[];
  instructions: string[];
  isFavorite: boolean;
}
