import Link from "next/link";
import { cn, EXTERNAL_LINK_PROPS, isInternalRoute } from "@/utils";
import "./button.scss";

export type ButtonMode = "1" | "2" | "2-light";

type ButtonProps = {
  href: string;
  /**
   * ui-kit → button (0:4739). mode=1 — светлая, mode=2 — полупрозрачная для тёмного фона,
   * 2-light — тот же mode=2 на светлом фоне (страница кейса: «← Все проекты»).
   */
  mode?: ButtonMode;
  /** Иконка слева: `<Icon name="telegram" tone="muted" />`. */
  icon?: React.ReactNode;
  /** Иконка для hover, если в ui-kit для неё есть отдельный вариант (Behance). */
  hoverIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  onClick?: () => void;
};

export function Button({ href, mode = "1", icon, hoverIcon, children, className, external, onClick }: ButtonProps) {
  const classes = cn("button", `button--mode-${mode}`, className);

  const content = (
    <>
      {icon && (
        <span className="button__icon" aria-hidden>
          <span className={cn("button__icon-layer", Boolean(hoverIcon) && "button__icon-layer--default")}>{icon}</span>
          {hoverIcon && <span className="button__icon-layer button__icon-layer--hover">{hoverIcon}</span>}
        </span>
      )}
      <span className="button__label">{children}</span>
    </>
  );

  // Внутренние страницы — через next/link (клиентская навигация)
  if (isInternalRoute(href) && !external) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} onClick={onClick} {...(external ? EXTERNAL_LINK_PROPS : {})}>
      {content}
    </a>
  );
}
