"use client";
import { useCallback } from "react";
import { Drawer, Menu } from "@base-ui/react";
import { LiquidType, MassType, Unit } from "@/utils/interfaces";
import { MenuRadioItem } from "@/components/header/links";
import { useShallow } from "zustand/react/shallow";
import Link from "next/link";
import { useUserStore } from "@/providers/user-store-provider";
import { useIngredientsStore } from "@/providers/ingredient-store-provider";
import { GoogleIcon } from "@/components/icons/google-icon";
import { useGroceryListsStore } from "@/providers/grocery-list-store-provider";
import { useRecipesStore } from "@/providers/recipe-store-provider";
import { pantryHandle } from "@/components/pantry/pantry-drawer";

const ChevronArrow = () => {
  return (
    <Menu.Arrow className="relative block h-1.5 w-3 overflow-clip before:absolute before:bottom-0 before:left-1/2 before:h-[calc(6px*sqrt(2))] before:w-[calc(6px*sqrt(2))] before:[transform:translate(-50%,50%)_rotate(45deg)] before:bg-white before:content-[''] data-[side=bottom]:top-[-6px] data-[side=left]:right-[-9px] data-[side=left]:rotate-90 data-[side=right]:left-[-9px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-6px] data-[side=top]:rotate-180 dark:before:border-white dark:before:bg-neutral-950" />
  );
};

