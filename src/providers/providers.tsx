import { UserStoreProvider } from "./user-store-provider";
import { IngredientStoreProvider } from "./ingredient-store-provider";
import { GroceryListStoreProvider } from "./grocery-list-store-provider";
import { RecipeStoreProvider } from "./recipe-store-provider";
import { PantryStoreProvider } from "./pantry-store-provider";
import { RouteDataFallback } from "@/components/route-data-fallback";
import { PropsWithChildren } from "react";
import { serverFetch } from "@/utils/server-actions/server-fetch";
import {
  GroceryList,
  Ingredient,
  PantryIngredient,
  Recipe,
  UserFormData,
} from "@/utils/interfaces";

export const Providers = async ({ children }: PropsWithChildren) => {
  // const headersList = await headers();
  // const pathname = headersList.get("X-Current-Path") || "";

  // const isHome =
  //   pathname === "/" || pathname === "" || pathname.startsWith("/ingredients");
  // const isIngredients = pathname.startsWith("/ingredients");
  // const isGroceries = pathname.startsWith("/groceries");
  // const isRecipes = pathname.startsWith("/recipes");

  const userInfo = await serverFetch<UserFormData>({ endpoint: "user" });

  // if (isHome || isIngredients) {
  const fetchedIngredients = await serverFetch<Ingredient[]>({
    endpoint: "ingredient",
  });
  const ingredients = fetchedIngredients ?? [];
  const ingredientsServerLoaded = fetchedIngredients !== null;
  // }

  // if (isGroceries) {
  const fetchedGroceryLists = await serverFetch<GroceryList[]>({
    endpoint: "grocery-list",
  });
  const groceryLists = fetchedGroceryLists ?? [];
  const groceryListsServerLoaded = fetchedGroceryLists !== null;
  // }

  // if (isRecipes) {
  const fetchedRecipes = await serverFetch<Recipe[]>({ endpoint: "recipe" });
  const recipes = fetchedRecipes ?? [];
  const recipesServerLoaded = fetchedRecipes !== null;
  // }

  const fetchedPantryIngredients = await serverFetch<PantryIngredient[]>({
    endpoint: "pantry",
  });

  const pantryIngredients = fetchedPantryIngredients ?? [];
  const pantryServerLoaded = fetchedPantryIngredients !== null;

  return (
    <UserStoreProvider userInfo={userInfo}>
      <IngredientStoreProvider
        ingredients={ingredients}
        ingredientsServerLoaded={ingredientsServerLoaded}
      >
        <GroceryListStoreProvider
          groceryLists={groceryLists}
          groceryListsServerLoaded={groceryListsServerLoaded}
        >
          <RecipeStoreProvider
            recipes={recipes}
            recipesServerLoaded={recipesServerLoaded}
          >
            <PantryStoreProvider
              pantryIngredients={pantryIngredients}
              pantryServerLoaded={pantryServerLoaded}
            >
              <RouteDataFallback />
              {children}
            </PantryStoreProvider>
          </RecipeStoreProvider>
        </GroceryListStoreProvider>
      </IngredientStoreProvider>
    </UserStoreProvider>
  );
};
