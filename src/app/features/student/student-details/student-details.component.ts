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

qrCodeDownloadLink: string = '';

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
   





saveFullCard(element: HTMLElement, studentName: string) {
  html2canvas(element, {
    scale: 2,
    backgroundColor: '#ffffff',
    useCORS: true
  }).then(canvas => {
    this.download(
      canvas,
      `${studentName}-ID-Card.png`
    );
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


onChangeURL(url: string) {
  this.qrCodeDownloadLink = url;
}


private download(canvas: HTMLCanvasElement, fileName: string) {
  const link = document.createElement('a');

  link.download = fileName;
  link.href = canvas.toDataURL('image/png');

  link.click();
}




}




