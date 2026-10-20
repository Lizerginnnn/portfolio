/* eslint-disable @next/next/no-img-element -- мелкие иконки макета, оптимизатор next/image здесь не нужен */
import { cn, withBasePath } from "@/utils";
import { CalendarFit } from "./calendar-fit";
import "./case-calendar-demo.scss";

/**
 * Анимированный календарь студента NewDex — один в один с макетом «ЛК студента_Календарь» (Figma 919:35200):
 * курсор наводится на даты, кликает по 10 мая, справа выезжает панель дня (919:35111), потом закрывается.
 * Холст — страница 1920 × 1180 px макета, все размеры в SCSS заданы в пикселях макета и масштабируются по ширине.
 * Иконки — из файла макета (public/images/cases/newdex/calendar).
 */

const icon = (name: string) => withBasePath(`/images/cases/newdex/calendar/${name}`);

/** Цвета курсов из макета: calendar/ultramarine, blue, green, lime, yellow, purple, raspberry. */
type Course = "ultramarine" | "lime" | "yellow" | "raspberry";

type CalendarEvent =
  | { kind: "class"; course: Course; time: string; title: string }
  | { kind: "deadline"; course: Course; time: string; title: string }
  | { kind: "test"; course: Course; time: string; title: string }
  | { kind: "start"; time: string; title: string }
  | { kind: "more"; count: number };

type Day = {
  label: string;
  outside?: boolean;
  today?: boolean;
  events?: CalendarEvent[];
  /** Ячейка, на которую наводится или кликает курсор, — своя анимация. */
  animated?: "hover-21" | "hover-14" | "pick-10";
};

const DEADLINE_TITLE = "Дедлайн модуля 1: Введение в профессию";

const lesson = (course: Course, time = "15:10"): CalendarEvent => ({ kind: "class", course, time, title: "Лекция" });
const deadline = (course: Course, time = "13:30"): CalendarEvent => ({ kind: "deadline", course, time, title: DEADLINE_TITLE });
const test = (course: Course): CalendarEvent => ({ kind: "test", course, time: "13:30", title: "Контрольная работа №2" });
const start: CalendarEvent = { kind: "start", time: "15:10", title: "Старт модуля 3" };
const more: CalendarEvent = { kind: "more", count: 4 };

const april = { label: "30 апр", outside: true };

// сетка из макета, включая его даты
const WEEKS: Day[][] = [
  [april, april, april, april, april, april, { label: "1" }],
  [
    { label: "1" },
    { label: "3" },
    { label: "4" },
    { label: "5" },
    { label: "6", today: true, events: [test("ultramarine")] },
    { label: "7", events: [lesson("ultramarine")] },
    { label: "8" },
  ],
  [
    { label: "9" },
    { label: "10", events: [deadline("ultramarine"), lesson("ultramarine"), start, more], animated: "pick-10" },
    { label: "11" },
    { label: "12" },
    { label: "13" },
    { label: "14", events: [deadline("ultramarine"), lesson("ultramarine")], animated: "hover-14" },
    { label: "15" },
  ],
  [
    { label: "16" },
    { label: "17" },
    { label: "18" },
    { label: "19" },
    { label: "20" },
    { label: "21", events: [lesson("lime", "13:10"), lesson("ultramarine")], animated: "hover-21" },
    { label: "22" },
  ],
  [
    { label: "23" },
    { label: "24", events: [lesson("yellow"), deadline("yellow", "17:30")] },
    { label: "25" },
    { label: "1", events: [start, test("raspberry")] },
    { label: "27" },
    { label: "28" },
    { label: "29" },
  ],
  [
    { label: "30" },
    { label: "1 июн", outside: true },
    { label: "2 июн", outside: true, events: [deadline("ultramarine"), lesson("ultramarine"), start, more] },
    { label: "3 июн", outside: true },
    { label: "4 июн", outside: true },
    { label: "5 июн", outside: true },
    { label: "6 июн", outside: true },
  ],
];

const WEEKDAYS = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

// мини-календарь из макета: 3 — сегодня, 17 — выбранная дата (по клику выбор переходит на 10)
const MINI_WEEKS: { d: number; outside?: boolean }[][] = [
  [{ d: 26, outside: true }, { d: 27, outside: true }, { d: 28, outside: true }, { d: 29, outside: true }, { d: 30, outside: true }, { d: 31, outside: true }, { d: 1 }],
  [1, 3, 4, 5, 6, 7, 8].map((d) => ({ d })),
  [9, 10, 11, 12, 13, 14, 15].map((d) => ({ d })),
  [16, 17, 18, 19, 20, 21, 22].map((d) => ({ d })),
  [23, 24, 25, 26, 27, 28, 29].map((d) => ({ d })),
  [30, 1, 2, 3, 4, 5, 6].map((d) => ({ d })),
];

