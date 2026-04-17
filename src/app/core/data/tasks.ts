import { KanbanTaskItem, ListTaskItem } from '@core/model/tasks.model'

// images
const avatarImg1 = 'assets/images/users/avatar-1.jpg'
const avatarImg2 = 'assets/images/users/avatar-9.jpg'
const avatarImg3 = 'assets/images/users/avatar-3.jpg'
const avatarImg4 = 'assets/images/users/avatar-4.jpg'
const avatarImg5 = 'assets/images/users/avatar-5.jpg'
const avatarImg6 = 'assets/images/users/avatar-6.jpg'
const avatarImg7 = 'assets/images/users/avatar-7.jpg'
const avatarImg8 = 'assets/images/users/avatar-8.jpg'
const avatarImg9 = 'assets/images/users/avatar-2.jpg'
const avatarImg10 = 'assets/images/users/avatar-10.jpg'
const projectImg1 = 'assets/images/projects/project-1.jpg'

const todayTasks: ListTaskItem[] = [
  {
    id: 1,
    title: 'Draft the new contract document for sales team',
    assigned_to: 'Arya Stark',
    assignee_avatar: avatarImg2,
    due_date: 'Today 10am',
    completed: false,
    priority: 'High',
    stage: 'Todo',
    checklists: [
      { id: 1, title: 'Find out the old contract documents', completed: true },
      {
        id: 2,
        title: 'Organize meeting sales associates to understand need in detail',
        completed: false,
      },
      {
        id: 3,
        title: 'Make sure to cover every small details',
        completed: false,
      },
    ],
    description:
      // tslint:disable-next-line: max-line-length
      '<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>',
    attachments: [
      { id: 1, filename: 'sales-assets.zip', size: '2.3 MB', logo: '.ZIP' },
      {
        id: 2,
        filename: 'new-contarcts.docx',
        size: '1.3 MB',
        projectImg: projectImg1,
      },
    ],
    comments: [
      {
        id: 1,
        author: 'Arya Stark',
        text: 'Should I review the last 3 years legal documents as well?',
        posted_on: '4:30am',
        author_avatar: avatarImg2,
      },
      {
        id: 2,
        author: 'Gary Somya',
        text: '@Arya FYI..I have created some general guidelines last year.',
        posted_on: '3:30am',
        author_avatar: avatarImg3,
      },
    ],
  },
  {
    id: 2,
    title: 'iOS App home page',
    assigned_to: 'James B',
    assignee_avatar: avatarImg9,
    due_date: 'Today 4pm',
    completed: false,
    stage: 'In-progress',
    priority: 'High',
    checklists: [
      { id: 1, title: 'Find out the old contract documents', completed: false },
      {
        id: 2,
        title: 'Organize meeting sales associates to understand need in detail',
        completed: false,
      },
      {
        id: 3,
        title: 'Make sure to cover every small details',
        completed: false,
      },
    ],
    description:
      // tslint:disable-next-line: max-line-length
      '<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>',
    attachments: [
      { id: 1, filename: 'sales-assets.zip', size: '2.3 MB' },
      { id: 2, filename: 'new-contarcts.docx', size: '1.3 MB' },
    ],
    comments: [
      {
        id: 1,
        author: 'Arya Stark',
        text: 'Should I review the last 3 years legal documents as well?',
        posted_on: '4:30am',
        author_avatar: avatarImg2,
      },
      {
        id: 2,
        author: 'Gary Somya',
        text: '@Arya FYI..I have created some general guidelines last year.',
        posted_on: '3:30am',
        author_avatar: avatarImg3,
      },
    ],
  },
  {
    id: 3,
    title: 'Write a release note',
    assigned_to: 'Kevin C',
    assignee_avatar: avatarImg4,
    due_date: 'Today 4pm',
    completed: false,
    stage: 'In-progress',
    priority: 'Medium',
    checklists: [
      { id: 1, title: 'Find out the old contract documents', completed: false },
      {
        id: 2,
        title: 'Organize meeting sales associates to understand need in detail',
        completed: false,
      },
      {
        id: 3,
        title: 'Make sure to cover every small details',
        completed: false,
      },
    ],
    description:
      // tslint:disable-next-line: max-line-length
      '<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>',
    attachments: [
      { id: 1, filename: 'sales-assets.zip', size: '2.3 MB' },
      { id: 2, filename: 'new-contarcts.docx', size: '1.3 MB' },
    ],
    comments: [
      {
        id: 1,
        author: 'Arya Stark',
        text: 'Should I review the last 3 years legal documents as well?',
        posted_on: '4:30am',
        author_avatar: avatarImg2,
      },
      {
        id: 2,
        author: 'Gary Somya',
        text: '@Arya FYI..I have created some general guidelines last year.',
        posted_on: '3:30am',
        author_avatar: avatarImg3,
      },
    ],
  },
]

