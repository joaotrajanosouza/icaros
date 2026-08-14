/**
 * Sheet — slides in from the bottom on mobile, side panel on desktop.
 * Built on Radix Dialog for full accessibility (focus trap, Escape, ARIA).
 */
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@ui/utils";

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;
const SheetPortal = DialogPrimitive.Portal;

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-zinc-900/40 backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  title,
  description,
  showClose = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  title?: string;
  description?: string;
  showClose?: boolean;
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 max-h-[92vh] overflow-y-auto rounded-t-3xl bg-white p-6 shadow-xl outline-none",
          className,
        )}
        {...props}
      >
        {(title ?? description) ? (
          <div className="mb-4 pr-8">
            {title ? (
              <DialogPrimitive.Title className="text-lg font-bold text-zinc-900">
                {title}
              </DialogPrimitive.Title>
            ) : null}
            {description ? (
              <DialogPrimitive.Description className="mt-1 text-sm text-zinc-500">
                {description}
              </DialogPrimitive.Description>
            ) : null}
          </div>
        ) : null}
        {children}
        {showClose ? (
          <SheetClose className="absolute right-4 top-4 rounded-full p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700">
            <X size={20} />
            <span className="sr-only">Fechar</span>
          </SheetClose>
        ) : null}
      </DialogPrimitive.Content>
    </SheetPortal>
  );
}

export { Sheet, SheetTrigger, SheetClose, SheetPortal, SheetContent };
