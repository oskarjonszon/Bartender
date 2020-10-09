import { Component, OnInit } from '@angular/core';


interface Ingredient 
{
  id : number,
  name : string,
  amount : string,
  measurement : string, 
}

@Component({
  selector: 'app-add-drink',
  templateUrl: './add-drink.component.html',
  styleUrls: ['./add-drink.component.scss']
})

export class AddDrinkComponent implements OnInit 
{
  bases : Ingredient[] = [];
  flavourings : Ingredient[] = [];
  name : string;
  description : string;
  measurements : string[] = ["Parts", "Litre", "Decilitre","Centilitre", "Mililitre", "Ounce", "Tablespoon", "Teaspoon", "Gram"];

  constructor() {}

  ngOnInit(): void 
  {
    this.addBase();
    this.addFlavouring();
  }

  onSubmit()
  {
    var data = {
      name : this.name,
      description : this.description,
      bases : this.bases,
      flavourings : this.flavourings
    }
    //TODO: POST data to backend. 
    console.log(data);
  }

  addBase()
  {
    this.bases.push({id: this.bases.length + 1, name : "", amount : "", measurement : ""});
  }

  removeBase(index : number)
  {
    this.bases.splice(index, 1);
  }
  
  addFlavouring()
  {
    this.flavourings.push({id: this.flavourings.length + 1, name : "", amount : "", measurement : ""});
  }

  removeFlavouring(index : number)
  {
    this.flavourings.splice(index, 1);
  }
}
