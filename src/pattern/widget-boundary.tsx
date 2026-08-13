import { Component, type ReactNode } from "react";
import { RefreshCcw } from "lucide-react";
import { Button } from "@ui/button";

type Props = { children: ReactNode; fallbackTitle?: string };
type State = { hasError: boolean };

export class WidgetBoundary extends Component<Props, State> {
  override state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  reset = () => this.setState({ hasError: false });

  override render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-zinc-200 p-6 text-center">
          <p className="text-sm font-medium text-zinc-700">
            {this.props.fallbackTitle ?? "Não foi possível carregar esse conteúdo."}
          </p>
          <Button size="sm" variant="secondary" onClick={this.reset}>
            <RefreshCcw size={14} />
            Tentar de novo
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
