import type { RecipeInterface,IngredientInterface } from "../types/recipes";

export const recipeMock: RecipeInterface[] = [
    {
      id: 1,
      title: "Sushi Rolls",
      image: "https://unsplash.com/it/foto/tavolo-bianco-AzHohzX6h_M",
      imageType: "jpg",
      servings: 2,
      readyInMinutes: 45,
      cookingMinutes: 30,
      preparationMinutes: 15,
      cuisines: ["Japanese"],
      dishTypes: ["lunch", "main course"],
      extendedIngredients: [
        { aisle: "Seafood", amount: 200, consistency: "solid", id: 15000, image: "salmon.jpg", measures: {metric: {amount: 200, unitLong: "grams", unitShort: "g"}, us: {amount: 7, unitLong: "ounces", unitShort: "oz"}}, meta: ["raw"], name: "salmon fillet", original: "200g salmon fillet, raw", originalName: "salmon fillet", unit: "g" },
        { aisle: "Pasta and Rice", amount: 150, consistency: "solid", id: 20052, image: "white-rice.jpg", measures: {metric: {amount: 150, unitLong: "grams", unitShort: "g"}, us: {amount: 5.3, unitLong: "ounces", unitShort: "oz"}}, name: "sushi rice", original: "150g sushi rice", originalName: "sushi rice", unit: "g" },
        { aisle: "Produce", amount: 1, consistency: "solid", id: 11457, image: "cucumber.jpg", measures: {metric: {amount: 1, unitLong: "", unitShort: ""}, us: {amount: 1, unitLong: "", unitShort: ""}}, meta: ["julienned"], name: "cucumber", original: "1 cucumber, julienned", originalName: "cucumber", unit: "" },
        { aisle: "Algae", amount: 2, consistency: "solid", id: 11451, image: "nori.jpg", measures: {metric: {amount: 2, unitLong: "sheets", unitShort: "sheets"}, us: {amount: 2, unitLong: "sheets", unitShort: "sheets"}}, name: "nori sheets", original: "2 nori sheets", originalName: "nori sheets", unit: "sheets" }
      ],
      summary: "Classic Japanese sushi rolls with salmon, rice, cucumber, and nori.",
      winePairing: null
    },
    {
      id: 2,
      title: "Chicken Tikka Masala",
      image: "https://unsplash.com/it/foto/tavolo-bianco-AzHohzX6h_M",
      imageType: "jpg",
      servings: 4,
      readyInMinutes: 60,
      cookingMinutes: 40,
      preparationMinutes: 20,
      cuisines: ["Indian"],
      dishTypes: ["dinner", "main course"],
      extendedIngredients: [
        { aisle: "Meat", amount: 500, consistency: "solid", id: 5050, image: "chicken-breast.jpg", measures: {metric: {amount: 500, unitLong: "grams", unitShort: "g"}, us: {amount: 17.6, unitLong: "ounces", unitShort: "oz"}}, name: "chicken breast", original: "500g boneless chicken breast", originalName: "chicken breast", unit: "g" },
        { aisle: "Spices and Seasonings", amount: 2, consistency: "solid", id: 2025, image: "garam-masala.jpg", measures: {metric: {amount: 2, unitLong: "tsp", unitShort: "tsp"}, us: {amount: 2, unitLong: "tsp", unitShort: "tsp"}}, name: "garam masala", original: "2 tsp garam masala", originalName: "garam masala", unit: "tsp" },
        { aisle: "Produce", amount: 1, consistency: "solid", id: 11529, image: "tomato.jpg", measures: {metric: {amount: 1, unitLong: "", unitShort: ""}, us: {amount: 1, unitLong: "", unitShort: ""}}, name: "tomato", original: "1 tomato, diced", originalName: "tomato", unit: "" },
        { aisle: "Milk, Eggs, Other Dairy", amount: 150, consistency: "liquid", id: 1077, image: "cream.jpg", measures: {metric: {amount: 150, unitLong: "ml", unitShort: "ml"}, us: {amount: 5, unitLong: "oz", unitShort: "oz"}}, name: "cream", original: "150ml cream", originalName: "cream", unit: "ml"}
      ],
      summary: "Tender chicken in creamy and spicy tomato sauce, a popular Indian dish.",
      winePairing: null
    },
    {
      id: 3,
      title: "Pad Thai",
      image: "https://unsplash.com/it/foto/tavolo-bianco-AzHohzX6h_M",
      imageType: "jpg",
      servings: 2,
      readyInMinutes: 35,
      cookingMinutes: 20,
      preparationMinutes: 15,
      cuisines: ["Thai"],
      dishTypes: ["main course", "dinner"],
      extendedIngredients: [
        { aisle: "Pasta and Rice", amount: 150, consistency: "solid", id: 20040, image: "rice-noodles.jpg", measures: {metric: {amount: 150, unitLong: "grams", unitShort: "g"}, us: {amount: 5.3, unitLong: "oz", unitShort: "oz"}}, name: "rice noodles", original: "150g rice noodles", originalName: "rice noodles", unit: "g" },
        { aisle: "Meat", amount: 150, consistency: "solid", id: 5062, image: "shrimp.jpg", measures: {metric: {amount: 150, unitLong: "grams", unitShort: "g"}, us: {amount: 5.3, unitLong: "oz", unitShort: "oz"}}, name: "shrimp", original: "150g shrimp, peeled", originalName: "shrimp", unit: "g" },
        { aisle: "Produce", amount: 2, consistency: "solid", id: 11215, image: "garlic.jpg", measures: {metric: {amount: 2, unitLong: "cloves", unitShort: "cloves"}, us: {amount: 2, unitLong: "cloves", unitShort: "cloves"}}, name: "garlic", original: "2 cloves garlic, minced", originalName: "garlic", unit: "cloves" },
        { aisle: "Produce", amount: 1, consistency: "solid", id: 11282, image: "onion.jpg", measures: {metric: {amount: 1, unitLong: "", unitShort: ""}, us: {amount: 1, unitLong: "", unitShort: ""}}, name: "onion", original: "1 small onion, chopped", originalName: "onion", unit: "" }
      ],
      summary: "Classic Thai stir-fried noodles with shrimp, garlic, onion, and eggs.",
      winePairing: null
    },
    {
      id: 4,
      title: "Beef Tacos",
      image: "https://unsplash.com/it/foto/tavolo-bianco-AzHohzX6h_M",
      imageType: "jpg",
      servings: 4,
      readyInMinutes: 30,
      cookingMinutes: 15,
      preparationMinutes: 15,
      cuisines: ["Mexican"],
      dishTypes: ["lunch", "main course"],
      extendedIngredients: [
        { aisle: "Meat", amount: 300, consistency: "solid", id: 23572, image: "ground-beef.jpg", measures: {metric: {amount: 300, unitLong: "grams", unitShort: "g"}, us: {amount: 10.6, unitLong: "oz", unitShort: "oz"}}, name: "ground beef", original: "300g ground beef", originalName: "ground beef", unit: "g" },
        { aisle: "Produce", amount: 1, consistency: "solid", id: 11529, image: "tomato.jpg", measures: {metric: {amount: 1, unitLong: "", unitShort: ""}, us: {amount: 1, unitLong: "", unitShort: ""}}, name: "tomato", original: "1 tomato, diced", originalName: "tomato", unit: "" },
        { aisle: "Produce", amount: 1, consistency: "solid", id: 11282, image: "onion.jpg", measures: {metric: {amount: 1, unitLong: "", unitShort: ""}, us: {amount: 1, unitLong: "", unitShort: ""}}, name: "onion", original: "1 onion, chopped", originalName: "onion", unit: "" },
        { aisle: "Bread", amount: 8, consistency: "solid", id: 18371, image: "tortilla.jpg", measures: {metric: {amount: 8, unitLong: "pieces", unitShort: "pcs"}, us: {amount: 8, unitLong: "pieces", unitShort: "pcs"}}, name: "taco shells", original: "8 taco shells", originalName: "taco shells", unit: "pcs"}
      ],
      summary: "Mexican-style beef tacos served with tomatoes, onions, and fresh taco shells.",
      winePairing: null
    },
    {
      id: 5,
      title: "Moroccan Couscous",
      image: "https://unsplash.com/it/foto/tavolo-bianco-AzHohzX6h_M",
      imageType: "jpg",
      servings: 4,
      readyInMinutes: 30,
      cookingMinutes: 10,
      preparationMinutes: 20,
      cuisines: ["Moroccan"],
      dishTypes: ["main course"],
      extendedIngredients: [
        { aisle: "Pasta and Rice", amount: 250, consistency: "solid", id: 20028, image: "couscous.jpg", measures: {metric: {amount: 250, unitLong: "grams", unitShort: "g"}, us: {amount: 8.8, unitLong: "oz", unitShort: "oz"}}, name: "couscous", original: "250g couscous", originalName: "couscous", unit: "g" },
        { aisle: "Spices and Seasonings", amount: 1, consistency: "solid", id: 2025, image: "cumin.jpg", measures: {metric: {amount: 1, unitLong: "tsp", unitShort: "tsp"}, us: {amount: 1, unitLong: "tsp", unitShort: "tsp"}}, name: "cumin", original: "1 tsp ground cumin", originalName: "cumin", unit: "tsp" },
        { aisle: "Produce", amount: 1, consistency: "solid", id: 11282, image: "onion.jpg", measures: {metric: {amount: 1, unitLong: "", unitShort: ""}, us: {amount: 1, unitLong: "", unitShort: ""}}, name: "onion", original: "1 onion, chopped", originalName: "onion", unit: "" },
        { aisle: "Produce", amount: 2, consistency: "solid", id: 11549, image: "carrot.jpg", measures: {metric: {amount: 2, unitLong: "", unitShort: ""}, us: {amount: 2, unitLong: "", unitShort: ""}}, name: "carrots", original: "2 carrots, diced", originalName: "carrots", unit: "" }
      ],
      summary: "North African couscous with vegetables and fragrant spices.",
      winePairing: null
    },
    {
      id: 6,
      title: "Falafel Wrap",
      image: "https://unsplash.com/it/foto/tavolo-bianco-AzHohzX6h_M",
      imageType: "jpg",
      servings: 2,
      readyInMinutes: 25,
      cookingMinutes: 10,
      preparationMinutes: 15,
      cuisines: ["Middle Eastern"],
      dishTypes: ["lunch", "main course"],
      extendedIngredients: [
        { aisle: "Canned and Jarred", amount: 400, consistency: "solid", id: 16057, image: "chickpeas.jpg", measures: {metric: {amount: 400, unitLong: "grams", unitShort: "g"}, us: {amount: 14.1, unitLong: "oz", unitShort: "oz"}}, name: "chickpeas", original: "400g canned chickpeas", originalName: "chickpeas", unit: "g" },
        { aisle: "Produce", amount: 1, consistency: "solid", id: 11216, image: "garlic.jpg", measures: {metric: {amount: 1, unitLong: "cloves", unitShort: "cloves"}, us: {amount: 1, unitLong: "cloves", unitShort: "cloves"}}, name: "garlic", original: "1 clove garlic", originalName: "garlic", unit: "cloves" },
        { aisle: "Produce", amount: 1, consistency: "solid", id: 11156, image: "parsley.jpg", measures: {metric: {amount: 1, unitLong: "bunch", unitShort: "bunch"}, us: {amount: 1, unitLong: "bunch", unitShort: "bunch"}}, name: "parsley", original: "1 bunch fresh parsley", originalName: "parsley", unit: "bunch" },
        { aisle: "Bread", amount: 2, consistency: "solid", id: 18375, image: "pita.jpg", measures: {metric: {amount: 2, unitLong: "pieces", unitShort: "pcs"}, us: {amount: 2, unitLong: "pieces", unitShort: "pcs"}}, name: "pita bread", original: "2 pita breads", originalName: "pita breads", unit: "pcs" }
      ],
      summary: "Middle Eastern falafel wraps with chickpeas, parsley, and garlic.",
      winePairing: null
    },
    {
      id: 7,
      title: "Spaghetti Carbonara",
      image: "https://unsplash.com/it/foto/tavolo-bianco-AzHohzX6h_M",
      imageType: "jpg",
      servings: 2,
      readyInMinutes: 20,
      cookingMinutes: 15,
      preparationMinutes: 5,
      cuisines: ["Italian"],
      dishTypes: ["lunch", "main course"],
      extendedIngredients: [
        { aisle: "Pasta and Rice", amount: 180, consistency: "solid", id: 20420, image: "spaghetti.jpg", measures: {metric: {amount: 180, unitLong: "grams", unitShort: "g"}, us: {amount: 6.3, unitLong: "oz", unitShort: "oz"}}, name: "spaghetti", original: "180g spaghetti", originalName: "spaghetti", unit: "g" },
        { aisle: "Meat", amount: 80, consistency: "solid", id: 10123, image: "pancetta.jpg", measures: {metric: {amount: 80, unitLong: "grams", unitShort: "g"}, us: {amount: 2.8, unitLong: "oz", unitShort: "oz"}}, name: "pancetta", original: "80g pancetta, diced", originalName: "pancetta", unit: "g" },
        { aisle: "Milk, Eggs, Other Dairy", amount: 2, consistency: "solid", id: 1123, image: "egg.jpg", measures: {metric: {amount: 2, unitLong: "pieces", unitShort: "pcs"}, us: {amount: 2, unitLong: "pieces", unitShort: "pcs"}}, name: "eggs", original: "2 eggs", originalName: "eggs", unit: "pcs" },
        { aisle: "Cheese", amount: 50, consistency: "solid", id: 1033, image: "parmesan.jpg", measures: {metric: {amount: 50, unitLong: "grams", unitShort: "g"}, us: {amount: 1.8, unitLong: "oz", unitShort: "oz"}}, name: "parmesan cheese", original: "50g grated parmesan", originalName: "parmesan cheese", unit: "g" }
      ],
      summary: "Classic creamy spaghetti carbonara with eggs, pancetta, and parmesan.",
      winePairing: null
    },
    {
      id: 8,
      title: "Greek Salad",
      image: "https://unsplash.com/it/foto/tavolo-bianco-AzHohzX6h_M",
      imageType: "jpg",
      servings: 4,
      readyInMinutes: 10,
      cookingMinutes: 0,
      preparationMinutes: 10,
      cuisines: ["Greek"],
      dishTypes: ["salad", "side dish"],
      extendedIngredients: [
        { aisle: "Produce", amount: 2, consistency: "solid", id: 11529, image: "tomato.jpg", measures: {metric: {amount: 2, unitLong: "", unitShort: ""}, us: {amount: 2, unitLong: "", unitShort: ""}}, name: "tomatoes", original: "2 tomatoes, chopped", originalName: "tomatoes", unit: "" },
        { aisle: "Produce", amount: 1, consistency: "solid", id: 11477, image: "cucumber.jpg", measures: {metric: {amount: 1, unitLong: "", unitShort: ""}, us: {amount: 1, unitLong: "", unitShort: ""}}, name: "cucumber", original: "1 cucumber, chopped", originalName: "cucumber", unit: "" },
        { aisle: "Cheese", amount: 100, consistency: "solid", id: 1019, image: "feta.jpg", measures: {metric: {amount: 100, unitLong: "grams", unitShort: "g"}, us: {amount: 3.5, unitLong: "oz", unitShort: "oz"}}, name: "feta cheese", original: "100g feta cheese", originalName: "feta cheese", unit: "g" },
        { aisle: "Oil, Vinegar, Salad Dressing", amount: 2, consistency: "liquid", id: 1002044, image: "olive-oil.jpg", measures: {metric: {amount: 2, unitLong: "tbsp", unitShort: "tbsp"}, us: {amount: 2, unitLong: "tbsp", unitShort: "tbsp"}}, name: "olive oil", original: "2 tbsp olive oil", originalName: "olive oil", unit: "tbsp"}
      ],
      summary: "Healthy Greek salad with tomatoes, cucumbers, feta, and olive oil.",
      winePairing: null
    },
    {
      id: 9,
      title: "French Onion Soup",
      image: "https://unsplash.com/it/foto/tavolo-bianco-AzHohzX6h_M",
      imageType: "jpg",
      servings: 4,
      readyInMinutes: 50,
      cookingMinutes: 40,
      preparationMinutes: 10,
      cuisines: ["French"],
      dishTypes: ["soup", "starter"],
      extendedIngredients: [
        { aisle: "Produce", amount: 4, consistency: "solid", id: 11282, image: "onion.jpg", measures: {metric: {amount: 4, unitLong: "", unitShort: ""}, us: {amount: 4, unitLong: "", unitShort: ""}}, name: "onions", original: "4 onions, sliced", originalName: "onions", unit: "" },
        { aisle: "Oil, Vinegar, Salad Dressing", amount: 3, consistency: "liquid", id: 1002044, image: "olive-oil.jpg", measures: {metric: {amount: 3, unitLong: "tbsp", unitShort: "tbsp"}, us: {amount: 3, unitLong: "tbsp", unitShort: "tbsp"}}, name: "olive oil", original: "3 tbsp olive oil", originalName: "olive oil", unit: "tbsp" },
        { aisle: "Cheese", amount: 50, consistency: "solid", id: 1041009, image: "cheese.jpg", measures: {metric: {amount: 50, unitLong: "grams", unitShort: "g"}, us: {amount: 1.8, unitLong: "oz", unitShort: "oz"}}, name: "grated cheese", original: "50g grated cheese", originalName: "grated cheese", unit: "g" },
        { aisle: "Bread", amount: 4, consistency: "solid", id: 18064, image: "baguette.jpg", measures: {metric: {amount: 4, unitLong: "slices", unitShort: "slices"}, us: {amount: 4, unitLong: "slices", unitShort: "slices"}}, name: "baguette", original: "4 baguette slices", originalName: "baguette", unit: "slices"}
      ],
      summary: "French onion soup with caramelized onions, bread, and cheesy topping.",
      winePairing: null
    },
    {
      id: 10,
      title: "American Cheeseburger",
      image: "https://unsplash.com/it/foto/tavolo-bianco-AzHohzX6h_M",
      imageType: "jpg",
      servings: 2,
      readyInMinutes: 20,
      cookingMinutes: 10,
      preparationMinutes: 10,
      cuisines: ["American"],
      dishTypes: ["lunch", "main course"],
      extendedIngredients: [
        { aisle: "Meat", amount: 250, consistency: "solid", id: 23572, image: "ground-beef.jpg", measures: {metric: {amount: 250, unitLong: "grams", unitShort: "g"}, us: {amount: 8.8, unitLong: "oz", unitShort: "oz"}}, name: "ground beef", original: "250g ground beef", originalName: "ground beef", unit: "g" },
        { aisle: "Cheese", amount: 2, consistency: "solid", id: 1041009, image: "cheddar-cheese.png", measures: {metric: {amount: 2, unitLong: "slices", unitShort: "slices"}, us: {amount: 2, unitLong: "slices", unitShort: "slices"}}, name: "cheddar cheese", original: "2 slices cheddar cheese", originalName: "cheddar cheese", unit: "slices" },
        { aisle: "Bread", amount: 2, consistency: "solid", id: 18350, image: "burger-bun.jpg", measures: {metric: {amount: 2, unitLong: "pieces", unitShort: "pcs"}, us: {amount: 2, unitLong: "pieces", unitShort: "pcs"}}, name: "burger buns", original: "2 burger buns", originalName: "burger buns", unit: "pcs" },
        { aisle: "Produce", amount: 1, consistency: "solid", id: 11233, image: "lettuce.jpg", measures: {metric: {amount: 1, unitLong: "leaf", unitShort: "leaf"}, us: {amount: 1, unitLong: "leaf", unitShort: "leaf"}}, name: "lettuce", original: "1 leaf lettuce", originalName: "lettuce", unit: "leaf"}
      ],
      summary: "American-style beef cheeseburger with cheddar, lettuce, and fresh buns.",
      winePairing: null
    }
];
  

