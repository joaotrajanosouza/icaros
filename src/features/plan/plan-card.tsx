import { Check, Sparkles } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { subscriptionQuery } from "@core/queries";
import { startUpgradeCheckout } from "@core/api/plan";
import { Button } from "@ui/button";
import { Badge } from "@ui/badge";
import { Loading } from "@ui/loading";
import { toast } from "@ui/toaster";

const FREE_FEATURES = ["1 página pública", "Até 5 links", "1 subpasta", "Temas básicos", "Estatísticas simples"];
const PAID_FEATURES = [
  "Links ilimitados",
  "Mais subpastas",
  "Sem marca Icaros",
  "Temas premium",
  "Estatísticas completas",
];

export function PlanCard() {
  const { data: subscription, isLoading } = useQuery(subscriptionQuery);

  const checkout = useMutation({
    mutationFn: startUpgradeCheckout,
    onSuccess: (data) => {
      // Em produção: window.location.href = data.checkoutUrl (redireciona para o AppMax).
      toast(`Checkout preparado: ${data.checkoutUrl}`);
    },
    onError: () => toast("Não foi possível iniciar o checkout agora.", "error"),
  });

  if (isLoading) return <Loading />;

  const isPaid = subscription?.planId === "paid";

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-2xl border border-zinc-200 bg-white p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-bold text-zinc-900">Grátis</p>
          {!isPaid ? <Badge tone="violet">Plano atual</Badge> : null}
        </div>
        <ul className="flex flex-col gap-2 text-sm text-zinc-600">
          {FREE_FEATURES.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <Check size={16} className="text-emerald-500" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border-2 border-violet-500 bg-violet-50/50 p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="flex items-center gap-1.5 font-bold text-zinc-900">
            <Sparkles size={16} className="text-violet-600" />
            Pago
          </p>
          {isPaid ? <Badge tone="violet">Plano atual</Badge> : null}
        </div>
        <ul className="mb-4 flex flex-col gap-2 text-sm text-zinc-600">
          {PAID_FEATURES.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <Check size={16} className="text-emerald-500" />
              {feature}
            </li>
          ))}
        </ul>
        {!isPaid ? (
          <Button className="w-full" disabled={checkout.isPending} onClick={() => checkout.mutate()}>
            {checkout.isPending ? "Abrindo checkout..." : "Fazer upgrade"}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
