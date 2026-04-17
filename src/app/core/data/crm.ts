import {
  Client,
  DailyTask,
  ManagementClient,
  ManagementProject,
  ManagementTask,
  Message,
  MonthlyProgressItem,
  Order,
  Project,
  StatisticsItem,
  TeamMember,
} from '../model/crm.model'

const avatar1 = '/assets/images/users/avatar-1.jpg'
const avatar2 = '/assets/images/users/avatar-2.jpg'
const avatar3 = '/assets/images/users/avatar-3.jpg'
const avatar4 = '/assets/images/users/avatar-4.jpg'
const avatar5 = '/assets/images/users/avatar-5.jpg'
const avatar6 = '/assets/images/users/avatar-6.jpg'
const avatar7 = '/assets/images/users/avatar-7.jpg'
const avatar8 = '/assets/images/users/avatar-8.jpg'
const avatar9 = '/assets/images/users/avatar-9.jpg'
const avatar10 = '/assets/images/users/avatar-10.jpg'

const projectList: Project[] = [
  {
    title: 'Project Dashboard',
    task: 'New Task Assign',
    created_on: '4 Hrs ago',
    members: [avatar1, avatar2],
  },
  {
    title: 'Admin Template',
    task: 'New Task Assign',
    created_on: '7 Hrs ago',
    members: [avatar3, avatar4],
  },
  {
    title: 'Client Project',
    task: 'New Task Assign',
    created_on: '1 Day ago',
    members: [avatar5, avatar6],
  },
]

const statisticsData: StatisticsItem[] = [
  {
    icon: 'mdi mdi-file-document-edit',
    variant: 'primary',
    title: 'Active Projects',
    noOfProject: 85,
  },
  {
    icon: 'mdi mdi-account-group',
    variant: 'success',
    title: 'Total Employees',
    noOfProject: 32,
  },
  {
    icon: 'mdi mdi-account-star',
    variant: 'info',
    title: 'Project Reviews',
    noOfProject: 40,
  },
  {
    icon: 'mdi mdi-folder-plus',
    variant: 'warning',
    title: 'New Projects',
    noOfProject: 25,
  },
]

const tasksData: DailyTask[] = [
  {
    title: 'Landing Page Design',
    shortDesc: 'Create a new landing page (Saas Product)',
    time: '2 Hrs ago',
    teamSize: 5,
  },
  {
    title: 'Admin Dashboard',
    shortDesc: 'Create a new Admin dashboard',
    time: '3 Hrs ago',
    teamSize: 2,
  },
  {
    title: 'Client Work',
    shortDesc: 'Create a new Power Project (Sktech design)',
    time: '5 Hrs ago',
    teamSize: 2,
  },
  {
    title: 'UI/UX Design',
    shortDesc: 'Create a new UI Kit in figma',
    time: '6 Hrs ago',
    teamSize: 3,
  },
]

const members: TeamMember[] = [
  {
    avatar: avatar2,
    name: 'Risa Pearson',
    designation: 'UI/UX Designer',
    experience: '2.5 Year',
  },
  {
    avatar: avatar3,
    name: 'Margaret D. Evans',
    designation: 'PHP Developer',
    experience: '2 Year',
  },
  {
    avatar: avatar4,
    name: 'Bryan J. Luellen',
    designation: 'Front end Developer',
    experience: '1 Year',
  },
  {
    avatar: avatar5,
    name: 'Kathryn S. Collier',
    designation: 'UI/UX Designer',
    experience: '3 Year',
  },
  {
    avatar: avatar1,
    name: 'Timothy Kauper',
    designation: 'Backend Developer',
    experience: '2 Year',
  },
  {
    avatar: avatar6,
    name: 'Zara Raws',
    designation: 'Python Developer',
    experience: '1 Year',
  },
]

