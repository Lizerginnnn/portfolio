import { PERSON } from "@/constants";
import { CONTACTS, cn } from "@/utils";
import { Button } from "../button";
import { Icon } from "../icon";
import { Tag } from "../tag";
import { Typography } from "../typography";
import "./profile-card.scss";

/** ui-kit → Profile card (5:3615): варианты Mobile / Desk / HD переключаются брейкпоинтами. */
export function ProfileCard({ className }: { className?: string }) {
  return (
    <div className={cn("profile-card", className)}>
      <div className="profile-card__info">
        <div className="profile-card__header">
          <Tag>{PERSON.status}</Tag>
          <Typography variant={{ base: "t4", lg: "t3" }} color="blue-200" nowrap className="profile-card__muted">
            {PERSON.city}
          </Typography>
        </div>
        {/* Моно-заголовок h-accent: на мобильных размер плавающий — задаётся в profile-card.scss */}
        <p className="profile-card__role">{PERSON.role}</p>
        <Typography variant={{ base: "t3", lg: "t2" }} color="blue-200" className="profile-card__muted">
          Проектирую цифровые продукты c 2022 года<span className="profile-card__mobile-only">. </span>
          <br className="profile-card__desktop-only" />
          Опыт в B2B, EdTech и e-commerce: делала все от лендингов <br className="profile-card__desktop-only" />
          до многоуровневых систем и мобильных приложений.
        </Typography>
      </div>

      <div className="profile-card__contacts">
        <Button
          mode="2"
          href={CONTACTS.phone.href}
          icon={<Icon name="phone" tone="light" />}
          className="profile-card__contact profile-card__contact--phone"
        >
          {CONTACTS.phone.label}
        </Button>
        <Button
          mode="2"
          href={CONTACTS.email.href}
          icon={<Icon name="mail" tone="light" />}
          className="profile-card__contact profile-card__contact--email"
        >
          {CONTACTS.email.label}
        </Button>
        <Button
          mode="2"
          href={CONTACTS.telegram.href}
          icon={<Icon name="telegram" tone="light" />}
          className="profile-card__contact profile-card__contact--telegram"
          external
        >
          {CONTACTS.telegram.label}
        </Button>
      </div>
    </div>
  );
}
