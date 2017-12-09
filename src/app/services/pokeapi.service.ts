import { Injectable } from '@angular/core';
// import { environment } from '../../environments/environment';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PokeapiService {
  // private pokeURL: string = environment.POKE_API_URL;
  // private descURL: string =environment.DESC_API_URL;

  private POKE_API_URL: string =  'https://pokeapi.co/api/v2/pokemon/';
  private DESC_API_URL: string = 'https://pokeapi.co/api/v2/pokemon-species/';
  private pokeURL: string = this.POKE_API_URL;
  private descURL: string = this.DESC_API_URL;
  constructor( private _http: Http) { }

  getPokemon(poke){

    return this._http.get(this.pokeURL + poke ).map(res => res.json());

  }

  getPokeData(url){
    return this._http.get(url).map(res => res.json());
  }

  defaultPage(offset){
    return this._http.get(this.pokeURL + '?limit=20&offset=' +offset ).map(res => res.json());
  }



}
