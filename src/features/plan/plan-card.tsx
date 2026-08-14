import { Check, Sparkles, Zap } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { subscriptionQuery } from "@core/queries";
import { startUpgradeCheckout } from "@core/api/plan";
import { Button } from "@ui/button";
import { Badge } from "@ui/badge";
import { Loading } from "@ui/loading";
import { Separator } from "@ui/separator";
import { toast } from "@ui/toaster";

const FREE_FEATURES = [
  "1 página pública",
  "Até 5 links",
  "1 subpasta",
  "Temas básicos",
  "Estatísticas simples",
];
const PAID_FEATURES = [
  "Links ilimitados",
  "Mais subpastas",
  "Sem marca Icaros",
  "Temas premium",
  "Estatísticas completas",
];

function FeatureRow({ label }: { label: string }) {
  return (
    <li className="flex items-center gap-2 text-sm text-zinc-600">
      <Check size={15} className="shrink-0 text-emerald-500" />
      {label}
    </li>
  );
}

export function PlanCard() {
  const { data: subscription, isLoading } = useQuery(subscriptionQuery);

  const checkout = useMutation({
    mutationFn: startUpgradeCheckout,
    onSuccess: (data) => {
      toast(`Checkout preparado: ${data.checkoutUrl}`);
    },
    onError: () => toast("Não foi possível iniciar o checkout agora.", "error"),
  });

  if (isLoading) return <Loading />;

  const isPaid = subscription?.planId === "paid";

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {/* Free plan */}
      <div className="flex flex-col rounded-3xl border border-zinc-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-bold text-zinc-900">Grátis</p>
          {!isPaid ? <Badge tone="neutral">Plano atual</Badge> : null}
        </div>
        <ul className="flex flex-col gap-2.5">
          {FREE_FEATURES.map((feature) => (
            <FeatureRow key={feature} label={feature} />
          ))}
        </ul>
      </div>

      {/* Paid plan */}
      <div className="flex flex-col rounded-3xl border-2 border-violet-500 bg-gradient-to-b from-violet-50/60 to-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <p className="flex items-center gap-1.5 font-bold text-zinc-900">
            <Sparkles size={16} className="text-violet-600" />
            Pago
          </p>
          {isPaid ? <Badge tone="violet">Plano atual</Badge> : null}
        </div>

        <ul className="mb-5 flex flex-col gap-2.5">
          {PAID_FEATURES.map((feature) => (
            <FeatureRow key={feature} label={feature} />
          ))}
        </ul>

        {!isPaid ? (
          <>
            <Separator className="mb-4" />
            <Button
              className="w-full"
              disabled={checkout.isPending}
              onClick={() => checkout.mutate()}
            >
              <Zap size={15} />
              {checkout.isPending ? "Abrindo checkout..." : "Fazer upgrade"}
            </Button>
          </>
        ) : (
          <div className="mt-auto rounded-xl bg-violet-100 px-4 py-3 text-center text-sm font-medium text-violet-700">
            Você está no plano completo 🎉
          </div>
        )}
      </div>
    </div>
  );
}
