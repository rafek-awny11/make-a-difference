export interface Event {
  id: number;
  name: string;
  from: string;
  to: string;
}
export interface Event{
  id: number;
  studentName: string;
  studentPhone: string;
  eventName: string;
  meetingName: string;
  attendanceTime: string;
  isAbsent: boolean;
  meeting: Meeting;
}

export interface Meeting {
  id: number;
  name: string;
  meetingTime: string;
  event: Event;
}
