export interface Traveller{
    id: number;
    firstName: string;
    lastName: string;
    city: string;
    country: string;
    age: number;
}

export interface Travellers{
    travellers: Array<Traveller>;
}    