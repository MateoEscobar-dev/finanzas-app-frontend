import { GanttProjectItem, Project } from '@core/model/project.model'
import { Task } from '@lib/frappe-gantt/index'

// images
const projectImg1 = 'assets/images/projects/project-1.jpg'
const projectImg2 = 'assets/images/projects/project-2.jpg'
const projectImg3 = 'assets/images/projects/project-3.jpg'
const projectImg4 = 'assets/images/projects/project-4.jpg'

const projects: Project[] = [
  {
    id: 1,
    title: 'App design and development',
    state: 'Finished',
    shortDesc:
      'With supporting text below as a natural lead-in to additional contenposuere erat a ante',
    totalTasks: 21,
    totalComments: 741,
    memberList: [
      { img: 'assets/images/users/avatar-6.jpg', name: 'Mat Helme' },
      { img: 'assets/images/users/avatar-7.jpg', name: 'Michael Zenaty' },
      { img: 'assets/images/users/avatar-8.jpg', name: 'James Anderson' },
    ],
    totalMembers: 10,
    progress: 100,
  },
  {
    id: 2,
    title: 'Coffee detail page - Main Page',
    state: 'Ongoing',
    shortDesc:
      'This card has supporting text below as a natural lead-in to additional content is a little bit longer',
    totalTasks: 81,
    totalComments: 103,
    memberList: [
      { img: 'assets/images/users/avatar-1.jpg', name: 'Mat Helme' },
      { img: 'assets/images/users/avatar-2.jpg', name: 'Michael Zenaty' },
      { img: 'assets/images/users/avatar-3.jpg', name: 'James Anderson' },
    ],
    totalMembers: 6,
    progress: 28,
  },
  {
    id: 3,
    title: 'Poster illustration design',
    state: 'Ongoing',
    shortDesc:
      'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid',
    totalTasks: 12,
    totalComments: 482,
    memberList: [
      { img: 'assets/images/users/avatar-4.jpg', name: 'Mat Helme' },
      { img: 'assets/images/users/avatar-5.jpg', name: 'Michael Zenaty' },
    ],
    totalMembers: 2,
    progress: 63,
  },
  {
    id: 4,
    title: 'Drinking bottle graphics',
    state: 'Finished',
    shortDesc:
      "Some quick example text to build on the card title and make up the bulk of the card's content",
    totalTasks: 50,
    totalComments: 208,
    memberList: [
      { img: 'assets/images/users/avatar-10.jpg', name: 'Mat Helme' },
      { img: 'assets/images/users/avatar-5.jpg', name: 'Michael Zenaty' },
      { img: 'assets/images/users/avatar-6.jpg', name: 'James Anderson' },
    ],
    totalMembers: 5,
    progress: 100,
  },
  {
    id: 5,
    title: 'Company logo design',
    state: 'Ongoing',
    image: projectImg1,
    totalTasks: 3,
    totalComments: 104,
    memberList: [
      { img: 'assets/images/users/avatar-3.jpg', name: 'Mat Helme' },
      { img: 'assets/images/users/avatar-5.jpg', name: 'Mat Helme' },
      { img: 'assets/images/users/avatar-9.jpg', name: 'James Anderson' },
    ],
    totalMembers: 3,
    progress: 45,
  },
  {
    id: 6,
    title: 'Landing page design - Home',
    state: 'Finished',
    image: projectImg2,
    totalTasks: 11,
    totalComments: 254,
    memberList: [
      { img: 'assets/images/users/avatar-10.jpg', name: 'Mat Helme' },
      { img: 'assets/images/users/avatar-5.jpg', name: 'Mat Helme' },
      { img: 'assets/images/users/avatar-7.jpg', name: 'James Anderson' },
    ],
    totalMembers: 5,
    progress: 100,
  },
  {
    id: 7,
    title: 'Product page redesign',
    state: 'Ongoing',
    image: projectImg3,
    totalTasks: 21,
    totalComments: 668,
    memberList: [
      { img: 'assets/images/users/avatar-6.jpg', name: 'Mat Helme' },
      { img: 'assets/images/users/avatar-7.jpg', name: 'Mat Helme' },
      { img: 'assets/images/users/avatar-8.jpg', name: 'James Anderson' },
    ],
    totalMembers: 5,
    progress: 71,
  },
  {
    id: 8,
    title: 'Coffee detail page - Main Page',
    state: 'Ongoing',
    image: projectImg4,
    totalTasks: 18,
    totalComments: 259,
    memberList: [
      { img: 'assets/images/users/avatar-2.jpg', name: 'Mat Helme' },
      { img: 'assets/images/users/avatar-3.jpg', name: 'Michael Zenaty' },
    ],
    totalMembers: 2,
    progress: 52,
  },
]

const tasks: Task[] = [
  {
    id: '1',
    name: 'Draft the new contract document for sales team',
    start: '2019-07-16',
    end: '2019-07-20',
    progress: 55,
    dependencies: '0',
  },
  {
    id: '2',
    name: 'Find out the old contract documents',
    start: '2019-07-19',
    end: '2019-07-21',
    progress: 85,
    dependencies: '1',
  },
  {
    id: '3',
    name: 'Organize meeting with sales associates to understand need in detail',
    start: '2019-07-21',
    end: '2019-07-22',
    progress: 80,
    dependencies: '2',
  },
  {
    id: '4',
    name: 'iOS App home page',
    start: '2019-07-15',
    end: '2019-07-17',
    progress: 80,
    dependencies: '0',
  },
  {
    id: '5',
    name: 'Write a release note',
    start: '2019-07-18',
    end: '2019-07-22',
    progress: 65,
    dependencies: '4',
  },
  {
    id: '6',
    name: 'Setup new sales project',
    start: '2019-07-20',
    end: '2019-07-31',
    progress: 15,
    dependencies: '0',
  },
  {
    id: '7',
    name: 'Invite user to a project',
    start: '2019-07-25',
    end: '2019-07-26',
    progress: 99,
    dependencies: '6',
  },
  {
    id: '8',
    name: 'Coordinate with business development',
    start: '2019-07-28',
    end: '2019-07-30',
    progress: 35,
    dependencies: '7',
  },
  {
    id: '9',
    name: 'Kanban board design',
    start: '2019-08-01',
    end: '2019-08-03',
    progress: 25,
    dependencies: '8',
  },
  {
    id: '10',
    name: 'Enable analytics tracking',
    start: '2019-08-05',
    end: '2019-08-07',
    progress: 60,
    dependencies: '9',
  },
]

const ganttprojects: GanttProjectItem[] = [
  {
    id: 'proj101',
    name: 'Lunar',
    status: 'On-Track',
    icon: 'uil uil-moonset',
  },
  {
    id: 'proj102',
    name: 'Dark Moon',
    status: 'On-Track',
    icon: 'uil uil-moon-eclipse',
  },
  {
    id: 'proj103',
    name: 'Aurora',
    status: 'Locked',
    icon: 'uil uil-mountains',
  },
  {
    id: 'proj104',
    name: 'Blue Moon',
    status: 'Locked',
    icon: 'uil uil-moon',
  },
  {
    id: 'proj105',
    name: 'Casanova',
    status: 'Delayed',
    icon: 'uil uil-ship',
  },
  {
    id: 'proj106',
    name: 'Darwin',
    status: 'On-Track',
    icon: 'uil uil-subway-alt',
  },
  {
    id: 'proj107',
    name: 'Eagle',
    status: 'Delayed',
    icon: 'uil uil-gold',
  },
]

export { projects, tasks, ganttprojects }
