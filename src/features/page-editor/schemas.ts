import * as v from "valibot";

export const linkFormSchema = v.object({
  title: v.pipe(v.string(), v.minLength(1, "Dá um título pro seu link.")),
  url: v.pipe(v.string(), v.minLength(1, "Cola a URL de destino."), v.url("URL inválida.")),
  icon: v.pipe(v.string(), v.minLength(1)),
  folderId: v.nullable(v.string()),
  active: v.boolean(),
});

export type LinkFormInput = v.InferOutput<typeof linkFormSchema>;