const upcomingTasks: ListTaskItem[] = [
  {
    id: 4,
    title: 'Invite user to a project',
    assigned_to: 'Arya Stark',
    assignee_avatar: avatarImg2,
    due_date: 'Tomorrow 10am',
    stage: 'Todo',
    completed: false,
    priority: 'Low',
    checklists: [
      { id: 1, title: 'Find out the old contract documents', completed: false },
      {
        id: 2,
        title: 'Organize meeting sales associates to understand need in detail',
        completed: false,
      },
      {
        id: 3,
        title: 'Make sure to cover every small details',
        completed: false,
      },
    ],
    description:
      // tslint:disable-next-line: max-line-length
      '<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>',
    attachments: [
      { id: 1, filename: 'sales-assets.zip', size: '2.3 MB' },
      { id: 2, filename: 'new-contarcts.docx', size: '1.3 MB' },
    ],
    comments: [
      {
        id: 1,
        author: 'Arya Stark',
        text: 'Should I review the last 3 years legal documents as well?',
        posted_on: '4:30am',
        author_avatar: avatarImg2,
      },
      {
        id: 2,
        author: 'Gary Somya',
        text: '@Arya FYI..I have created some general guidelines last year.',
        posted_on: '3:30am',
        author_avatar: avatarImg3,
      },
    ],
  },
  {
    id: 5,
    title: 'Enable analytics tracking',
    assigned_to: 'James B',
    assignee_avatar: avatarImg5,
    due_date: '27 Aug 10am',
    completed: false,
    stage: 'Review',
    priority: 'Low',
    checklists: [
      { id: 1, title: 'Find out the old contract documents', completed: false },
      {
        id: 2,
        title: 'Organize meeting sales associates to understand need in detail',
        completed: false,
      },
      {
        id: 3,
        title: 'Make sure to cover every small details',
        completed: false,
      },
    ],
    description:
      // tslint:disable-next-line: max-line-length
      '<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>',
    attachments: [
      { id: 1, filename: 'sales-assets.zip', size: '2.3 MB' },
      { id: 2, filename: 'new-contarcts.docx', size: '1.3 MB' },
    ],
    comments: [
      {
        id: 1,
        author: 'Arya Stark',
        text: 'Should I review the last 3 years legal documents as well?',
        posted_on: '4:30am',
        author_avatar: avatarImg2,
      },
      {
        id: 2,
        author: 'Gary Somya',
        text: '@Arya FYI..I have created some general guidelines last year.',
        posted_on: '3:30am',
        author_avatar: avatarImg3,
      },
    ],
  },
  {
    id: 6,
    title: 'Code HTML email template',
    assigned_to: 'Kevin C',
    assignee_avatar: avatarImg6,
    due_date: 'No Due Date',
    completed: false,
    stage: 'Review',
    priority: 'Medium',
    checklists: [
      { id: 1, title: 'Find out the old contract documents', completed: false },
      {
        id: 2,
        title: 'Organize meeting sales associates to understand need in detail',
        completed: false,
      },
      {
        id: 3,
        title: 'Make sure to cover every small details',
        completed: false,
      },
    ],
    description:
      // tslint:disable-next-line: max-line-length
      '<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>',
    attachments: [
      { id: 1, filename: 'sales-assets.zip', size: '2.3 MB' },
      { id: 2, filename: 'new-contarcts.docx', size: '1.3 MB' },
    ],
    comments: [
      {
        id: 1,
        author: 'Arya Stark',
        text: 'Should I review the last 3 years legal documents as well?',
        posted_on: '4:30am',
        author_avatar: avatarImg2,
      },
      {
        id: 2,
        author: 'Gary Somya',
        text: '@Arya FYI..I have created some general guidelines last year.',
        posted_on: '3:30am',
        author_avatar: avatarImg3,
      },
    ],
  },
]

