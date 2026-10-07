import { FOOTER } from "@/constants";
import { CONTACTS, EXTERNAL_LINK_PROPS, SECTION_IDS, isExternalUrl } from "@/utils";
import { Button, Icon, Typography } from "@/components/ui";
import "./footer.scss";

const LINKS = [CONTACTS.telegram, CONTACTS.phone, CONTACTS.email];

/** ui-kit → footer (0:5661): Default (desktop) / mobile. */
export function Footer() {
  return (
    <footer id={SECTION_IDS.contacts} className="site-footer">
      <div className="site-footer__contact">
        <div className="site-footer__content">
          {/* 48 → 64px Bold — крупнее h2 и отдельным стилем в Figma не оформлен */}
          <h2 className="site-footer__title">
            {FOOTER.titleStart}
            <br />
            <span className="site-footer__title-accent">{FOOTER.titleAccent}</span>
          </h2>
          <Typography variant="t1" color="blue-200" className="site-footer__text">
            {FOOTER.text}
          </Typography>
        </div>
        <div className="site-footer__actions">
          <Button href={CONTACTS.telegram.href} icon={<Icon name="telegram" tone="muted" />} external>
            Написать
          </Button>
          <Button mode="2" href={CONTACTS.phone.href} icon={<Icon name="phone" tone="light" />}>
            {CONTACTS.phone.label}
          </Button>
        </div>
      </div>

      <div className="site-footer__bottom">
        <ul className="site-footer__links">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="site-footer__link"
                {...(isExternalUrl(link.href) ? EXTERNAL_LINK_PROPS : {})}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="site-footer__copyright">{FOOTER.copyright}</p>
      </div>
    </footer>
  );
}
