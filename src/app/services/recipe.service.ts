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
    },
    {
      id: 3,
      title: 'Masala Dosa',
      category: 'Breakfast',
      prepTime: 30,
      calories: 350,
      image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976',
      ingredients: [{ name: 'Rice Batter', amount: '2 cups' }, { name: 'Potato Masala', amount: '1 cup' }],
      instructions: ['Spread batter on tawa', 'Add oil/ghee', 'Place potato filling', 'Fold and serve'],
      isFavorite: false
    },
    {
      id: 4,
      title: 'Paneer Tikka',
      category: 'Lunch',
      prepTime: 40,
      calories: 300,
      image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0',
      ingredients: [{ name: 'Paneer', amount: '250g' }, { name: 'Yogurt', amount: '1/2 cup' }, { name: 'Spices', amount: '2 tbsp' }],
      instructions: ['Marinate paneer and veggies', 'Skew them', 'Grill until charred', 'Serve with chutney'],
      isFavorite: false
    },
    {
      id: 5,
      title: 'Butter Chicken',
      category: 'Dinner',
      prepTime: 50,
      calories: 600,
      image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db',
      ingredients: [{ name: 'Chicken', amount: '500g' }, { name: 'Tomato Puree', amount: '1 cup' }, { name: 'Cream', amount: '1/4 cup' }],
      instructions: ['Cook chicken in spices', 'Prepare tomato gravy', 'Add cream and butter', 'Simmer and serve'],
      isFavorite: false
    },
    {
      id: 6,
      title: 'Gulab Jamun',
      category: 'Dessert',
      prepTime: 45,
      calories: 450,
      image: 'https://i0.wp.com/www.chitrasfoodbook.com/wp-content/uploads/2016/10/gulab-jamun-using-mix.jpg?w=1200&ssl=1',
      ingredients: [
        { name: 'Khoya/Mawa', amount: '200g' }, 
        { name: 'Maida', amount: '1/4 cup' },
        { name: 'Baking Soda', amount: '1 pinch' },
        { name: 'Sugar Syrup', amount: '2 cups' },
        { name: 'Cardamom', amount: '3-4 pods' }
      ],
      instructions: [
        'Mix khoya, maida, and baking soda to form a smooth dough',
        'Make small, crack-free balls from the dough',
        'Deep fry the balls in ghee or oil on low heat until dark golden brown',
        'Soak the fried balls in warm cardamom-infused sugar syrup for 2 hours',
        'Serve warm garnished with pistachios'
      ],
      isFavorite: false
    },
    {
      id: 7,
      title: 'Palak Paneer',
      category: 'Dinner',
      prepTime: 35,
      calories: 320,
      image: 'https://images.unsplash.com/photo-1613292443284-8d10ef9383fe',
      ingredients: [{ name: 'Spinach', amount: '500g' }, { name: 'Paneer', amount: '200g' }, { name: 'Spices', amount: '1 tbsp' }],
      instructions: ['Blanch spinach and puree it', 'Sauté spices and aromatics', 'Add spinach and paneer', 'Simmer for 10 mins'],
      isFavorite: false
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
