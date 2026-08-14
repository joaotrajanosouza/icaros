import * as React from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutGrid,
  User,
  Link2,
  FolderOpen,
  Palette,
  BarChart3,
  LogOut,
  MoreVerticalIcon,
  ChevronRight,
  Users,
  TrendingUp,
  UserCog,
} from "lucide-react";
import { useAuth } from "@core/auth-context";
import { BrandMark } from "@ui/brand-mark";
import { APP_NAME } from "@core/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@ui/sidebar";

// ─── Linktree sub-items ───────────────────────────────────────────────────────

const LINKTREE_ITEMS = [
  { to: "/app/linktree", label: "Visão geral", icon: LayoutGrid, exact: true },
  { to: "/app/linktree/page", label: "Minha página", icon: User, exact: false },
  { to: "/app/linktree/links", label: "Botões/links", icon: Link2, exact: false },
  { to: "/app/linktree/folder", label: "Subpasta", icon: FolderOpen, exact: false },
  { to: "/app/linktree/themes", label: "Temas", icon: Palette, exact: false },
  { to: "/app/linktree/stats", label: "Estatísticas", icon: BarChart3, exact: false },
] as const;

// ─── Module definitions ───────────────────────────────────────────────────────

type SubItem = {
  to: string;
  label: string;
  icon: React.ElementType;
  exact: boolean;
};

type Module = {
  id: string;
  label: string;
  icon: React.ElementType;
  basePath: string;
  available: true;
  subItems: readonly SubItem[];
} | {
  id: string;
  label: string;
  icon: React.ElementType;
  basePath: string;
  available: false;
};

const MODULES: Module[] = [
  {
    id: "linktree",
    label: "Link Tree",
    icon: Link2,
    basePath: "/app/linktree",
    available: true,
    subItems: LINKTREE_ITEMS,
  },
  {
    id: "crm",
    label: "CRM",
    icon: Users,
    basePath: "/app/crm",
    available: false,
  },
  {
    id: "financeiro",
    label: "Gestão Financeira",
    icon: TrendingUp,
    basePath: "/app/financeiro",
    available: false,
  },
];

const CONTA_ITEM = { to: "/app/conta", label: "Conta", icon: UserCog } as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isSubItemActive(item: SubItem, pathname: string) {
  return item.exact
    ? pathname === item.to
    : pathname === item.to || pathname.startsWith(item.to + "/");
}

function isModuleActive(mod: Module, pathname: string) {
  return pathname === mod.basePath || pathname.startsWith(mod.basePath + "/");
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ─── NavUser ──────────────────────────────────────────────────────────────────

function NavUser() {
  const { user, logout } = useAuth();
  const { isMobile } = useSidebar();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatarUrl ?? undefined} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatarUrl ?? undefined} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={async () => {
                await logout();
                await navigate({ to: "/login" });
              }}
            >
              <LogOut />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

// ─── ActiveModule — módulo com sub-itens colapsáveis ─────────────────────────

function ActiveModule({
  mod,
  pathname,
}: {
  mod: Extract<Module, { available: true }>;
  pathname: string;
}) {
  const active = isModuleActive(mod, pathname);
  const Icon = mod.icon;

  return (
    <Collapsible.Root asChild defaultOpen={active}>
      <SidebarMenuItem>
        <Collapsible.Trigger asChild>
          <SidebarMenuButton
            isActive={active}
            tooltip={mod.label}
            className="group/module"
          >
            <Icon />
            <span>{mod.label}</span>
            <ChevronRight className="ml-auto size-4 shrink-0 transition-transform duration-200 group-data-[state=open]/module:rotate-90 group-data-[collapsible=icon]:hidden" />
          </SidebarMenuButton>
        </Collapsible.Trigger>

        <Collapsible.Content className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
          <SidebarMenuSub>
            {mod.subItems.map((item) => {
              const SubIcon = item.icon;
              const subActive = isSubItemActive(item, pathname);
              return (
                <SidebarMenuSubItem key={item.to}>
                  <SidebarMenuSubButton asChild isActive={subActive}>
                    <Link to={item.to}>
                      <SubIcon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              );
            })}
          </SidebarMenuSub>
        </Collapsible.Content>
      </SidebarMenuItem>
    </Collapsible.Root>
  );
}

// ─── LockedModule — módulo bloqueado ─────────────────────────────────────────

function LockedModule({ mod }: { mod: Extract<Module, { available: false }> }) {
  const Icon = mod.icon;
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        disabled
        tooltip={`${mod.label} — Em breve`}
        className="cursor-not-allowed opacity-60"
      >
        <Icon />
        <span className="flex-1 truncate">{mod.label}</span>
        <span className="shrink-0 rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground group-data-[collapsible=icon]:hidden">
          Em breve
        </span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

// ─── AppSidebar ───────────────────────────────────────────────────────────────

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const contaActive = pathname === CONTA_ITEM.to || pathname.startsWith(CONTA_ITEM.to + "/");

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Brand header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/app/linktree" className="flex items-center gap-2">
                <BrandMark size={28} className="shrink-0" />
                <span className="text-lg font-black tracking-tight group-data-[collapsible=icon]:hidden">
                  {APP_NAME}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Módulos */}
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
            Módulos
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MODULES.map((mod) =>
                mod.available ? (
                  <ActiveModule key={mod.id} mod={mod} pathname={pathname} />
                ) : (
                  <LockedModule key={mod.id} mod={mod} />
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Conta — rodapé da área de conteúdo */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={contaActive}
                  tooltip={CONTA_ITEM.label}
                >
                  <Link to={CONTA_ITEM.to}>
                    <UserCog />
                    <span>{CONTA_ITEM.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Usuário */}
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