const COURSES: { title: string; box: string | null }[] = [
  { title: "Программирование будущего\nи всякого такого", box: "checkbox-ultramarine.svg" },
  { title: "Математика 1 курс", box: "checkbox-blue.svg" },
  { title: "Разработка каких-то штук важных", box: "checkbox-green.svg" },
  // в макете курс не выбран — пустой чекбокс с жёлтой обводкой
  { title: "Разработка каких-то штук важных 2", box: null },
  { title: "Изучение чего-то неважного", box: "checkbox-purple.svg" },
  { title: "Философия 1 курс", box: "checkbox-raspberry.svg" },
];

const EVENT_TYPES = ["Занятия", "Дедлайны модулей", "Начала новых модулей", "Наблюдаемые испытания"];

function EventChip({ event, muted }: { event: CalendarEvent; muted?: boolean }) {
  if (event.kind === "more") {
    return (
      <span className="cal-demo__event cal-demo__event--more">
        <b>+{event.count}</b>
        <span>события еще</span>
      </span>
    );
  }

  if (event.kind === "start") {
    return (
      <span className="cal-demo__event cal-demo__event--start">
        <span className="cal-demo__event-lead">
          <span className="cal-demo__rocket">
            <img src={icon(muted ? "event-rocket-muted.svg" : "event-rocket.svg")} alt="" width={13} height={13} />
          </span>
          <b>{event.time}</b>
        </span>
        <span className="cal-demo__event-title">{event.title}</span>
      </span>
    );
  }

  const leadIcon = event.kind === "deadline" ? (muted ? "event-deadline-muted.svg" : "event-deadline.svg") : event.kind === "test" ? "event-test.svg" : null;

  return (
    <span className={cn("cal-demo__event", `cal-demo__event--${event.kind}`, `cal-demo__event--${event.course}`)}>
      <span className="cal-demo__event-lead">
        {leadIcon && <img src={icon(leadIcon)} alt="" width={12} height={12} />}
        <b>{event.time}</b>
      </span>
      <span className="cal-demo__event-title">{event.title}</span>
    </span>
  );
}

function DayCell({ day }: { day: Day }) {
  const hasEvents = Boolean(day.events?.length);
  return (
    <div
      className={cn(
        "cal-demo__cell",
        day.outside && "cal-demo__cell--outside",
        hasEvents && "cal-demo__cell--events",
        day.animated && `cal-demo__cell--${day.animated}`,
      )}
    >
      <span className={cn("cal-demo__date", day.today && "cal-demo__date--today")}>{day.label}</span>
      {hasEvents && (
        <div className="cal-demo__events">
          {day.events!.map((event, i) => (
            <EventChip key={i} event={event} muted={day.outside} />
          ))}
        </div>
      )}
    </div>
  );
}

type PanelItem = {
  bar: string;
  icon: string;
  /** Квадрат цвета курса перед иконкой — только у дедлайна. */
  square?: boolean;
  time: string;
  title: string;
  course: string;
  text?: string;
  link?: string;
  url?: string;
};

const DESCRIPTION =
  "Описание длиной в довольно большое количество символов, потому что кто-то совершенно точно захочет тут написать много важной информации для своих любимых студентов, которые проходят этот невероятно интересный курс";

const PANEL: PanelItem[] = [
  { bar: "red", icon: "panel-deadline.svg", square: true, time: "13:30", title: "Дедлайн модуля 1", course: "Программирование будущего и всякого такого", text: DESCRIPTION },
  { bar: "green", icon: "panel-book.svg", time: "15:30", title: "Лекция", course: "Сложные вычиления простых вещей", text: "Аудитория 312-3" },
  { bar: "purple", icon: "panel-book.svg", time: "15:30", title: "Старт модуля 3: изучение новых процессов", course: "Сложные вычиления простых вещей", link: "Перейти к урокам модуля ↗" },
  {
    bar: "tiffany",
    icon: "panel-test.svg",
    time: "13:30",
    title: "Контрольная работа №2",
    course: "Программирование будущего и всякого такого",
    text: DESCRIPTION,
    url: "https://www.zoom.com/proga/awAaRJc5QKHVDkbSuKz0Nu/Newdex?node-id=2-4&p=f&t=TloRSQAVroGdrO84-0",
  },
];

