export type AssignTo = {
  avatar: string
}
export type Project = {
  title: string
  task: string
  created_on: string
  members: string[]
}

export type StatisticsItem = {
  icon: string
  variant: string
  title: string
  noOfProject: number
}

export type DailyTask = {
  title: string
  shortDesc: string
  time: string
  teamSize: number
}

export type TeamMember = {
  avatar: string
  name: string
  designation: string
  experience: string
}

export type Order = {
  orderId: string
  avatar: string
  name: string
  projectName: string
  country: string
  city: string
  date: string
  orderStatus: string
}

export type Client = {
  avatar: string
  verifiedClient?: Boolean
  name: string
  emailId: string
  completedProject: number
}

export type ManagementProject = {
  icon: string
  variant: string
  title: string
  subTitle: string
  hours: number
  task: string
  assignTo: Array<AssignTo>
}

export type ManagementClient = {
  avatar: string
  name: string
  companyName: string
  date: string
}

export type MonthlyProgressItem = {
  avatar: string
  name: string
  emailId: string
  projectName: string
  status: string
}

export type ManagementTask = {
  icon: string
  variant: string
  title: string
  totalTask?: number
  completedTask?: number
  progressValue?: number
}

export type Message = {
  id: number
  userPic?: string
  userName: string
  text: string
  postedOn: string
}
