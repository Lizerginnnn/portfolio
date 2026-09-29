import { FACTS, PERSON } from "@/constants";
import type { Fact } from "@/types";
import { cn } from "@/utils";
import { CroppedImage, ProfileCard, Typography } from "@/components/ui";
import "./hero.scss";

function HeroFact({ fact, className }: { fact: Fact; className?: string }) {
  return (
    <div className={cn("hero__fact", className)}>
      <Typography variant="t1" color="grey-7" className="hero__fact-title">
        {fact.title.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))}
      </Typography>
      {fact.description && (
        <Typography variant="t3" color="grey-4">
          {fact.description}
        </Typography>
      )}
    </div>
  );
}

/** Первый экран главной: имя, карточка профиля, факты и фото. */
export function Hero() {
  const [first, second, third] = FACTS;

  return (
    <section id="about" className="hero" aria-label="Обо мне">
      {/* h1 из Figma; до lg размер плавающий, чтобы имя помещалось рядом с фото (hero.scss) */}
      <Typography as="h1" variant={{ base: "h2", lg: "h1" }} color="grey-8" className="hero__name">
        {PERSON.fullName}
      </Typography>

      <ProfileCard className="hero__card" />

      {/* На десктопе — средняя колонка; на мобильных обёртка «растворяется» (display: contents) */}
      <div className="hero__middle">
        <HeroFact fact={first} className="hero__fact--first" />
        <HeroFact fact={second} className="hero__fact--second" />
      </div>

      <div className="hero__side">
        <div className="hero__photo">
          <div className="hero__photo-inner">
            {/* Кадрирование из Figma меняется по брейкпоинтам — значения в CSS-переменных (hero.scss) */}
            <CroppedImage
              src="/images/profile.webp"
              alt={PERSON.fullName}
              width={1800}
              height={2400}
              priority
              sizes="(min-width: 1280px) 620px, 240px"
              crop={{ width: "var(--crop-w)", height: "var(--crop-h)", left: "var(--crop-x)", top: "var(--crop-y)" }}
            />
          </div>
        </div>
        <HeroFact fact={third} className="hero__fact--third" />
      </div>
    </section>
  );
}
