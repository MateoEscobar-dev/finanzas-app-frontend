export interface CheckListItem {
  id: number
  title: string
  completed: boolean
}

export interface Comment {
  id: number
  author: string
  text: string
  posted_on: string
  author_avatar: string
  replies?: Comment[]
}

export interface AttachmentItem {
  id: number
  filename: string
  size: string
  projectImg?: string
  logo?: string
}

export interface ListTaskItem {
  id: number
  title: string
  assignee_avatar: string
  assigned_to: string
  due_date: string
  description: string
  checklists: CheckListItem[]
  attachments: AttachmentItem[]
  comments: Comment[]
  completed: boolean
  stage: string
  subtasks?: string
  priority: string
}

export interface KanbanTaskItem {
  id: number
  title: string
  status: string
  priority: string
  userAvatar: string
  project: string
  totalComments: number
  totalSubTasks: number
  user: string
  dueDate: string
}