const otherTasks: ListTaskItem[] = [
  {
    id: 7,
    title: 'Coordinate with business development',
    assigned_to: 'Arya Stark',
    assignee_avatar: avatarImg2,
    due_date: 'No Due Date',
    stage: 'Todo',
    completed: false,
    priority: 'High',
    checklists: [
      { id: 1, title: 'Find out the old contract documents', completed: false },
      {
        id: 2,
        title: 'Organize meeting sales associates to understand need in detail',
        completed: false,
      },
      {
        id: 3,
        title: 'Make sure to cover every small details',
        completed: false,
      },
    ],
    description:
      // tslint:disable-next-line: max-line-length
      '<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>',
    attachments: [
      { id: 1, filename: 'sales-assets.zip', size: '2.3 MB' },
      { id: 2, filename: 'new-contarcts.docx', size: '1.3 MB' },
    ],
    comments: [
      {
        id: 1,
        author: 'Arya Stark',
        text: 'Should I review the last 3 years legal documents as well?',
        posted_on: '4:30am',
        author_avatar: avatarImg2,
      },
      {
        id: 2,
        author: 'Gary Somya',
        text: '@Arya FYI..I have created some general guidelines last year.',
        posted_on: '3:30am',
        author_avatar: avatarImg3,
      },
    ],
  },
  {
    id: 8,
    title: 'Kanban board design',
    assigned_to: 'James B',
    assignee_avatar: avatarImg9,
    stage: 'Review',
    due_date: '30 Aug 10am',
    completed: false,
    priority: 'Low',
    checklists: [
      { id: 1, title: 'Find out the old contract documents', completed: false },
      {
        id: 2,
        title: 'Organize meeting sales associates to understand need in detail',
        completed: false,
      },
      {
        id: 3,
        title: 'Make sure to cover every small details',
        completed: false,
      },
    ],
    description:
      // tslint:disable-next-line: max-line-length
      '<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>',
    attachments: [
      { id: 1, filename: 'sales-assets.zip', size: '2.3 MB' },
      { id: 2, filename: 'new-contarcts.docx', size: '1.3 MB' },
    ],
    comments: [
      {
        id: 1,
        author: 'Arya Stark',
        text: 'Should I review the last 3 years legal documents as well?',
        posted_on: '4:30am',
        author_avatar: avatarImg2,
      },
      {
        id: 2,
        author: 'Gary Somya',
        text: '@Arya FYI..I have created some general guidelines last year.',
        posted_on: '3:30am',
        author_avatar: avatarImg3,
      },
    ],
  },
  {
    id: 9,
    title: 'Code HTML email template for sales outreach',
    assigned_to: 'Gary H',
    assignee_avatar: avatarImg5,
    due_date: '10 Sep 3pm',
    stage: 'Done',
    completed: false,
    priority: 'Low',
    checklists: [
      { id: 1, title: 'Find out the old contract documents', completed: false },
      {
        id: 2,
        title: 'Organize meeting sales associates to understand need in detail',
        completed: false,
      },
      {
        id: 3,
        title: 'Make sure to cover every small details',
        completed: false,
      },
    ],
    description:
      // tslint:disable-next-line: max-line-length
      '<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>',
    attachments: [
      { id: 1, filename: 'sales-assets.zip', size: '2.3 MB' },
      { id: 2, filename: 'new-contarcts.docx', size: '1.3 MB' },
    ],
    comments: [
      {
        id: 1,
        author: 'Arya Stark',
        text: 'Should I review the last 3 years legal documents as well?',
        posted_on: '4:30am',
        author_avatar: avatarImg2,
      },
      {
        id: 2,
        author: 'Gary Somya',
        text: '@Arya FYI..I have created some general guidelines last year.',
        posted_on: '3:30am',
        author_avatar: avatarImg3,
      },
    ],
  },
]

