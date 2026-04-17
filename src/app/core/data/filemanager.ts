import { QuickAccessItem, RecentFileItem } from '@core/model/filemanager.model'

const Avatar1 = 'assets/images/users/avatar-1.jpg'
const Avatar2 = 'assets/images/users/avatar-2.jpg'
const Avatar3 = 'assets/images/users/avatar-3.jpg'
const Avatar4 = 'assets/images/users/avatar-4.jpg'
const Avatar5 = 'assets/images/users/avatar-5.jpg'
const Avatar6 = 'assets/images/users/avatar-6.jpg'
const Avatar7 = 'assets/images/users/avatar-7.jpg'
const Avatar8 = 'assets/images/users/avatar-8.jpg'
const Avatar9 = 'assets/images/users/avatar-9.jpg'
const Avatar10 = 'assets/images/users/avatar-10.jpg'

const quickAccessFiles: QuickAccessItem[] = [
  {
    icon: 'mdi mdi-folder-zip font-16',
    name: 'Hyper-sketch.zip',
    size: '2.3 MB',
  },
  {
    icon: 'mdi mdi-folder font-16',
    name: 'Compile Version',
    size: '87.2 MB',
  },
  {
    icon: 'mdi mdi-folder-zip-outline font-16',
    name: 'admin.zip',
    size: '45.1 MB',
  },
  {
    icon: 'mdi mdi-file-pdf-box font-16',
    name: 'Docs.pdf',
    size: '7.5 MB',
  },
  {
    icon: 'mdi mdi-file-pdf-box font-16',
    name: 'License-details.pdf',
    size: '784 KB',
  },
  {
    icon: 'mdi mdi-folder-account font-16',
    name: 'Purchase Verification',
    size: '2.2 MB',
  },
  {
    icon: 'mdi mdi-folder-account font-16',
    name: 'Hyper Integrations',
    size: '874 MB',
  },
]

const recentFiles: RecentFileItem[] = [
  {
    name: 'App Design & Development',
    modifiedDate: 'Jan 03, 2020',
    modifiedBy: 'Andrew',
    size: '128 MB',
    owner: 'Danielle Thompson',
    members: [
      {
        image: Avatar1,
        name: 'Mat Helme',
      },
      {
        image: Avatar2,
        name: 'Michael Zenaty',
      },
      {
        image: Avatar3,
        name: 'James Anderson',
      },
      {
        image: Avatar5,
        name: 'Username',
      },
    ],
  },
  {
    name: 'Hyper-sketch-design.zip',
    modifiedDate: 'Feb 13, 2020',
    modifiedBy: 'Coderthemes',
    size: '521 MB',
    owner: 'Coder Themes',
    members: [
      {
        image: Avatar4,
        name: 'Mat Helme',
      },
      {
        image: Avatar1,
        name: 'Michael Zenaty',
      },
      {
        image: Avatar6,
        name: 'James Anderson',
      },
    ],
  },
  {
    name: 'Annualreport.pdf',
    modifiedDate: 'Dec 18, 2019',
    modifiedBy: 'Alejandro',
    size: '7.2 MB',
    owner: 'Gary Coley',
    members: [
      {
        image: Avatar9,
        name: 'Mat Helme',
      },
      {
        image: Avatar7,
        name: 'Michael Zenaty',
      },
      {
        image: Avatar3,
        name: 'James Anderson',
      },
    ],
  },
  {
    name: 'Wireframes',
    modifiedDate: 'Nov 25, 2019',
    modifiedBy: 'Dunkle',
    size: '54.2 MB',
    owner: 'Jasper Rigg',
    members: [
      {
        image: Avatar1,
        name: 'Mat Helme',
      },
      {
        image: Avatar8,
        name: 'Michael Zenaty',
      },
      {
        image: Avatar2,
        name: 'James Anderson',
      },
      {
        image: Avatar5,
        name: 'Username',
      },
    ],
  },
  {
    name: 'Documentation.docs',
    modifiedDate: 'Feb 9, 2020',
    modifiedBy: 'Justin',
    size: '8.3 MB',
    owner: 'Cooper Sharwood',
    members: [
      {
        image: Avatar3,
        name: 'Mat Helme',
      },
      {
        image: Avatar10,
        name: 'Michael Zenaty',
      },
    ],
  },
]

export { quickAccessFiles, recentFiles }
