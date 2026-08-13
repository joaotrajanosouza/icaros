import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "@pattern/form.contexts";
import { TextField, TextAreaField } from "@pattern/form";
import { Button } from "@ui/button";

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { TextField, TextAreaField },
  formComponents: { SubmitButton: Button },
});
