import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';
import { RecipeService } from "../recipe.service";
import { Recipe } from "../recipe.model";
import { AuthService } from "src/app/auth/auth.service";

@Injectable()
export class DataStorageService {
    constructor(private http: Http, 
                private recipeService: RecipeService,
                private authService: AuthService) {}

    storeRecipes() {
    const token = this.authService.getToken()

    return  this.http.put('https://recipe-proj-a0d47.firebaseio.com/recipes.json?auth=' + token,
    this.recipeService.getRecipes());
    }

    getRecipes() {
        const token = this.authService.getToken()
        
        this.http.get('https://recipe-proj-a0d47.firebaseio.com/recipes.json?auth=' + token)
        .map(
            (response: Response) => {
                const recipes: Recipe[] = response.json();
                for (let recipe of recipes) {
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                    }
                }
                return recipes;
            }
        )
        .subscribe(
            (recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            }
        );
    }
}