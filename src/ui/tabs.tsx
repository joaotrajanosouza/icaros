import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@ui/utils";

const Tabs = TabsPrimitive.Root;

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "flex gap-1 overflow-x-auto rounded-full bg-zinc-100 p-1",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
        "data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow-sm",
        "data-[state=inactive]:text-zinc-500 data-[state=inactive]:hover:text-zinc-800",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("focus-visible:outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
