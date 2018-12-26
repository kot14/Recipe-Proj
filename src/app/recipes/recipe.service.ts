import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import { Ingredient } from './shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class RecipeService {
recipesChanged = new Subject<Recipe[]>();

  private  recipes: Recipe [] = [
        new Recipe('A test recipe',
        'This is simply test',
        'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F5864318.jpg&w=1200&h=1200&c=sc&poi=face&q=85',
        [
            new Ingredient('light rye flour',2,1),
            new Ingredient('bread flour',2,2),
            new Ingredient('butter milk',1,3),
            new Ingredient('tablespoon caraway seeds',2,4)
        ]),
    
        new Recipe('Another test recipe',
        'This is simply test',
        'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
        [
            new Ingredient('Another-One',1,1),
            new Ingredient('Another-Two',2,2)
        ])
      ];

      constructor (private slService: ShoppingListService) {}

      setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }

      getRecipes() {
          return this.recipes.slice();
      }
      getRecipe(index: number) {
        return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number,newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      }
}