
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
  deadline?: string;
  status: string;
  description?:string;
  imagePath?: string;
  audioPath?: string;
  dateCreate?: string;
}

export interface TaskStatus {
  id?: number,
  title: string;
}

export interface TaskCategory {
  id?: number,
  title: string;
}

export interface TaskPriority {
  id?: number,
  title: string;
}
