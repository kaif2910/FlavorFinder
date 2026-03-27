import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/recipe.model';
import { RecipeCardComponent } from './recipe-card.component';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RecipeCardComponent],
  template: `
    <div class="app-shell">
      <nav>
        <h1>FlavorFinder</h1>
        <div class="search-box">
          <input type="text" [(ngModel)]="searchQuery" placeholder="Search recipes...">
        </div>
        <div class="filters">
          <button (click)="category = 'all'" [class.active]="category === 'all'">All</button>
          <button (click)="category = 'Breakfast'" [class.active]="category === 'Breakfast'">Breakfast</button>
          <button (click)="category = 'Lunch'" [class.active]="category === 'Lunch'">Lunch</button>
          <button (click)="category = 'Dinner'" [class.active]="category === 'Dinner'">Dinner</button>
          <button (click)="category = 'Dessert'" [class.active]="category === 'Dessert'">Dessert</button>
        </div>
      </nav>

      <main>
        <div class="grid">
          <app-recipe-card 
            *ngFor="let recipe of filteredRecipes$ | async" 
            [recipe]="recipe"
            (onFavorite)="toggleFavorite($event)"
            (onView)="selectedRecipe = $event">
          </app-recipe-card>
        </div>
        <div *ngIf="(filteredRecipes$ | async)?.length === 0" class="no-results">
          No recipes found matching your search.
        </div>

        <aside *ngIf="selectedRecipe" class="modal-overlay" (click)="selectedRecipe = null">
          <div class="modal-content" (click)="$event.stopPropagation()">
            <button class="close-btn" (click)="selectedRecipe = null">×</button>
            <img [src]="selectedRecipe.image" [alt]="selectedRecipe.title">
            <div class="details">
              <h2>{{ selectedRecipe.title }}</h2>
              <h3>Ingredients</h3>
              <ul>
                <li *ngFor="let ing of selectedRecipe.ingredients">
                  {{ ing.amount }} {{ ing.name }}
                </li>
              </ul>
              <h3>Instructions</h3>
              <ol>
                <li *ngFor="let step of selectedRecipe.instructions">{{ step }}</li>
              </ol>
            </div>
          </div>
        </aside>
      </main>

      <div class="notification" *ngIf="showToast">
        Recipe added to favorites!
      </div>
    </div>
  `,
  styles: [`
    .app-shell { font-family: 'Poppins', sans-serif; background: #f1f2f6; min-height: 100vh; }
    nav { background: white; padding: 1.5rem 3rem; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
    h1 { margin: 0; color: #ff4757; font-weight: 800; }
    .filters { display: flex; gap: 1rem; }
    .filters button { background: none; border: 1px solid #ddd; padding: 0.5rem 1.2rem; border-radius: 20px; cursor: pointer; transition: 0.2s; }
    .filters button.active { background: #ff4757; color: white; border-color: #ff4757; }
    main { padding: 2rem 3rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; }
    
    .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .modal-content { background: white; width: 90%; max-width: 800px; max-height: 90vh; border-radius: 15px; overflow-y: auto; position: relative; }
    .modal-content img { width: 100%; height: 300px; object-fit: cover; }
    .details { padding: 2rem; }
    .close-btn { position: absolute; top: 15px; right: 15px; font-size: 2rem; background: rgba(0,0,0,0.5); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; }
    .search-box input { padding: 0.6rem 1.2rem; border-radius: 25px; border: 1px solid #ddd; width: 300px; outline: none; }
    .search-box input:focus { border-color: #ff4757; }
    .no-results { text-align: center; padding: 3rem; color: #747d8c; font-size: 1.2rem; grid-column: 1 / -1; }
    .notification { position: fixed; bottom: 20px; right: 20px; background: #2ed573; color: white; padding: 1rem 2rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); animation: slideIn 0.3s ease-out; }
  `]
})
export class RecipeListComponent {
  category = 'all';
  searchQuery = '';
  selectedRecipe: Recipe | null = null;
  showToast = false;

  constructor(public recipeService: RecipeService) {}

  toggleFavorite(id: number) {
    this.recipeService.toggleFavorite(id);
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }

  get filteredRecipes$(): Observable<Recipe[]> {
    return this.recipeService.recipes$.pipe(
      map((recipes: Recipe[]) => {
        let filtered = recipes;
        if (this.category !== 'all') {
          filtered = filtered.filter(r => r.category === this.category);
        }
        if (this.searchQuery) {
          const query = this.searchQuery.toLowerCase();
          filtered = filtered.filter(r => 
            r.title.toLowerCase().includes(query) || 
            r.ingredients.some(i => i.name.toLowerCase().includes(query))
          );
        }
        return filtered;
      })
    );
  }
}
