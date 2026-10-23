import { NextRequest } from "next/server";
import { getAccessToken } from "@/utils/server-actions/session-token";
import { IngredientFormData } from "@/utils/interfaces";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ "ingredient-id": string }> },
) => {
  try {
    const token = await getAccessToken();

    if (!token)
      return new Response(JSON.stringify({ ingredient: null }), {
        status: 401,
      });

    const { "ingredient-id": ingredientId } = await params;
    const ingredientData: IngredientFormData = await req.json();

    const updateIngredientResponse = await fetch(
      `${process.env.PRICEY_BACKEND_URL}/ingredient/${ingredientId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredient: ingredientData }),
      },
    );

    const { success, data, error } = await updateIngredientResponse.json();
    if (!success)
      return new Response(error, { status: updateIngredientResponse.status });
    return new Response(JSON.stringify({ ingredient: data }), { status: 200 });
  } catch (error) {
    return new Response(`Ingredient update error: ${error}`, { status: 400 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ "ingredient-id": string }> },
) => {
  try {
    const token = await getAccessToken();

    if (!token)
      return new Response(JSON.stringify({ ingredient: null }), {
        status: 401,
      });

    const { "ingredient-id": ingredientId } = await params;
    const { image }: { image: string } = await req.json();

    const patchImageResponse = await fetch(
      `${process.env.PRICEY_BACKEND_URL}/ingredient/${ingredientId}/image`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image }),
      },
    );

    const { success, data, error } = await patchImageResponse.json();
    if (!success)
      return new Response(error, { status: patchImageResponse.status });
    return new Response(JSON.stringify({ ingredient: data }), { status: 200 });
  } catch (error) {
    return new Response(`Ingredient image update error: ${error}`, {
      status: 400,
    });
  }
};

export const DELETE = async (
  _req: NextRequest,
  { params }: { params: Promise<{ "ingredient-id": string }> },
) => {
  try {
    const token = await getAccessToken();

    if (!token)
      return new Response(JSON.stringify({ ingredientId: null }), {
        status: 401,
      });

    const { "ingredient-id": ingredientId } = await params;

    const deleteIngredientResponse = await fetch(
      `${process.env.PRICEY_BACKEND_URL}/ingredient/${ingredientId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const { success, data, error } = await deleteIngredientResponse.json();
    if (!success)
      return new Response(error, { status: deleteIngredientResponse.status });
    return new Response(JSON.stringify({ ingredientId: data }), {
      status: 200,
    });
  } catch (error) {
    return new Response(`Ingredient deletion error: ${error}`, { status: 400 });
  }
};