const kanbantasks: KanbanTaskItem[] = [
  {
    id: 1,
    title: 'iOS App home page',
    status: 'TODO',
    priority: 'High',
    userAvatar: avatarImg2,
    project: 'iOS',
    totalComments: 74,
    totalSubTasks: 10,
    user: 'Robert Carlile',
    dueDate: 'Jul 18, 2018',
  },
  {
    id: 2,
    title: 'Write a release note',
    status: 'Inprogress',
    priority: 'Medium',
    userAvatar: avatarImg5,
    project: 'Hyper',
    totalComments: 17,
    totalSubTasks: 7,
    user: 'Sean White',
    dueDate: 'Jul 20, 2018',
  },
  {
    id: 3,
    title: 'Kanban board design',
    status: 'Review',
    priority: 'High',
    userAvatar: avatarImg1,
    project: 'CRM',
    totalComments: 65,
    totalSubTasks: 2,
    user: 'CoderThemes',
    dueDate: 'may 2, 2018',
  },
  {
    id: 4,
    title: 'Dashboard design',
    status: 'Done',
    priority: 'Low',
    userAvatar: avatarImg10,
    project: 'Hyper',
    totalComments: 287,
    totalSubTasks: 5,
    user: 'Harvey Dickinson',
    dueDate: 'Jul 16, 2018',
  },
  {
    id: 5,
    title: 'Topnav layout design',
    status: 'TODO',
    priority: 'Medium',
    userAvatar: avatarImg8,
    project: 'Hyper',
    totalComments: 28,
    totalSubTasks: 0,
    user: 'Coder Themes',
    dueDate: 'Jul 18, 2019',
  },
  {
    id: 6,
    title: 'Invite user to a project',
    status: 'TODO',
    priority: 'Low',
    userAvatar: avatarImg7,
    project: 'CRM',
    totalComments: 68,
    totalSubTasks: 8,
    user: 'Lucas Hardy',
    dueDate: 'Jul 11, 2019',
  },
  {
    id: 7,
    title: 'Code HTML email template',
    status: 'Review',
    priority: 'Medium',
    userAvatar: avatarImg8,
    project: 'CRM',
    totalComments: 106,
    totalSubTasks: 6,
    user: 'Zak Turnbull',
    dueDate: 'Jul 10, 2019',
  },
  {
    id: 8,
    title: 'Enable analytics tracking',
    status: 'Inprogress',
    priority: 'Low',
    userAvatar: avatarImg7,
    project: 'CRM',
    totalComments: 48,
    totalSubTasks: 4,
    user: 'Louis Allen',
    dueDate: 'Jul 24, 2018',
  },
  {
    id: 9,
    title: 'Brand logo design',
    status: 'Review',
    priority: 'Medium',
    userAvatar: avatarImg7,
    project: 'Design',
    totalComments: 95,
    totalSubTasks: 4,
    user: 'Lily Parkin',
    dueDate: 'Jul 8, 2018',
  },
  {
    id: 10,
    title: 'Enable analytics tracking',
    status: 'Review',
    priority: 'High',
    userAvatar: avatarImg7,
    project: 'CRM',
    totalComments: 39,
    totalSubTasks: 4,
    user: 'Riley Steele',
    dueDate: 'Jul 22, 2018',
  },
]

export { todayTasks, upcomingTasks, otherTasks, kanbantasks }
