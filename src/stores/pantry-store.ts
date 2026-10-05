import { create } from "zustand";
import { PantryIngredient, PantryUpdateFormData } from "@/utils/interfaces";

export type PantryState = {
  pantryIngredients: PantryIngredient[];
  isPantryOpen: boolean;
  pantryVersion: number;
};

export type PantryActions = {
  addItemToPantry: (item: PantryIngredient) => void;
  addItems: (items: PantryIngredient[]) => void;
  removeItemFromPantry: (name: string) => void;
  setPantryOpen: (open: boolean) => void;
  setPantryIngredients: (items: PantryIngredient[]) => void;
  fetchPantry: () => Promise<void>;
  syncPantry: (pantryFormData: PantryUpdateFormData) => Promise<void>;
};

export type PantryStore = PantryState & PantryActions;

export const initPantryStore = (
  pantryIngredients?: PantryIngredient[] | null,
): PantryState => ({
  pantryIngredients: pantryIngredients ?? [],
  isPantryOpen: false,
  pantryVersion: 1,
});

export const createPantryStore = (initialState: PantryState) => {
  return create<PantryStore>()((set) => ({
    ...initialState,
    addItemToPantry: (item) =>
      set(({ pantryIngredients, pantryVersion }) => ({
        pantryIngredients: mergePantryItem(pantryIngredients, item),
        pantryVersion: pantryVersion + 1,
      })),
    addItems: (items) =>
      set(({ pantryIngredients }) => ({
        pantryIngredients: items.reduce(
          (acc, item) => mergePantryItem(acc, item),
          pantryIngredients,
        ),
      })),
    // TODO: verify if needed
    removeItemFromPantry: (name) =>
      set(({ pantryIngredients }) => ({
        pantryIngredients: pantryIngredients.filter(
          (i) => i.name.toLowerCase() !== name.toLowerCase(),
        ),
      })),
    setPantryOpen: (isPantryOpen) => set({ isPantryOpen }),
    setPantryIngredients: (pantryIngredients) => set({ pantryIngredients }),
    fetchPantry: async () => {
      try {
        const { pantryIngredients } = await tryFetchingPantry();
        set(() => ({ pantryIngredients }));
      } catch (error) {
        throw new Error("Unable to fetch pantry", {
          cause: error,
        });
      }
    },
    syncPantry: async (pantryFormData) => {
      try {
        const pantryIngredients = await trySyncingPantry(pantryFormData);
        set(() => ({ pantryIngredients }));
      } catch (error) {
        console.error("Failed to sync pantry to DB:", error);
      }
    },
  }));
};

// TODO: why was this using /api/grocery-list instead of /api/pantry
const tryFetchingPantry = async () => {
  try {
    const fetchPantry = await fetch("/api/pantry");
    // const fetchPantry = await fetch("/api/grocery-list");
    return await fetchPantry.json();
  } catch (error) {
    throw new Error("Unable to fetch grocery lists", { cause: error });
  }
};

const trySyncingPantry = async (pantryFormData: PantryUpdateFormData) => {
  try {
    const fetchPantry = await fetch("/api/pantry", {
      // const fetchPantry = await fetch("/api/grocery-list", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pantryFormData),
    });
    return await fetchPantry.json();
  } catch (error) {
    throw new Error("Unable to fetch grocery lists", { cause: error });
  }
};

// Upsert by ingredientPublicId; pantry items need to exist in master list
const mergePantryItem = (
  items: PantryIngredient[],
  incoming: PantryIngredient,
): PantryIngredient[] => {
  const exists = items.some(
    ({ publicId }) =>
      publicId?.toLowerCase() === incoming.publicId?.toLowerCase(),
  );

  if (exists) return items;
  return [...items, incoming];
};

export type PantryStoreApi = ReturnType<typeof createPantryStore>;