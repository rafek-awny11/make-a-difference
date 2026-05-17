
export interface Attendance {

  id: number;
  name: string;
  eventId: number;
  eventName: string;
  meetingTime: string;
  scanTime: Date;
  meetingName: string;
}
export interface Attendance2 {
  name:string;
  barcodeId: string;
  studentId: number; 
  scanTime:Date;
 
}
export interface Attendance1 {
  id: number;
   studentId: number,
  studentName: string;
  studentPhone: string;
  eventName: string;
  meetingName: string;
  attendanceTime: string;
  isAbsent: boolean;
  meeting: Meeting;
   showMenu?: boolean;
}

export interface Meeting {
  startTime: any;
  id: number;
  name: string;
  meetingTime: string;
  event: Event;
}

export interface Event {
  id: number;
  name: string;
  from: string;
  to: string;
}