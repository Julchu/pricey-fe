import { Drawer } from "@base-ui/react/drawer";
import { PantryForm } from "@/components/pantry/pantry-form";
import { CircleCloseIcon } from "@/components/icons/circle-close-icon";

export const PantryContent = () => {
  // // const { formState } = useFormContext();
  // // usePreventUnload(formState.isDirty, "You have unsaved pantry items");

  return (
    <div className={"flex h-full w-full flex-col"}>
      <div className={"p-4 pb-0"}>
        <Drawer.Title className={"flex flex-row justify-between gap-4"}>
          <p
            className={
              "flex w-full cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-2xl font-bold tracking-widest text-white"
            }
          >
            Pantry
          </p>
          <div className="group flex flex-row justify-end">
            <Drawer.Close
              className={
                "flex cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-xl font-bold tracking-widest text-white group-hover:bg-red-500"
              }
            >
              <CircleCloseIcon className={"fill-none stroke-white"} />
            </Drawer.Close>
          </div>
        </Drawer.Title>
      </div>

      <PantryForm />
    </div>
  );
};