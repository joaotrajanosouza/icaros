import type { ReactNode } from "react";
import { Input } from "@ui/input";
import { Textarea } from "@ui/textarea";
import { useFieldContext } from "@pattern/form.contexts";

function FieldError() {
  const field = useFieldContext<string>();
  const error = field.state.meta.errors.at(0);
  if (!error || !field.state.meta.isTouched) return null;
  return <p className="mt-1.5 text-sm text-red-600">{String(error)}</p>;
}

function FieldLabel({ children, htmlFor }: { children: ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-zinc-700">
      {children}
    </label>
  );
}

export function TextField({ label, placeholder }: { label: string; placeholder?: string }) {
  const field = useFieldContext<string>();
  return (
    <div>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        placeholder={placeholder}
        invalid={field.state.meta.isTouched && field.state.meta.errors.length > 0}
        onChange={(event) => field.handleChange(event.target.value)}
        onBlur={field.handleBlur}
      />
      <FieldError />
    </div>
  );
}

export function TextAreaField({ label, placeholder }: { label: string; placeholder?: string }) {
  const field = useFieldContext<string>();
  return (
    <div>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Textarea
        id={field.name}
        name={field.name}
        rows={3}
        value={field.state.value}
        placeholder={placeholder}
        invalid={field.state.meta.isTouched && field.state.meta.errors.length > 0}
        onChange={(event) => field.handleChange(event.target.value)}
        onBlur={field.handleBlur}
      />
      <FieldError />
    </div>
  );
}
