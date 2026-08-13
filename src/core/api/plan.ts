import { defineApiRoute, httpResource } from "@core/http-resource";
import type { PlanId } from "@core/constants";

export type Subscription = {
  id: string;
  planId: PlanId;
  status: "active" | "inactive" | "pending" | "canceled";
  provider: "appmax" | null;
  currentPeriodEnd: string | null;
};

export async function fetchSubscription(): Promise<Subscription> {
  return httpResource(
    defineApiRoute<Subscription>({ method: "GET", path: "/api/subscription" }),
  );
}

// Inicia o checkout no gateway AppMax. No MVP sem credenciais reais, o
// backend retorna um checkoutUrl mockado — a estrutura já fica pronta para
// o provider real e para o recebimento de webhooks de pagamento.
export async function startUpgradeCheckout(): Promise<{ checkoutUrl: string }> {
  return httpResource(
    defineApiRoute<{ checkoutUrl: string }>({
      method: "POST",
      path: "/api/subscription/checkout",
      sensitive: true,
    }),
  );
}