const orderData: Order[] = [
  {
    orderId: '#CM9708',
    avatar: avatar1,
    name: 'Jerry Geiger',
    projectName: 'Landing Page',
    country: 'New York',
    city: 'Meadow Lane Oakland',
    date: '01 January 2022',
    orderStatus: 'In Progress',
  },
  {
    orderId: '#CM9707',
    avatar: avatar2,
    name: 'Adam Thomas',
    projectName: 'Client Project (Sktech)',
    country: 'Canada',
    city: 'Bagwell Avenue Ocala',
    date: '02 January 2022',
    orderStatus: 'Complete',
  },
  {
    orderId: '#CM9706',
    avatar: avatar3,
    name: 'Sara Lewis',
    projectName: 'Admin Dashboard',
    country: 'Denmark',
    city: 'Washburn Baton Rouge',
    date: '03 January 2022',
    orderStatus: 'Pending',
  },
  {
    orderId: '#CM9705',
    avatar: avatar4,
    name: 'Myrtle Johnson',
    projectName: 'Landing Page (Figma)',
    country: 'Brazil',
    city: 'Nest Lane Olivette',
    date: '04 January 2022',
    orderStatus: 'Delivered',
  },
  {
    orderId: '#CM9704',
    avatar: avatar5,
    name: 'Bryan Collier',
    projectName: 'App Landing Page',
    country: 'Mexico',
    city: 'Larry San Francisco',
    date: '05 January 2022',
    orderStatus: 'In Progress',
  },
  {
    orderId: '#CM9703',
    avatar: avatar6,
    name: 'Joshua Moody',
    projectName: 'CRM Admin pages',
    country: 'Russia',
    city: 'Oak Drive Mobile',
    date: '06 January 2022',
    orderStatus: 'Complete',
  },
  {
    orderId: '#CM9702',
    avatar: avatar7,
    name: 'John Clune',
    projectName: 'Ecommerce Dashboard',
    country: 'Manitoba',
    city: 'Oxford Court Amory',
    date: '07 January 2022',
    orderStatus: 'Delivered',
  },
  {
    orderId: '#CM9701',
    avatar: avatar8,
    name: 'Jamie Romero',
    projectName: 'Logo Design',
    country: 'Nova Scotia',
    city: 'Lane New Market',
    date: '08 January 2022',
    orderStatus: 'Pending',
  },
  {
    orderId: '#CM9700',
    avatar: avatar9,
    name: 'Clint Percival',
    projectName: 'PHP Project',
    country: 'Manitoba',
    city: 'Wilson Avenue Dallas',
    date: '09 January 2022',
    orderStatus: 'Delivered',
  },
  {
    orderId: '#CM9699',
    avatar: avatar10,
    name: 'Donna Lynch',
    projectName: 'Landing Section',
    country: 'Yukon',
    city: 'Avenue Johnson country',
    date: '10 January 2022',
    orderStatus: 'Complete',
  },
]

const clients: Client[] = [
  {
    avatar: avatar1,
    verifiedClient: true,
    name: 'Louise Coleman',
    emailId: 'louisemcoleman@dayrep.com',
    completedProject: 18,
  },
  {
    avatar: avatar2,
    verifiedClient: true,
    name: 'Robert Kent',
    emailId: 'robertskent@jourrapide.com',
    completedProject: 24,
  },
  {
    avatar: avatar3,
    name: 'Arthur Childress',
    emailId: 'arthurechildress@teleworm.us',
    completedProject: 11,
  },
  {
    avatar: avatar4,
    verifiedClient: true,
    name: 'Ronald McGehee',
    emailId: 'ronaldhmcgehee@jourrapide.com',
    completedProject: 6,
  },
  {
    avatar: avatar5,
    verifiedClient: true,
    name: 'Martin Jordan',
    emailId: 'martindjordan@armyspy.com',
    completedProject: 12,
  },
  {
    avatar: avatar6,
    name: 'Dewayne Murphy',
    emailId: 'dewaynebmurphy@armyspy.com',
    completedProject: 15,
  },
  {
    avatar: avatar7,
    verifiedClient: true,
    name: 'Russel Sanchez',
    emailId: 'russelhsanchez@rhyta.com',
    completedProject: 22,
  },
  {
    avatar: avatar8,
    name: 'Alvin Middleton',
    emailId: 'alvinsmiddleton@armyspy.com',
    completedProject: 7,
  },
]

const projectsData: ManagementProject[] = [
  {
    icon: 'mdi mdi-shopping-outline',
    variant: 'primary',
    title: 'Ecommerce App Design',
    subTitle: 'Dashboard, Pages & Auth Pages',
    hours: 145,
    task: '16',
    assignTo: [
      {
        avatar: avatar1,
      },
      {
        avatar: avatar2,
      },
      {
        avatar: avatar3,
      },
    ],
  },
  {
    icon: 'mdi mdi-account-network',
    variant: 'success',
    title: 'Client Power System',
    subTitle: 'Dashboard, Power System Pages',
    hours: 260,
    task: '24',
    assignTo: [
      {
        avatar: avatar4,
      },
      {
        avatar: avatar3,
      },
    ],
  },
  {
    icon: 'mdi mdi-page-layout-header',
    variant: 'info',
    title: 'Landing Pages Design',
    subTitle: 'Business Landing with Auth Pages',
    hours: 48,
    task: '05',
    assignTo: [
      {
        avatar: avatar5,
      },
      {
        avatar: avatar6,
      },
    ],
  },
  {
    icon: 'mdi mdi-monitor-dashboard',
    variant: 'danger',
    title: 'Business Dashboard Design',
    subTitle: 'Dashboard, Components Pages',
    hours: 24,
    task: '08',
    assignTo: [
      {
        avatar: avatar5,
      },
      {
        avatar: avatar6,
      },
      {
        avatar: avatar1,
      },
      {
        avatar: avatar2,
      },
    ],
  },
]

