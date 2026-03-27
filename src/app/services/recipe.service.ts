import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    {
      id: 1,
      title: 'Avocado Toast',
      category: 'Breakfast',
      prepTime: 10,
      calories: 250,
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8',
      ingredients: [{ name: 'Avocado', amount: '1' }, { name: 'Bread', amount: '2 slices' }],
      instructions: ['Toast the bread', 'Mash avocado', 'Spread on toast'],
      isFavorite: false
    },
    {
      id: 2,
      title: 'Quinoa Salad',
      category: 'Lunch',
      prepTime: 20,
      calories: 400,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
      ingredients: [{ name: 'Quinoa', amount: '1 cup' }, { name: 'Cucumber', amount: '1/2' }],
      instructions: ['Cook quinoa', 'Chop veggies', 'Mix together'],
      isFavorite: true
    }
  ];

  private recipeSubject = new BehaviorSubject<Recipe[]>(this.recipes);
  recipes$ = this.recipeSubject.asObservable();

  toggleFavorite(id: number) {
    this.recipes = this.recipes.map(r => r.id === id ? { ...r, isFavorite: !r.isFavorite } : r);
    this.recipeSubject.next(this.recipes);
  }

  getRecipesByCategory(category: string): Observable<Recipe[]> {
    return of(this.recipes.filter(r => r.category === category));
  }
}
