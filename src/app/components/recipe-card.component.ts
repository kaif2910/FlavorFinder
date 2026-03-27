import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../models/recipe.model';
import { ImageFallbackDirective } from '../directives/image-fallback.directive';
import { DurationPipe } from '../pipes/duration.pipe';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule, ImageFallbackDirective, DurationPipe],
  template: `
    <div class="card">
      <div class="img-container">
        <img [src]="recipe.image" appImageFallback [alt]="recipe.title">
        <button class="fav-btn" (click)="onFavorite.emit(recipe.id)" [class.active]="recipe.isFavorite">
          {{ recipe.isFavorite ? '♥' : '♡' }}
        </button>
      </div>
      <div class="card-body">
        <span class="category">{{ recipe.category }}</span>
        <h3>{{ recipe.title }}</h3>
        <div class="meta">
          <span>⏱ {{ recipe.prepTime | duration }}</span>
          <span>🔥 {{ recipe.calories }} kcal</span>
        </div>
        <button class="view-btn" (click)="onView.emit(recipe)">View Recipe</button>
      </div>
    </div>
  `,
  styles: [`
    .card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.3s; }
    .card:hover { transform: translateY(-5px); }
    .img-container { position: relative; height: 180px; }
    img { width: 100%; height: 100%; object-fit: cover; }
    .fav-btn { position: absolute; top: 10px; right: 10px; background: white; border: none; border-radius: 50%; width: 32px; height: 32px; cursor: pointer; font-size: 1.2rem; display: flex; align-items: center; justify-content: center; color: #ff4757; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
    .fav-btn.active { background: #ff4757; color: white; }
    .card-body { padding: 1.2rem; }
    .category { color: #2ed573; font-size: 0.8rem; font-weight: bold; text-transform: uppercase; }
    h3 { margin: 0.5rem 0; font-size: 1.2rem; color: #2f3542; }
    .meta { display: flex; gap: 1rem; color: #747d8c; font-size: 0.9rem; margin-bottom: 1rem; }
    .view-btn { width: 100%; background: #2f3542; color: white; border: none; padding: 0.8rem; border-radius: 6px; cursor: pointer; font-weight: bold; }
  `]
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
  @Output() onFavorite = new EventEmitter<number>();
  @Output() onView = new EventEmitter<Recipe>();
}
