/** Кадрирование заливки из Figma — в % от рамки. */
export type Crop = { width: string; height: string; left: string; top: string };

export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  /** Если не задано — картинка просто object-fit: cover. */
  crop?: Crop;
};

export type Project = {
  id: string;
  kicker: string;
  title: string;
  /** Короткое название для кнопки «следующий проект» на мобильных. */
  shortTitle?: string;
  description: string;
  badge?: string;
  /** Чипсы, которые появляются на картинке при наведении (вариант карточки в ui-kit). */
  tags?: string[];
  image?: ProjectImage;
  /** Ссылка на страницу кейса (`/projects/<id>`) или «#», пока кейса нет. */
  href: string;
};
