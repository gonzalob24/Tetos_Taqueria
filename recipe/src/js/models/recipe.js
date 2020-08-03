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

  parseIngredients() {
    const unitsFullName = [
      "tablespoons",
      "tablespoon",
      "ounces",
      "ounce",
      "teaspoons",
      "teaspoon",
      "cups",
      "pounds",
    ];
    const unitsShortName = [
      "tbsp",
      "tbsp",
      "oz",
      "oz",
      "tsp",
      "tsp",
      "cup",
      "pound",
    ];
    const units = [...unitsShortName, "kg", "g"];
    const newIngredients = this.ingredients.map((value) => {
      // same units in recipe
      let ingredient = value.toLowerCase();
      unitsFullName.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShortName[i]);
      });

      // remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

      // Parse Ingredients int count, unit and ingredient
      const arrIng = ingredient.split(" ");
      const unitIndex = arrIng.findIndex((el) => units.includes(el));

      let objIngredient;
      if (unitIndex > -1) {
        // There is a unit
        const arrCount = arrIng.slice(0, unitIndex);
        let count;
        if (arrCount.length === 1) {
          count = eval(arrIng[0].replace("-", "+"));
        } else {
          count = eval(arrIng.slice(0, unitIndex).join("+"));
        }

        objIngredient = {
          count: count,
          units: arrIng[unitIndex],
          ingredients: arrIng.slice(unitIndex + 1).join(" "),
        };
      } else if (parseInt(arrIng[0], 10)) {
        // There is no unit but the 1st element is a number
        objIngredient = {
          count: parseInt(arrIng[0], 10),
          units: "",
          ingredients: arrIng.slice(1).join(" "),
        };
      } else if (unitIndex === -1) {
        // There is no unit and no number in 1st position
        objIngredient = {
          count: 1,
          units: "",
          ingredients: ingredient,
        };
      }
      // console.log(arrIng);

      return objIngredient;
    });
    this.ingredients = newIngredients;
  }
}
