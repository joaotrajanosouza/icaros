# Icaros — MVP do módulo Linktree

Frontend do Icaros (link-in-bio) construído com **Vite + React + TypeScript +
TanStack Router/Query/Form + Tailwind v4**, 100% em português do Brasil e
mobile-first. Este é o **frontend isolado**, sem backend real — todas as
chamadas de API passam por handlers **MSW** que simulam o comportamento do
backend (auth, páginas, links, subpastas, temas, estatísticas e assinatura),
então dá pra navegar o produto inteiro localmente sem banco de dados.

Backend real (Next.js/Postgres ou outro) fica para uma etapa seguinte — a
camada `src/core/api/*` já está desenhada para trocar os handlers mockados
por chamadas HTTP reais sem tocar em nenhuma tela.

## Rodando localmente

```bash
pnpm install
npx msw init public/ --save   # gera public/mockServiceWorker.js (uma vez só)
pnpm dev
```

Abra `http://localhost:5173`. O `routeTree.gen.ts` é gerado automaticamente
pelo plugin do TanStack Router ao rodar `dev`/`build` — não precisa criar
esse arquivo manualmente.

## Fluxo implementado

1. `/login` — login com Google (mockado).
2. `/onboarding` — escolha de username (com checagem de disponibilidade) e
   tema visual, depois publica a página.
3. `/dashboard` — visão geral, minha página, botões/links (com seletor de
   ícones, ativar/desativar, reordenar por drag-and-drop), subpasta, temas,
   estatísticas, plano/assinatura (preparado para AppMax) e configurações.
4. `/:username` e `/:username/:folder` — página pública renderizada com o
   tema escolhido, no padrão `de1.click/username`.

## Estrutura

```
src/
  core/       # api, http client, segurança, i18n, stores, query keys
  ui/         # design system (Button, Input, Dialog, Tabs...)
  pattern/    # form hooks, seletor de ícones, empty states, error boundary
  layouts/    # AuthLayout, OnboardingLayout, MainLayout
  features/   # onboarding, page-editor, folder, themes, stats, plan, public-page
  routes/     # rotas do TanStack Router (file-based)
  mocks/      # handlers MSW + dados de seed
```

## Limites do plano grátis já refletidos na UI

1 página, até 5 links, 1 subpasta, temas básicos, marca Icaros no rodapé —
tudo configurado em `src/core/constants.ts` (`PLAN_LIMITS`), fácil de ajustar
no futuro.

## Próximos passos sugeridos

- Definir e plugar o backend real (auth Google de verdade, banco de dados,
  upload de avatar, webhooks AppMax).
- Módulos de CRM e gestão financeira do Icaros (ainda não iniciados).
- Área administrativa (lista de usuários/páginas/assinaturas).
