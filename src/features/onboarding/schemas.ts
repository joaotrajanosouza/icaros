import * as v from "valibot";

export const usernameSchema = v.pipe(
  v.string(),
  v.minLength(3, "Use pelo menos 3 caracteres."),
  v.maxLength(30, "Use no máximo 30 caracteres."),
  v.regex(/^[a-z0-9-]+$/, "Só letras minúsculas, números e hífen."),
);

export const onboardingSchema = v.object({
  username: usernameSchema,
  themeId: v.pipe(v.string(), v.minLength(1, "Escolha um tema.")),
});

export type OnboardingInput = v.InferOutput<typeof onboardingSchema>;
