export interface AssignTo {
  avatar: string
}
export interface Project {
  title: string
  task: string
  created_on: string
  members: string[]
}

export interface StatisticsItem {
  icon: string
  variant: string
  title: string
  noOfProject: number
}

export interface DailyTask {
  title: string
  shortDesc: string
  time: string
  teamSize: number
}

export interface TeamMember {
  avatar: string
  name: string
  designation: string
  experience: string
}

export interface Order {
  orderId: string
  avatar: string
  name: string
  projectName: string
  country: string
  city: string
  date: string
  orderStatus: string
}

export interface Client {
  avatar: string
  verifiedClient?: boolean
  name: string
  emailId: string
  completedProject: number
}

export interface ManagementProject {
  icon: string
  variant: string
  title: string
  subTitle: string
  hours: number
  task: string
  assignTo: AssignTo[]
}

export interface ManagementClient {
  avatar: string
  name: string
  companyName: string
  date: string
}

export interface MonthlyProgressItem {
  avatar: string
  name: string
  emailId: string
  projectName: string
  status: string
}

export interface ManagementTask {
  icon: string
  variant: string
  title: string
  totalTask?: number
  completedTask?: number
  progressValue?: number
}

export interface Message {
  id: number
  userPic?: string
  userName: string
  text: string
  postedOn: string
}
