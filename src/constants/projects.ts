import type { Project } from "@/types";
import { ROUTES } from "./navigation";

/** Порядок важен: он же задаёт кнопку «следующий проект» на страницах кейсов. */
export const PROJECTS: Project[] = [
  {
    id: "sellsaver",
    kicker: "Сервис ценовой оптимизации",
    title: "SellSaver",
    badge: "6,5% конверсия в регистрацию",
    description:
      "Спроектировала дашборды и 12+ пользовательских сценариев для платформы ценовой оптимизации. Лендинг дал 6,5% конверсию в регистрацию на старте.",
    tags: ["Web", "Mobile", "Desktop"],
    image: {
      src: "/images/projects/sellsaver.png",
      width: 4096,
      height: 3072,
      crop: { width: "114.27%", height: "166.07%", left: "-11.65%", top: "-25.7%" },
    },
    href: ROUTES.project("sellsaver"),
  },
  {
    id: "smart",
    kicker: "Платформа для выпускников, NDA",
    title: "Компания «Смарт»",
    shortTitle: "«Смарт»",
    description:
      "Спроектировала раздел для выпускников ведущего вуза России — 4 роли, трёхступенчатая модерация, витрина вакансий и личные кабинеты.",
    image: { src: "/images/projects/smart-nda.png", width: 996, height: 376 },
    href: ROUTES.project("smart"),
  },
  {
    id: "hairgrad",
    kicker: "Интернет-магазин с админ. панелью",
    title: "HairGrad",
    description:
      "Спроектировала и сдала в разработку интернет-магазин с полным UI-kitом из 40+ компонентов. Каталог, корзина, оформление заказа, личный кабинет.",
    image: { src: "/images/projects/hairgrad.png", width: 996, height: 514 },
    href: ROUTES.project("hairgrad"),
  },
  {
    id: "newdex",
    kicker: "Образовательная платформа",
    title: "Newdex",
    badge: "500+ активных студентов",
    description:
      "Вывела в релиз образовательную платформу для вузов — личный кабинет студента, панель преподавателя и блоки обучения. 500+ студентов используют ежедневно.",
    image: { src: "/images/projects/newdex.png", width: 3582, height: 2190 },
    href: ROUTES.project("newdex"),
  },
  {
    id: "mapins",
    kicker: "Образовательная платформа",
    title: "Мапинс",
    badge: "500+ активных студентов",
    description:
      "Единолично отвечала за весь UX/UI продукта в течение года — от исследований до фидбэков. Выстроила полный цикл проектирования мобильного приложения.",
    href: ROUTES.project("mapins"),
  },
];
