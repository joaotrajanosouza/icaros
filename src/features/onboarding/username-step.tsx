import { Check, X, Loader2 } from "lucide-react";
import { useAppForm } from "@pattern/form.hooks";
import { onboardingSchema } from "@features/onboarding/schemas";
import { useUsernameAvailability } from "@features/onboarding/hooks";
import { useMessages } from "@core/i18n";
import { publicPageUrl, slugify } from "@core/utils";
import { valibotValidator } from "@core/valibot-adapter";

export function UsernameStep({
  onNext,
  defaultValue,
}: {
  onNext: (username: string) => void;
  defaultValue: string;
}) {
  const messages = useMessages();
  const form = useAppForm({
    defaultValues: { username: defaultValue },
    validators: { onChange: valibotValidator(onboardingSchema.entries.username) },
    onSubmit: ({ value }) => onNext(slugify(value.username)),
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void form.handleSubmit();
      }}
      className="flex flex-col gap-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">{messages.onboarding.usernameTitle}</h1>
        <p className="mt-1 text-sm text-zinc-500">{messages.onboarding.usernameHelp}</p>
      </div>

      <form.Field name="username">
        {(field) => {
          const value = slugify(field.state.value);
          const { checking, available } = useUsernameAvailability(value);
          return (
            <div>
              <div className="flex items-center rounded-xl border border-zinc-200 bg-white pl-4 focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-500/10">
                <span className="text-sm text-zinc-400">icaros/</span>
                <input
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="joao-trajano"
                  className="h-12 flex-1 bg-transparent px-1 text-base text-zinc-900 outline-none"
                />
                <span className="pr-4">
                  {value.length >= 3 &&
                    (checking ? (
                      <Loader2 size={18} className="animate-spin text-zinc-400" />
                    ) : available ? (
                      <Check size={18} className="text-emerald-500" />
                    ) : available === false ? (
                      <X size={18} className="text-red-500" />
                    ) : null)}
                </span>
              </div>
              {value.length >= 3 && available === false ? (
                <p className="mt-1.5 text-sm text-red-600">{messages.onboarding.usernameTaken}</p>
              ) : null}
              {value.length >= 3 && available ? (
                <p className="mt-1.5 text-sm text-zinc-400">{publicPageUrl(value)}</p>
              ) : null}
            </div>
          );
        }}
      </form.Field>

      <form.AppForm>
        <form.SubmitButton type="submit" size="lg">
          Continuar
        </form.SubmitButton>
      </form.AppForm>
    </form>
  );
}
