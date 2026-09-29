export type Link = { label: string; href: string };

export type Person = {
  shortName: string;
  fullName: string;
  role: string;
  city: string;
  status: string;
};

export type Fact = {
  /** Части заголовка: чётные — обычный текст, нечётные — полужирный. */
  title: string[];
  description?: string;
};

export type SkillGroup = { title: string; items: string[] };

export type Job = { period: string; role: string; place: string };

export type Education = { university: string; program: string; details: string };

export type FooterContent = {
  titleStart: string;
  titleAccent: string;
  text: string;
  copyright: string;
};
