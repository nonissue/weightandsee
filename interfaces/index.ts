// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

// export type User = {
//   id: number;
//   name: string;
// };

export type User = {
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
    user: User;
    id: number;
    weighDate: string;
  }[];
};

// export type People = {
//   people: Person[];
// };

export type Participants = {
  people: User[];
};

export type Entry = {
  weight: number;
  name: string;
};

// Wtf did i do this for
export type Entries = {
  [k: string]: Entry;
}[];

// No idea what weightRequired is for?
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
  userId: number;
  id: number;
  weighDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export type WeighIns = {
  weighIns: WeighIn[];
};

// export type WeighInWithPerson = {
//   weight: number;
//   person: User;
//   id: number;
//   weighDate: Date;
// };

export type WeighInWithUser = {
  weight: number;
  user: User;
  id: number;
  weighDate: Date;
};

export type WeighInsWithUser = {
  weighIns: WeighInWithUser[];
};

// export type WeighInsWithPerson = {
//   weighIns: WeighInWithPerson[];
// };

export type Session = {
  user: SessionUser;
  expires: string;
};

export type SessionUser = {
  name: string;
  email: string;
  role: string;
  id: number;
};
