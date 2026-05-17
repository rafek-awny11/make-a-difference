import { QRCodeComponent } from 'angularx-qrcode';
import { Component, ElementRef, Inject, inject, OnInit, PLATFORM_ID,} from '@angular/core';
import { AllstudentService } from '../../../core/services/allStudent/allstudent.service';
import { AllStudent } from '../../../core/models/all-student.interface';
import html2canvas from 'html2canvas';

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from "@angular/router";

@Component({
  selector: 'app-student-details',
  imports: [CommonModule, QRCodeComponent, RouterLink],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css',
})
export class StudentDetailsComponent implements OnInit {
  private readonly allstudentService = inject(AllstudentService)
    private readonly route = inject(ActivatedRoute);



   student: AllStudent = {
     id: 0,
    name: '',
    phoneNo: '',
    barcodeId: null
  };

   
 
  isBrowser= true;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  this.isBrowser = isPlatformBrowser(this.platformId);
}




  ngOnInit(): void {
    //  const id = Number(this.route.snapshot.paramMap.get('id'));
    //   this.getStudentById(id); 
    const id = Number(this.route.snapshot.paramMap.get('id'));
 

  this.allstudentService.StudentDetailsId(id).subscribe({
    next: (res) => {
      this.student = res;
      console.log(this.student);
    }
  });
  }



 getStudentById(id: number): void {
    this.allstudentService.StudentDetailsId(id).subscribe({
      next: (res) => {
        console.log(
          this.student
        );
        
        this.student = res;
      },
      error: (err) => console.log(err),
    });
  }
   
  //  getAllStudentData(): void{
  //   this.allstudentService.getAllStudent().subscribe({
  //     next:(res)=>{
  //       console.log(res);
  //       this.studentData=res;

        
        
  //     },
  //     error:(err)=>{
  //       console.log(err);
        
  //     }

  //   })
  // }

  // 
  saveFullCard(element: HTMLElement, studentName: string) {
  html2canvas(element, {
    scale: 2,
    useCORS: true
  }).then(canvas => {
    this.download(canvas, `${studentName}-ID-Card.png`);
  });
}

saveBarcodeOnly(element: HTMLElement, studentName: string) {
  html2canvas(element, {
    scale: 3,
    backgroundColor: '#ffffff',
    useCORS: true
  }).then(canvas => {
    this.download(canvas, `${studentName}-Barcode.png`);
  });
}

private download(canvas: HTMLCanvasElement, fileName: string) {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = canvas.toDataURL('image/png');
  link.click();
}


//   saveCardAsImage(cardElement: HTMLElement, studentName: string) {
//   html2canvas(cardElement, {
//     scale: 2,
//     useCORS: true
//   }).then(canvas => {
//     const link = document.createElement('a');
//     link.download = `${studentName}-ID-Card.png`;
//     link.href = canvas.toDataURL('image/png');
//     link.click();
//   });
// }
// saveBarcodeOnly(element: HTMLElement, studentName: string) {
//   html2canvas(element, {
//     scale: 3,
//     backgroundColor: '#ffffff',
//     useCORS: true
//   }).then(canvas => {
//     this.download(canvas, `${studentName}-Barcode.png`);
//   });
// }

}


//   saveCardAsImage(element: HTMLElement, studentName: string) {
//   html2canvas(element, {
//     scale: 2,        // جودة أعلى
//     backgroundColor: '#ffffff',  useCORS: true
//   }).then(canvas => {
//     const link = document.createElement('a');
//     link.download = `${studentName}-ID-Card.png`;
//     link.href = canvas.toDataURL('image/png');
//     link.click();
//   });
// }

