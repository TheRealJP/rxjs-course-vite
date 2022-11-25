/** lessons */
export interface IButtonData {
    id: number;
    name: string;
}

export interface ISchoolClass {
    title: string;
    category: string;
}

export interface IUser {
    id: number;
    age: number;
    name: string;
    profession: string;
}

export interface ILoginData {
    userName: string;
    token: string;
}

export interface IActivity {
    id: number;
    duration: number;
    description: string;
    participants: number;
}

/** meta */
export interface Item {
    name: string,
    description?: string,
    route: string,
}