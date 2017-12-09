import { Component, OnInit } from '@angular/core';
import { PokeapiService } from "../services/pokeapi.service";
import 'rxjs/add/operator/map';

declare var $:any;


@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.css']
})
export class PokemonSearchComponent implements OnInit {
//first function 
  query: any;
  searchedData: any = {};
  imgData: string;
  abilities: any[];
  types: any[];
  moves: any[];
  type: string;

  nameList: any[];
  abilityList: any[];


  entryDesc: string;
  shape: string;
  habitat: string;
  
  url: string;
  imageUrl;



  offset: number = 0;
  picID;
  constructor(private _pokeapiService: PokeapiService){}
  searchPokemon(query) {
    console.log(query)
    return this._pokeapiService.getPokemon(query).subscribe(
      data => {
        console.log(data);
        this.searchedData = data;
        if (data.id <=9) {
          this.picID = "00"+data.id;
        }else if(data.id <=99){
          this.picID = "0"+data.id;
        }else{
          this.picID= data.id;
        }
        this.imageUrl = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/"+this.picID +".png";
       // console.log(this.imageUrl);
        this.imgData = this.searchedData.sprites.front_default;
        this.abilities = this.searchedData.abilities;
        this.types = this.searchedData.types;
        this.moves = this.searchedData.moves;
        // console.log(this.abilities)
        this.type = (this.types[0].type.name);
        this.description(data.species.url);
      },
      error => console.log(error),
      () => {
        // console.log("Request complete");
      }
    )


  }
 
  

  description(data) {
    this._pokeapiService.getPokeData(data).subscribe(
      data => {
        // console.log(data);
        // this.desc = data;
        this.shape = data.shape.name;
        if (data.habitat == null) {
          this.habitat = "none";
        } else {
          this.habitat = data.habitat.name;
        };
        let entries = data.flavor_text_entries
        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i];

          if (entry.language.name === 'en') {
            this.entryDesc = entry.flavor_text;
            break;
          }
        }

      }

    )
  }

  defaultPage() {
    return this._pokeapiService.defaultPage(this.offset).subscribe(
      data => {
        this.showPokemons(data);
        // console.log(data);
      },
      error => console.log(error))
  }

  showPokemons(pokeList) {
    var nameList = [];
    pokeList.results.map(data => {
    // console.log(data);
    // nameList.push(data.url)
    this._pokeapiService.getPokeData(data.url).subscribe(
       data => {
        nameList.push(data);
       }
      );
    });
    this.nameList = nameList;
    // console.log(this.nameList)
    // console.log(this.names)
  }

  getStyle(type) {
    if (type == "poison") {
      return "#A040A0";
    } else if (type == "grass") {
      return "#78C850";
    } else if (type == "fire") {
      return "#F08030";
    } else if (type == "flying") {
      return "#A890F0";
    } else if (type == "water") {
      return "#6890F0";
    } else if (type == "bug") {
      return "#A8B820";
    } else if (type == "normal") {
      return "#A8A878";
    } else if (type == "dark") {
      return "#705848";
    } else if (type == "electric") {
      return "#F8D030";
    } else if (type == "psychic") {
      return "#F85888";
    } else if (type == "ground") {
      return "#E0C068";
    } else if (type == "ice") {
      return "#98D8D8";
    } else if (type == "steel") {
      return "#B8B8D0";
    } else if (type == "fairly") {
      return "#EE99AC";
    } else if (type == "rock") {
      return "#B8A038";
    } else if (type == "fighting") {
      return "#C03028";
    } else if (type == "dragon") {
      return "#7038F8";
    } else if (type == "ghost") {
      return "#705898";
    }
  }

  pokeDetails(name) {
// console.log(name);
    this.searchPokemon(name)

  }

  nextPage() {
    this.offset += 20;
    var pageData = this.defaultPage();
    this.showPokemons(pageData);
  }

  prevPage() {
    this.offset -= 20;
    this.defaultPage()
  }

  ngOnInit() {
    this.defaultPage()
    if(this.query == undefined){
      this.query = Math.floor(Math.random() * (800 - 1 + 1) + 1);
    };
    this.searchPokemon(this.query)


    $('#top').click(function(){
      $("html,body").animate({scrollTop:0}, "slow");
      return false;
    });
  }
}
