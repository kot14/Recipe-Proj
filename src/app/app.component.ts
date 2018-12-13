import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls:    ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyDoP4NfMsqZdE23mNSfOb8zor60bCUOYag",
      authDomain: "recipe-proj-a0d47.firebaseapp.com"  
    });
  }
  
  onNavigate(feature:string) {
    this.loadedFeature = feature;
  }
}
