import * as v from "valibot";

export function valibotValidator<TSchema extends v.GenericSchema>(schema: TSchema) {
  return ({ value }: { value: unknown }) => {
    const result = v.safeParse(schema, value);
    if (result.success) return undefined;
    return result.issues.at(0)?.message ?? "Valor inválido.";
  };
}
