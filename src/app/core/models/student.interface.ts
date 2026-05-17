
export interface Student {
  id: number;
  barcodeId: number;
  name: string;
  phoneNo: string;
  selected?: boolean;
   isAdded?: boolean;
  eventStudentId?: number;

 
} 
export interface currentStudents {
  id: number;
  studentId: number;
  studentName: string;
  studentPhoneNo: string;
  eventStudentId?:number;
  selected?: boolean;
}
