// interfaces -------------------------------------------
export interface Item {
  name: string,
  image: string,
  description: string,
  route: string,
}

// sections -------------------------------------------
export const sections: Item[] = [
  {
    name: 'RxJs Fundamentals',
    image: '../../assets/images/fundamentals.png',
    description: 'Foundation of RxJS',
    route: '/#/0-fundamentals',
  },
  {
    name: 'RxJS building blocks',
    image: '../../assets/images/building-blocks.png',
    description: 'Playing around with the basics',
    route: '/#/1-building-blocks',
  },
  // {
  //   name: 'Creating observables',
  //   image: '../../assets/images/creating-observables.png',
  //   description: 'Creating our own observables',
  //   route: '/creating-observables',
  // },
  {
    name: 'Operators',
    image: '../../assets/images/operators.png',
    description: 'Lets see what these so called operators are all about',
    route: '/operators',
  },
  {
    name: 'Subjects',
    image: '../../assets/images/subjects.png',
    description: 'Think of radios',
    route: '/subjects',
  },
  // {
  //   name: 'Schedulers',
  //   image: '../../assets/images/scheduler.png',
  //   description: 'Plan your work, work your plan',
  //   route: '/schedulers',
  // },
  // {
  //   name: 'Animation',
  //   image: '../../assets/images/animation.png',
  //   description: 'Basics of RxJS animation',
  //   route: '/animation',
  // },
  // {
  //   name: 'Testing',
  //   image: '../../assets/images/testing.png',
  //   description: 'Testing our reactive code',
  //   route: '/testing',
  // },
  {
    name: 'Projects',
    image: '../../assets/images/projects.png',
    description: 'Learning by doing',
    route: '/projects',
  },
]

export const fundamentalConceptsLessons: Item[] = [
  {
    name: 'Iterator pattern',
    image: 'https://source.unsplash.com/random/?iterator',
    description: 'Iterator pattern',
    route: 'iterator-pattern',
  },
  {
    name: 'Observer pattern',
    image: 'https://source.unsplash.com/random/?observer',
    description: 'Observer pattern',
    route: 'observer-pattern',
  },
]
// lessons -------------------------------------------
export const observableLessons: Item[] = [
  // building blocks
  {
    name: 'Basic building blocks',
    image: 'https://source.unsplash.com/random/?blocks',
    description: 'Observable, observer, subscription, subscriber',
    route: 'basic-building-blocks',
  },
  // unsubscribe exercises
  {
    name: 'Observer notifications',
    image: 'https://source.unsplash.com/random/?observer',
    description: 'Observer notifications',
    route: 'observer-notifications',
  },
  {
    name: 'Subscription management',
    image: 'https://source.unsplash.com/random/?subscription',
    description: 'Making space for other tasks',
    route: 'subsciption-management',
  },
  {
    name: 'Progress bar',
    image: 'https://source.unsplash.com/random/?progress',
    description: 'Progress bar',
    route: 'progress-bar',
  },
  // observable behaviors
  {
    name: 'Hot & Cold',
    image: 'https://source.unsplash.com/random/?hot,cold',
    description: 'Think of "active or lazy"',
    route: 'hot-and-cold',
  },
]

export const creationOperatorsLessons: Item[] = [
  {
    name: 'Basic',
    image: 'https://source.unsplash.com/random/?basic',
    description: 'basic creation operators',
    route: 'basic',
  },
  {
    name: 'Http',
    image: 'https://source.unsplash.com/random/?http',
    description: 'creation operators focused on http actions',
    route: 'http',
  },
  {
    name: 'Time',
    image: 'https://source.unsplash.com/random/?time',
    description: 'time related creation operators',
    route: 'time',
  },
  {
    name: 'Conditional',
    image: 'https://source.unsplash.com/random/?conditional',
    description: 'conditional creation operators',
    route: 'conditional',
  },
  {
    name: 'Combination',
    image: 'https://source.unsplash.com/random/?combination',
    description: 'combining observables',
    route: 'combination',
  },
]

export const pipeOperatorLessons: Item[] = [
  {
    name: 'Multicast',
    image: '',
    description: '',
    route: '/multicast',
  },
  {
    name: 'Filtering',
    image: '',
    description: '',
    route: '/filtering',
  },
  {
    name: 'Transformation',
    image: '',
    description: '',
    route: '/transformation',
  },
  {
    name: 'Conditional',
    image: '',
    description: '',
    route: '/conditional',
  },
  {
    name: 'combination',
    image: '',
    description: '',
    route: '/combination',
  },
  {
    name: 'Error handling',
    image: '',
    description: '',
    route: '/error-handling',
  },
]




export const itemCollections = {
  SECTIONS: sections,
  OBSERVABLE_LESSONS: observableLessons,
  FUNDAMENTAL_CONCEPTS: fundamentalConceptsLessons,
  CREATION_OPERATORS_LESSONS: pipeOperatorLessons,
}


