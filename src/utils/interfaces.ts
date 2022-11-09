/** lessons */
export interface IButtonData {
    name: string;
    id: number;
}

export interface ISchoolClass {
    title: string;
    category: string;
}

export interface IPerson {
    age: number;
    name: string;
    profession: string;
}

/** meta */
export interface Item {
    name: string,
    description?: string,
    route: string,
  }