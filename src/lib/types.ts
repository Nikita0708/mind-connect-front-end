export interface PostType {
  _id: string;
  owner: string;
  title: string;
  description?: string;
  image?: File;
  likes: string[];
  comments: string[];
  createdAt: string;
}

export type commentType = {
  _id: string;
  owner: string;
  content: string;
  postId: string;
};

export type usersDataType = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  image: string;
  age: number;
  city: string;
  country: string;
  isDoctor: boolean;
  username: string;
};
export type authType = {
  user: any;
  isAuth: boolean;
  captchaUrl: null | string;
  usersData: usersDataType;
  tokenIsValid: boolean | null;
  isPending: boolean;
  googleUrl: null | string;
  emails: string[];
};

export type calendarType = {
  _id: string;
  date: {
    $date: string;
  };
  owner: {
    $oid: string;
  };
  __v: number;
  index: number;
  notes: calendarNoteType[];
};

export type calendarNoteType = {
  _id: {
    $oid: string;
  };
  note: string;
  time: string;
  createdAt: {
    $date: string;
  };
};

export type ResearchDataType = {
  page: number;
  limit: number;
};

export type ResearchType = {
  "@GROUP_ID": string;
};

export type DoctorCalendarType = {
  _id: string;
  date: string;
  timeSlots: TimeSlot[];
};
export type TimeSlot = {
  _id: string;
  time: string;
};
