import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import  { HttpModule } from '@angular/http';
import { Component, OnInit } from '@angular/core';

import { AppComponent } from './app.component';
import { PokemonSearchComponent } from "./pokemon-search/pokemon-search.component";
import { PokeapiService } from "./services/pokeapi.service";
import { CapitalizePipe } from './capitalize.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PokemonSearchComponent,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule

  ],
  providers: [PokeapiService],
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit { 
  constructor(private _pokeapiService: PokeapiService){}
  
  ngOnInit() {
    
  }

}
