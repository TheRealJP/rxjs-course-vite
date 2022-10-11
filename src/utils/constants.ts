// interfaces -------------------------------------------
export interface Item {
  name: string,
  description: string,
  route: string,
}

// root paths -------------------------------------------
const fundamentalRoot = '/0-fundamentals'
const basicBuildingBlockRoot = '/1-building-blocks'
const creationOperatorsRoot = '/2-creation-operators'

// sections -------------------------------------------
export const sections: Item[] = [
  {
    name: 'RxJs Fundamentals',
    description: 'Foundation of RxJS',
    route: fundamentalRoot,
  },
  {
    name: 'RxJS building blocks',
    description: 'Playing around with the basics',
    route: basicBuildingBlockRoot,
  },  
  {
    name: 'Creation operators',
    description: 'Premade observable functions',
    route: creationOperatorsRoot,
  },
]

// lessons -------------------------------------------
export const fundamentalConceptsLessons: Item[] = [
  {
    name: 'Iterator pattern',
    description: 'Iterate over any collection',
    route: fundamentalRoot + '/iterator',
  },
  {
    name: 'Observer pattern',
    description: 'Notify changes to observers',
    route: fundamentalRoot + '/observer',
  },
]

export const basicBuildingBlocksLessons: Item[] = [
  {
    name: 'Basic building blocks',
    description: 'Observable, producer, observer, subscription, unsubscribe',
    route: basicBuildingBlockRoot + '/basics',
  },
  {
    name: 'Observer notifications',
    description: 'Next, error, complete',
    route: basicBuildingBlockRoot + '/observer-notifications',
  },
  {
    name: 'Subscription management',
    description: 'Making space for other tasks',
    route: basicBuildingBlockRoot + '/subscription-management',
  },
  {
    name: 'Progress bar',
    description: 'Training the basics',
    route: basicBuildingBlockRoot + '/progress-bar',
  },
  {
    name: 'Hot & Cold',
    description: 'Observable behaviors',
    route: basicBuildingBlockRoot + '/hot-and-cold',
  },
]

export const creationOperatorsLessons: Item[] = [
  {
    name: 'Basic',
    description: '',
    route: creationOperatorsRoot + '/basic',
  },
  {
    name: 'Time',
    description: '',
    route: creationOperatorsRoot + '/time',
  },
  {
    name: 'Http',
    description: '',
    route: creationOperatorsRoot + '/http',
  },
  {
    name: 'Combination',
    description: '',
    route: creationOperatorsRoot + '/combination',
  },
]

export const basicCreationOperatorsLessons: Item[] = [

  {
    name: 'Of',
    description: '',
    route: creationOperatorsRoot + '/basic/of',
  },
  {
    name: 'From',
    description: '',
    route: creationOperatorsRoot + '/basic/from',
  },
  {
    name: 'Range',
    description: '',
    route: creationOperatorsRoot + '/basic/range',
  },
  {
    name: 'FromEvent',
    description: '',
    route: creationOperatorsRoot + '/basic/fromEvent',
  },
]

export const timeCreationOperatorsLessons: Item[] = [
  {
    name: 'Timer and interval',
    description: '',
    route: creationOperatorsRoot + '/time/timer-and-interval',
  },
]

export const httpCreationOperatorsLessons: Item[] = [
  {
    name: 'Ajax and fromFetch',
    description: '',
    route: creationOperatorsRoot + '/http/ajax-and-fromFetch',
  },
]

export const combinationCreationOperatorsLessons: Item[] = [
  {
    name: 'Concat',
    description: '',
    route: creationOperatorsRoot + '/combination/concat',
  },
  {
    name: 'Merge',
    description: '',
    route: creationOperatorsRoot + '/combination/merge',
  },
  {
    name: 'CombineLatest',
    description: '',
    route: creationOperatorsRoot + '/combination/combineLatest',
  },
]


export const itemCollections = {
  SECTIONS: sections,
  FUNDAMENTAL_CONCEPTS: fundamentalConceptsLessons,
  BASIC_BUILDING_BLOCKS: basicBuildingBlocksLessons,

  CREATION_OPERATORS: creationOperatorsLessons,
  BASIC_CREATION_OPERATORS: basicCreationOperatorsLessons,
  TIME_CREATION_OPERATORS: timeCreationOperatorsLessons,
  HTTP_CREATION_OPERATORS: httpCreationOperatorsLessons,
  COMBINATION_CREATION_OPERATORS: combinationCreationOperatorsLessons,
}


