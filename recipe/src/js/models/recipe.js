import axios from "axios";
import { key, proxy } from "../config";

export default class Recipe {
  constructor(id) {
    this.id = id; // based on the id i can do the ajax call
  }

  async getRecipe() {
    try {
      const results = await axios(
        `https://forkify-api.herokuapp.com/api/get?rId=${this.id}`
      );
      this.title = results.data.recipe.title;
      this.author = results.data.recipe.publisher;
      this.image = results.data.recipe.image_url;
      this.url = results.data.recipe.source_url;
      this.ingredients = results.data.recipe.ingredients;
      console.log(results);
    } catch (error) {
      alert("Something went wrong :(");
    }
  }
  calcTime() {
    // Assuming that you need aout 15 minutes for each 3 ingredients
    const number_ingredients = this.ingredients.length;
    const periods = Math.ceil(number_ingredients / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }
}
