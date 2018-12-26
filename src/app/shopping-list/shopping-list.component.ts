import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../recipes/shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient [];
  totalPrice = 0 ;
  reset = 0;
  private subscription: Subscription;
  constructor(private slService: ShoppingListService) { }
  
  ngOnInit() {
    this.ingredients = this.slService.getIngedients();
    this.subscription = this.slService.ingredientsChanged
      .subscribe(
        (ingredients:Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }
  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getTotalPrice(){
    this.ingredients.forEach(i => {
      this.totalPrice += i.price * i.amount
    });
    return this.totalPrice;
  }

  onReset(){
    this.totalPrice
  }

}
