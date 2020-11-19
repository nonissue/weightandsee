// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

export type User = {
  id: number;
  name: string;
};

export type Person = {
  id: number;
  name: string;
  nickName?: string;
  weighIns?: WeighIn[];
  currentWeight?: number;
};

export type PersonPageProps = {
  id: number;
  name: string;
  nickName?: string;
  currentWeight?: number;
  weighIns?: {
    weight: number;
    person: Person;
    id: number;
    weighDate: string;
  }[];
};

// export type People = {
//   people: Person[];
// };

export type Participants = {
  people: Person[];
};

export type Entry = {
  weight: number;
  name: string;
};

export type Entries = {
  [k: string]: Entry;
}[];

export type FormInputs = {
  date: Date;
  weightRequired: string;
  entries: Entries;
};

export type FormResult = {
  date: Date;
  entries: Entries;
  updateCurrentWeight: boolean;
};

export type WeighIn = {
  weight: number;
  personId: number;
  id: number;
  weighDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export type WeighIns = {
  weighIns: WeighIn[];
};

export type WeighInWithPerson = {
  weight: number;
  person: Person;
  id: number;
  weighDate: Date;
};

export type WeighInsWithPerson = {
  weighIns: WeighInWithPerson[];
};

export type Session = {
  user: {
    name: string;
    email: string;
    role: string;
    id: number;
  };
  expires: string;
};