export const ingredients: IngredientInterface[] = [
    {
      aisle: "Meat",
      amount: 500,
      consistency: "solid",
      id: 5050,
      image: "chicken-breast.jpg",
      measures: {
        metric: { amount: 500, unitLong: "grams", unitShort: "g" },
        us: { amount: 17.6, unitLong: "ounces", unitShort: "oz" }
      },
      meta: ["boneless"],
      name: "chicken breast",
      original: "500g boneless chicken breast",
      originalName: "chicken breast",
      unit: "g"
    },
    {
      aisle: "Produce",
      amount: 1,
      consistency: "solid",
      id: 11457,
      image: "cucumber.jpg",
      measures: {
        metric: { amount: 1, unitLong: "", unitShort: "" },
        us: { amount: 1, unitLong: "", unitShort: "" }
      },
      meta: ["chopped"],
      name: "cucumber",
      original: "1 cucumber, chopped",
      originalName: "cucumber",
      unit: ""
    },
    {
      aisle: "Pasta and Rice",
      amount: 150,
      consistency: "solid",
      id: 20052,
      image: "white-rice.jpg",
      measures: {
        metric: { amount: 150, unitLong: "grams", unitShort: "g" },
        us: { amount: 5.3, unitLong: "ounces", unitShort: "oz" }
      },
      meta: ["steamed"],
      name: "white rice",
      original: "150g white rice, steamed",
      originalName: "white rice",
      unit: "g"
    },
    {
      aisle: "Cheese",
      amount: 100,
      consistency: "solid",
      id: 1019,
      image: "feta.jpg",
      measures: {
        metric: { amount: 100, unitLong: "grams", unitShort: "g" },
        us: { amount: 3.5, unitLong: "oz", unitShort: "oz" }
      },
      meta: ["crumbled"],
      name: "feta cheese",
      original: "100g feta cheese, crumbled",
      originalName: "feta cheese",
      unit: "g"
    },
    {
      aisle: "Oil, Vinegar, Salad Dressing",
      amount: 2,
      consistency: "liquid",
      id: 1002044,
      image: "olive-oil.jpg",
      measures: {
        metric: { amount: 2, unitLong: "tbsp", unitShort: "tbsp" },
        us: { amount: 2, unitLong: "tbsp", unitShort: "tbsp" }
      },
      name: "olive oil",
      original: "2 tbsp olive oil",
      originalName: "olive oil",
      unit: "tbsp"
    },
    {
      aisle: "Pasta and Rice",
      amount: 180,
      consistency: "solid",
      id: 20420,
      image: "spaghetti.jpg",
      measures: {
        metric: { amount: 180, unitLong: "grams", unitShort: "g" },
        us: { amount: 6.3, unitLong: "oz", unitShort: "oz" }
      },
      name: "spaghetti",
      original: "180g spaghetti",
      originalName: "spaghetti",
      unit: "g"
    },
    {
      aisle: "Bread",
      amount: 4,
      consistency: "solid",
      id: 18064,
      image: "baguette.jpg",
      measures: {
        metric: { amount: 4, unitLong: "slices", unitShort: "slices" },
        us: { amount: 4, unitLong: "slices", unitShort: "slices" }
      },
      name: "baguette",
      original: "4 baguette slices",
      originalName: "baguette",
      unit: "slices"
    },
    {
      aisle: "Spices and Seasonings",
      amount: 2,
      consistency: "solid",
      id: 2025,
      image: "garam-masala.jpg",
      measures: {
        metric: { amount: 2, unitLong: "tsp", unitShort: "tsp" },
        us: { amount: 2, unitLong: "tsp", unitShort: "tsp" }
      },
      name: "garam masala",
      original: "2 tsp garam masala",
      originalName: "garam masala",
      unit: "tsp"
    },
    {
      aisle: "Produce",
      amount: 4,
      consistency: "solid",
      id: 11282,
      image: "onion.jpg",
      measures: {
        metric: { amount: 4, unitLong: "", unitShort: "" },
        us: { amount: 4, unitLong: "", unitShort: "" }
      },
      meta: ["sliced"],
      name: "onions",
      original: "4 onions, sliced",
      originalName: "onions",
      unit: ""
    },
    {
      aisle: "Canned and Jarred",
      amount: 400,
      consistency: "solid",
      id: 16057,
      image: "chickpeas.jpg",
      measures: {
        metric: { amount: 400, unitLong: "grams", unitShort: "g" },
        us: { amount: 14.1, unitLong: "oz", unitShort: "oz" }
      },
      meta: ["canned"],
      name: "chickpeas",
      original: "400g canned chickpeas",
      originalName: "chickpeas",
      unit: "g"
    }
  ];  

