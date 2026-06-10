// src/wired-elements.d.ts
import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "wired-card": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        elevation?: number;
        fill?: string;
        class?: string;
      };
      "wired-button": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        elevation?: number;
        disabled?: boolean;
        class?: string;
      };
      "wired-input": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        placeholder?: string;
        value?: string;
        class?: string;
      };
      "wired-textarea": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        placeholder?: string;
        value?: string;
        rows?: number;
        class?: string;
      };
      "wired-checkbox": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        checked?: boolean;
        disabled?: boolean;
        class?: string;
      };
      "wired-toggle": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        checked?: boolean;
        disabled?: boolean;
        class?: string;
      };
    }
  }
}
