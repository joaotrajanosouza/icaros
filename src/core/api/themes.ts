import { defineApiRoute, httpResource } from "@core/http-resource";

export type Theme = {
  id: string;
  name: string;
  tier: "basic" | "premium";
  background: string;
  buttonStyle: "solid" | "outline" | "glass";
  buttonColor: string;
  textColor: string;
  radius: "sm" | "lg" | "full";
  shadow: boolean;
};

export async function fetchThemes(): Promise<Theme[]> {
  return httpResource(defineApiRoute<Theme[]>({ method: "GET", path: "/api/themes" }));
}