//* qui inserisco le ricette di fallback, ovvero le ricette statiche da usare finchè non collego l'api.
//* In questo modo posso gestirle in maniera modulare e molto più comoda

export const fallbackRecipe: RecipeInterface = {
    id: 1,
    title: "Sushi Rolls",
    image: "https://img.spoonacular.com/recipes/982365-556x370.jpg",
    imageType: "jpg",
    servings: 2,
    readyInMinutes: 45,
    cookingMinutes: 30,
    preparationMinutes: 15,
    cuisines: ["Japanese"],
    dishTypes: ["lunch", "main course"],
    extendedIngredients: [
      {
        aisle: "Seafood",
        amount: 200,
        consistency: "solid",
        id: 15000,
        image: "salmon.jpg",
        measures: {
          metric: { amount: 200, unitLong: "grammi", unitShort: "g" },
          us: { amount: 7, unitLong: "ounces", unitShort: "oz" },
        },
        meta: ["crudo"],
        name: "filetto di salmone",
        original: "200g filetto di salmone, crudo",
        originalName: "filetto di salmone",
        unit: "g",
      },
      {
        aisle: "Pasta and Rice",
        amount: 150,
        consistency: "solid",
        id: 20052,
        image: "white-rice.jpg",
        measures: {
          metric: { amount: 150, unitLong: "grammi", unitShort: "g" },
          us: { amount: 5.3, unitLong: "ounces", unitShort: "oz" },
        },
        meta: [],
        name: "riso per sushi",
        original: "150g riso per sushi",
        originalName: "riso per sushi",
        unit: "g",
      },
      {
        aisle: "Produce",
        amount: 1,
        consistency: "solid",
        id: 11457,
        image: "cucumber.jpg",
        measures: {
          metric: { amount: 1, unitLong: "", unitShort: "" },
          us: { amount: 1, unitLong: "", unitShort: "" },
        },
        meta: ["julienne"],
        name: "cetriolo",
        original: "1 cetriolo, tagliato a julienne",
        originalName: "cetriolo",
        unit: "",
      },
      {
        aisle: "Algae",
        amount: 2,
        consistency: "solid",
        id: 11451,
        image: "nori.jpg",
        measures: {
          metric: { amount: 2, unitLong: "fogli", unitShort: "fogli" },
          us: { amount: 2, unitLong: "sheets", unitShort: "sheets" },
        },
        meta: [],
        name: "fogli di nori",
        original: "2 fogli di nori",
        originalName: "fogli di nori",
        unit: "fogli",
      },
    ],
    summary: "Classici sushi roll giapponesi con salmone, riso, cetriolo e nori.",
    winePairing: null,
  };