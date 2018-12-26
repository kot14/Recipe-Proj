import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../recipes/shared/ingredient.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ingredients: Ingredient [];
  totalPrice = 0 ;
  constructor() { }

  ngOnInit() {
  }
  getTotalPrice(){
    this.ingredients.forEach(i => {
      this.totalPrice += i.price * i.amount
    });
    return this.totalPrice;
  }
}