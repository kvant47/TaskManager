
export interface TaskList {
  id?: number,
  title: string;
  items?: TaskItem[];
}

export interface TaskItem {
  id?: number,
  title: string;
  priority: string;
  category?: string;
  date?: string;
  status: string;
  description?:string;
  imagePath?: string;
  audioPath?: string;
}

export enum TaskStatus {
  NOT_STARTED = 'Сделать',
  IN_PROGRESS = 'В процессе',
  DONE = 'Выполнено'
}

export enum TaskCategory {
  WORK = 'Работа',
  STUDY = 'Учеба',
  FAMILY = 'Семья',
  LEISURE = 'Хобби',
  PERSONAL  = 'Личное',
  VACATION = 'Досуг',
  OTHER = 'Другое',
}

export enum TaskPriority {
  LOW = 'Не срочно',
  MEDIUN = 'Не тянуть',
  HIGH = 'Поторопиться',
  MAX = 'Срочно',
}
