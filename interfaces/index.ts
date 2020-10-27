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
  weighIns?: string[];
};

// export type People = {
//   people: Person[];
// };

export type Participants = {
  people: Person[];
};

export type Entry = {
  weight: string;
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
};

export type WeighIn = {
  date: Date;
  weight: string;
  person: Person;
  id: number;
}

export type WeighIns = {
  weighIns: WeighIn[];
}