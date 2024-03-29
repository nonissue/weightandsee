// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

export type User = {
  id: number;
  name: string;
};

export type UserWithWeighIns = {
  id: number;
  name: string;
  nickName?: string;
  weighIns?: WeighIn[];
  currentWeight?: string;
};

export type Person = {
  id: number;
  name: string;
  nickName?: string;
  weighIns?: WeighIn[];
  currentWeight?: string;
};

export type PersonPageProps = {
  id: number;
  name: string;
  nickName?: string;
  currentWeight?: string;
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

export type FormData = {
  date: Date;
  entries: {
    name: string;
    weight: string;
  }[];
};

export type FormResult = {
  date: Date;
  entries: Entries;
  updateCurrentWeight: boolean;
};

export type WeighIn = {
  // should really change this to string...
  weight: number;
  person: Person;
  id: number;
  weighDate: Date;
};

export type WeighIns = {
  weighIns: WeighIn[];
};