export function CaseCalendarDemo() {
  return (
    <CalendarFit
      className="cal-demo"
      label="Анимация календаря студента: курсор наводится на даты, кликает по 10 мая — справа открывается панель дня с дедлайном, лекцией, стартом модуля и контрольной работой, затем панель закрывается"
    >
      <div className="cal-demo__canvas" aria-hidden>
        <header className="cal-demo__header">
          <img className="cal-demo__logo" src={icon("logo.svg")} alt="" width={144} height={24} />
          <nav className="cal-demo__tabs">
            <span className="cal-demo__tab">Мои программы</span>
            <span className="cal-demo__tab">Личный кабинет</span>
            <span className="cal-demo__tab cal-demo__tab--active">Календарь</span>
          </nav>
          <span className="cal-demo__user">
            <img className="cal-demo__avatar" src={icon("avatar.webp")} alt="" width={40} height={40} />
            <span className="cal-demo__user-name">
              <span>Воронова</span>
              <span>Дарья Анатольевна</span>
            </span>
          </span>
        </header>

        <div className="cal-demo__title-row">
          <h3 className="cal-demo__title">Календарь</h3>
          <div className="cal-demo__month">
            <span>Май 2025</span>
            <span className="cal-demo__pagination">
              <img className="cal-demo__disabled" src={icon("month-prev.svg")} alt="" width={24} height={24} />
              <img src={icon("month-next.svg")} alt="" width={24} height={24} />
            </span>
          </div>
        </div>

        <aside className="cal-demo__filters">
          <div className="cal-demo__card cal-demo__card--mini">
            <div className="cal-demo__mini-head">
              <img className="cal-demo__disabled" src={icon("mini-prev.svg")} alt="" width={24} height={24} />
              <span>Май 2025</span>
              <img className="cal-demo__disabled" src={icon("mini-next.svg")} alt="" width={24} height={24} />
            </div>
            <div className="cal-demo__mini">
              {WEEKDAYS.map((d) => (
                <span key={d} className="cal-demo__mini-dow">
                  {d}
                </span>
              ))}
              {MINI_WEEKS.flatMap((week, w) =>
                week.map(({ d, outside }, i) => (
                  <span
                    key={`${w}-${i}`}
                    className={cn(
                      "cal-demo__mini-day",
                      outside && "cal-demo__mini-day--outside",
                      w === 1 && d === 3 && "cal-demo__mini-day--today",
                      w === 3 && d === 17 && "cal-demo__mini-day--chosen-17",
                      w === 2 && d === 10 && "cal-demo__mini-day--chosen-10",
                    )}
                  >
                    {d}
                  </span>
                )),
              )}
            </div>
          </div>

          <div className="cal-demo__card">
            <div className="cal-demo__card-head">
              <span>Мои курсы</span>
              <img src={icon("collapse.svg")} alt="" width={24} height={24} />
            </div>
            <div className="cal-demo__checks">
              {COURSES.map((course) => (
                <div key={course.title} className="cal-demo__check">
                  {course.box ? (
                    <img src={icon(course.box)} alt="" width={18} height={18} />
                  ) : (
                    <span className="cal-demo__box-empty" />
                  )}
                  <span className="cal-demo__check-label">{course.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="cal-demo__card">
            <div className="cal-demo__card-head">
              <span>Отображаемые события</span>
              <img src={icon("collapse.svg")} alt="" width={24} height={24} />
            </div>
            <div className="cal-demo__checks">
              {EVENT_TYPES.map((type) => (
                <div key={type} className="cal-demo__check">
                  <img src={icon("checkbox-checked.svg")} alt="" width={18} height={18} />
                  <span className="cal-demo__check-label">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="cal-demo__grid">
          {WEEKS.map((week, w) => (
            <div key={w} className="cal-demo__week">
              {week.map((day, i) => (
                <DayCell key={i} day={day} />
              ))}
            </div>
          ))}
        </div>

        <section className="cal-demo__panel">
          <img className="cal-demo__close" src={icon("panel-close.svg")} alt="" width={19} height={19} />
          <h4 className="cal-demo__panel-title">Вторник, 10 мая</h4>
          {PANEL.map((item) => (
            <div key={item.title} className="cal-demo__item">
              <span className={cn("cal-demo__bar", `cal-demo__bar--${item.bar}`)} />
              <div className="cal-demo__item-body">
                <div className="cal-demo__item-top">
                  <div className="cal-demo__item-head">
                    <span className="cal-demo__item-time">
                      {item.square && <span className="cal-demo__square" />}
                      <img src={icon(item.icon)} alt="" width={19} height={19} />
                      <b>{item.time}</b>
                    </span>
                    <b className="cal-demo__item-title">{item.title}</b>
                  </div>
                  <div className="cal-demo__tag">
                    <span>@tag2384o</span>
                    <span>Крутая программа про милых котиков</span>
                    <span className="cal-demo__tag-course">{item.course}</span>
                  </div>
                </div>
                {(item.text || item.url) && (
                  <div className="cal-demo__item-text">
                    {item.text && <p>{item.text}</p>}
                    {item.url && <p className="cal-demo__url">{item.url}</p>}
                  </div>
                )}
                {item.link && <span className="cal-demo__link">{item.link}</span>}
              </div>
            </div>
          ))}
        </section>

        <span className="cal-demo__ripple" />
        <svg className="cal-demo__cursor" viewBox="0 0 24 24">
          <path d="M5 3l14 8-6.5 1.5L9.5 19 5 3Z" fill="#1d1d1f" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </div>
    </CalendarFit>
  );
}
