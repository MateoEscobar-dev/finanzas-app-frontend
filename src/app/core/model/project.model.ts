export interface Member {
  img: string
  name: string
}

export interface Project {
  id: number
  title: string
  state: string
  shortDesc?: string
  totalTasks: number
  totalComments: number
  memberList: Member[]
  totalMembers: number
  progress: number
  image?: string
  startDate?: string
  startTime?: string
  endDate?: string
  endTime?: string
  totalBudget?: string
}

export interface TeamMember {
  value: string
  name: string
  image: string
}

export interface GanttProjectItem {
  id: string
  name: string
  status: string
  icon: string
}