const managementclients: ManagementClient[] = [
  {
    avatar: avatar1,
    name: 'Kevin Snowden',
    companyName: 'Simple Solutions LLC',
    date: 'Jan 05 2022',
  },
  {
    avatar: avatar2,
    name: 'Steven Embry',
    companyName: 'Flipside Records LLC',
    date: 'Jan 10 2022',
  },
  {
    avatar: avatar3,
    name: 'James McDonald',
    companyName: 'Vision Clinics LLC',
    date: 'Jan 12 2022',
  },
  {
    avatar: avatar5,
    name: 'Ralph Wolford',
    companyName: 'Merry-Go-Round LLC',
    date: 'Jan 18 2022',
  },
  {
    avatar: avatar6,
    name: 'Tomas Cooper',
    companyName: 'Museum LLC',
    date: 'Feb 02 2022',
  },
]

const progressDetails: MonthlyProgressItem[] = [
  {
    avatar: avatar1,
    name: 'Adam Baldwin',
    emailId: 'AdamNBaldwin@dayrep.com',
    projectName: 'Admin Dashboard',
    status: 'In Progress',
  },
  {
    avatar: avatar2,
    name: 'Peter Wallace',
    emailId: 'PeterGWallace@dayrep.com',
    projectName: 'Landing Page',
    status: 'Completed',
  },
  {
    avatar: avatar3,
    name: 'Jacob Dunn',
    emailId: 'JacobEDunn@dayrep.com',
    projectName: 'Logo Design',
    status: 'Pending',
  },
  {
    avatar: avatar4,
    name: 'Terry Adams',
    emailId: 'TerryCAdams@dayrep.com',
    projectName: 'Client Project',
    status: 'In Progress',
  },
  {
    avatar: avatar5,
    name: 'Jason Stovall',
    emailId: 'JasonJStovall@armyspy.com',
    projectName: 'Figma Work',
    status: 'Pending',
  },
]

const tasks: ManagementTask[] = [
  {
    icon: 'mdi mdi-file-edit',
    variant: 'primary',
    title: 'Running Project',
    totalTask: 160,
    completedTask: 145,
    progressValue: 91,
  },
  {
    icon: 'mdi mdi-account-multiple',
    variant: 'success',
    title: 'Active Clients',
    totalTask: 85,
    completedTask: 40,
    progressValue: 47,
  },
  {
    icon: 'mdi mdi-account-multiple-plus',
    variant: 'danger',
    title: 'New Request',
    progressValue: 68,
  },
  {
    icon: 'mdi mdi-emoticon-happy',
    variant: 'info',
    title: 'Happy Clients',
    totalTask: 50,
    completedTask: 48,
    progressValue: 90,
  },
]

const chatMessages: Message[] = [
  {
    id: 1,
    userPic: avatar1,
    userName: 'Geneva',
    text: 'Hello!',
    postedOn: '10:00',
  },
  {
    id: 2,
    userPic: avatar5,
    userName: 'Dominic',
    text: 'Hi, How are you? What about our next meeting?',
    postedOn: '10:01',
  },
  {
    id: 3,
    userPic: avatar1,
    userName: 'Geneva',
    text: 'Yeah everything is fine',
    postedOn: '10:02',
  },
  {
    id: 4,
    userPic: avatar5,
    userName: 'Dominic',
    text: "Wow that's great!",
    postedOn: '10:03',
  },
  {
    id: 5,
    userPic: avatar1,
    userName: 'Dominic',
    text: 'Cool!',
    postedOn: '10:03',
  },
]

export {
  projectList,
  statisticsData,
  tasksData,
  members,
  orderData,
  clients,
  projectsData,
  managementclients,
  progressDetails,
  tasks,
  chatMessages,
}
