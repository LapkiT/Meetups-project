export interface Meetup {
  id: number;
  name: string;
  reason_to_come: string;
  need_to_know: string;
  description: string;
  location: string;
  target_audience: string;
  will_happen: string;
  time: string;
  duration: number;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
  owner: Owner;
  users: Visitor[];
}

interface Owner {
  id: number;
  email: string;
  password: string;
  fio: string;
  createdAt: string;
  updatedAt: string;
}

interface Visitor {
  UserMeetup: meetupsUserCreate;
  id: number;
  email: string;
  password: string;
  fio: string;
  createdAt: string;
  updatedAt: string;
}

export interface meetupsUserCreate {
  createdAt: string;
  id: number;
  meetupId: number;
  updatedAt: number;
  userId: number;
}
