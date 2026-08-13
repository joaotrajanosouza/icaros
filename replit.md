# Icaros — MVP do módulo Linktree

Frontend link-in-bio (estilo Linktree) construído com **Vite + React + TypeScript + TanStack Router/Query/Form + Tailwind v4**, 100% em português do Brasil e mobile-first.

## Como rodar

```bash
pnpm dev   # inicia em http://localhost:5000
```

O workflow **"Start application"** já está configurado no Replit e inicia automaticamente.

## Fluxo de navegação

1. `/login` — login com Google (mockado via MSW)
2. `/app/linktree` — módulo Link Tree (exige página configurada; redireciona para `/onboarding` se não houver)
3. `/onboarding` — escolha de username e tema (após concluir, volta para `/app/linktree`)
4. `/:username` e `/:username/:folder` — página pública com o tema escolhido

## URLs públicas

As URLs exibidas e copiadas seguem o padrão `icaros/<username>` (sem protocolo/TLD enquanto o domínio definitivo não estiver definido). A constante `PUBLIC_PAGE_DOMAIN = "icaros"` em `src/core/constants.ts` centraliza esse valor.

## Stack

- **Vite 6** + **React 18** + **TypeScript**
- **TanStack Router** (file-based routing), **Query**, **Form**, **Table**
- **Tailwind CSS v4**
- **MSW 2** — todas as chamadas de API são mockadas (sem backend real)
- **Zustand** — estado global
- **Valibot** — validação de formulários
- **pnpm** como gerenciador de pacotes

## Estrutura

```
src/
  core/       # api, http client, segurança, i18n, stores, query keys
  ui/         # design system (Button, Input, Dialog, Tabs...)
  pattern/    # form hooks, seletor de ícones, empty states, error boundary
  layouts/    # AuthLayout, OnboardingLayout, MainLayout
  features/   # onboarding, page-editor, folder, themes, stats, plan, public-page
  routes/     # rotas do TanStack Router (file-based, geradas automaticamente)
  mocks/      # handlers MSW + dados de seed
```

## Fluxo da aplicação

1. `/login` — login com Google (mockado)
2. `/onboarding` — escolha de username e tema visual
3. `/dashboard` — links, subpastas, temas, estatísticas, plano
4. `/:username` e `/:username/:folder` — página pública com tema escolhido

## Observações

- `public/mockServiceWorker.js` foi gerado via `npx msw init public/ --save`
- `eslint-plugin-boundaries` foi removido (dependência `handlebars` bloqueada pelo Replit Package Firewall); o restante do ESLint funciona normalmente
- Limites do plano grátis configurados em `src/core/constants.ts` (`PLAN_LIMITS`)
- `routeTree.gen.ts` é gerado automaticamente pelo plugin TanStack Router ao rodar `dev`

## User preferences

- Projeto em português do Brasil
