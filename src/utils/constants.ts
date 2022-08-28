// interfaces -------------------------------------------
export interface Item {
  name: string,
  description: string,
  route: string,
}

// root paths -------------------------------------------
const fundamentalRoot = '/0-fundamentals'

// sections -------------------------------------------
export const sections: Item[] = [
  {
    name: 'RxJs Fundamentals',
    description: 'Foundation of RxJS',
    route: fundamentalRoot,
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

export const itemCollections = {
  SECTIONS: sections, 
  FUNDAMENTAL_CONCEPTS: fundamentalConceptsLessons,
}