export const UserMenu = () => {
  const clearIngredients = useIngredientsStore(
    ({ clearIngredients }) => clearIngredients,
  );

  const clearGroceryLists = useGroceryListsStore(
    ({ clearGroceryLists }) => clearGroceryLists,
  );

  const clearRecipes = useRecipesStore(({ clearRecipes }) => clearRecipes);

  const { mass, setMass, liquidVolume, setLiquidVolume, userInfo, logout } =
    useUserStore(
      useShallow(
        ({
          mass,
          setMass,
          liquidVolume,
          setLiquidVolume,
          userInfo,
          logout,
        }) => ({
          mass,
          setMass,
          liquidVolume,
          setLiquidVolume,
          userInfo,
          logout,
        }),
      ),
    );

  const logoutHandler = () => {
    logout();
    clearIngredients();
    clearGroceryLists();
    clearRecipes();
  };

  const toggleMass = useCallback(
    (massType: string) => {
      setMass(massType as MassType);
    },
    [setMass],
  );

  const toggleLiquidVolume = useCallback(
    (liquidType: string) => {
      setLiquidVolume(liquidType as LiquidType);
    },
    [setLiquidVolume],
  );

  return (
    <Menu.Portal>
      <Menu.Positioner side={"bottom"} sideOffset={10} align={"end"}>
        <Menu.Popup
          className={
            "relative z-2 min-w-40 origin-(--transform-origin) rounded-md bg-white p-1 tracking-widest shadow-[0px_10px_38px_-10px_rgba(22,23,24,0.35),0px_10px_20px_-15px_rgba(22,23,24,0.2)] outline-hidden transition-[opacity,scale] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] select-none data-ending-style:scale-90 data-ending-style:opacity-0 data-ending-style:transition-[opacity,scale] data-ending-style:duration-150 data-ending-style:ease-[ease] data-starting-style:scale-90 data-starting-style:opacity-0"
          }
        >
          <ChevronArrow />
          <Menu.Group>
            <Menu.GroupLabel
              className={"pl-4 text-xs leading-6 font-medium opacity-50"}
            >
              Mass
            </Menu.GroupLabel>

            <Menu.SubmenuRoot>
              <Menu.SubmenuTrigger
                className={
                  "text-md relative flex h-6 content-center items-center rounded-md py-4 pr-[5px] pl-[25px] leading-none outline-none data-[highlighted]:bg-blue-500 data-[highlighted]:text-white"
                }
              >
                {mass}
              </Menu.SubmenuTrigger>
              <Menu.Portal>
                <Menu.Positioner side={"left"} sideOffset={15} align={"center"}>
                  <Menu.Popup
                    className={
                      "relative z-2 min-w-40 origin-(--transform-origin) rounded-md bg-white p-1 tracking-widest shadow-[0px_10px_38px_-10px_rgba(22,23,24,0.35),0px_10px_20px_-15px_rgba(22,23,24,0.2)] outline-hidden transition-[opacity,scale] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] select-none data-ending-style:scale-90 data-ending-style:opacity-0 data-ending-style:transition-[opacity,scale] data-ending-style:duration-150 data-ending-style:ease-[ease] data-starting-style:scale-90 data-starting-style:opacity-0"
                    }
                  >
                    <ChevronArrow />

                    <Menu.RadioGroup
                      value={mass}
                      onValueChange={toggleMass}
                      className={"cursor-pointer"}
                    >
                      <MenuRadioItem value={Unit.KILOGRAM} name={"kg"} />
                      <MenuRadioItem value={Unit.GRAM} name={"g"} />
                      <MenuRadioItem value={Unit.POUND} name={"lb"} />
                    </Menu.RadioGroup>
                  </Menu.Popup>
                </Menu.Positioner>
              </Menu.Portal>
            </Menu.SubmenuRoot>
          </Menu.Group>

          <Menu.Separator className={"relative m-1 flex h-px bg-gray-200"} />
          <Menu.Group>
            <Menu.GroupLabel
              className={"pl-4 text-xs leading-6 font-medium opacity-50"}
            >
              Volume
            </Menu.GroupLabel>

            <Menu.SubmenuRoot>
              <Menu.SubmenuTrigger
                className={
                  "text-md relative flex h-6 content-center items-center rounded-md py-4 pr-[5px] pl-[25px] leading-none outline-none data-[highlighted]:bg-blue-500 data-[highlighted]:text-white"
                }
              >
                {liquidVolume}
              </Menu.SubmenuTrigger>
              <Menu.Portal>
                <Menu.Positioner side={"left"} sideOffset={15} align={"center"}>
                  <Menu.Popup
                    className={
                      "relative z-2 min-w-40 origin-(--transform-origin) rounded-md bg-white p-1 tracking-widest shadow-[0px_10px_38px_-10px_rgba(22,23,24,0.35),0px_10px_20px_-15px_rgba(22,23,24,0.2)] outline-hidden transition-[opacity,scale] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] select-none data-ending-style:scale-90 data-ending-style:opacity-0 data-ending-style:transition-[opacity,scale] data-ending-style:duration-150 data-ending-style:ease-[ease] data-starting-style:scale-90 data-starting-style:opacity-0"
                    }
                  >
                    <ChevronArrow />

                    <Menu.RadioGroup
                      value={liquidVolume}
                      onValueChange={toggleLiquidVolume}
                      className={"cursor-pointer"}
                    >
                      <MenuRadioItem value={Unit.LITRE} name={"L"} />
                      <MenuRadioItem value={Unit.MILLILITER} name={"ml"} />
                      <MenuRadioItem value={Unit.QUART} name={"qt"} />
                      <MenuRadioItem value={Unit.CUP} name={"cup"} />
                      <MenuRadioItem value={Unit.TABLESPOON} name={"tbsp"} />
                      <MenuRadioItem value={Unit.TEASPOON} name={"tsp"} />
                    </Menu.RadioGroup>
                  </Menu.Popup>
                </Menu.Positioner>
              </Menu.Portal>
            </Menu.SubmenuRoot>
          </Menu.Group>

          <Menu.Group>
            <Menu.Separator className={"m-1 h-px bg-gray-200"} />
            <Menu.GroupLabel className="pl-4 text-xs leading-6 font-medium opacity-50">
              Kitchen
            </Menu.GroupLabel>

            <Drawer.Trigger
              handle={pantryHandle}
              className={
                "text-md relative flex h-6 w-full cursor-pointer content-center items-center rounded-md py-4 pr-[5px] pl-[25px] leading-none outline-none hover:bg-blue-500 hover:text-white"
              }
            >
              Pantry
            </Drawer.Trigger>
          </Menu.Group>

          <Menu.Group>
            <Menu.Separator className={"m-1 h-px bg-gray-200"} />
            <Menu.GroupLabel className="pl-4 text-xs leading-6 font-medium opacity-50">
              Account
            </Menu.GroupLabel>

            <Menu.Item
              className={
                "text-md relative flex h-6 content-center items-center rounded-md py-4 leading-none outline-none data-[highlighted]:bg-blue-500 data-[highlighted]:text-white"
              }
            >
              {userInfo ? (
                <p
                  onClick={logoutHandler}
                  className={"ml-6 w-full cursor-pointer"}
                >
                  Logout
                </p>
              ) : (
                <Link
                  href={"/api/login"}
                  className={
                    "flex w-full items-center justify-center gap-x-2 p-2"
                  }
                >
                  <GoogleIcon />
                  <p>Sign in with Google</p>
                </Link>
              )}
            </Menu.Item>
          </Menu.Group>
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  );
};