import { Component, ElementRef, EventEmitter, HostListener, inject, OnInit, Output, output } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';

import { AuthService } from '../../../core/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
// constructor(private flowbiteService: FlowbiteService) {}
@Output() menuClick = new EventEmitter<void>();
constructor(private el: ElementRef) {}
private readonly authService =inject(AuthService)
userName: string = '';
firstLetter: string = '';

showNavbar = true;
lastScrollTop = 0;

isOpen = false;


ngOnInit(): void {

  console.log('Current User:', this.authService.getCurrentUser());

  console.log('User Name:', this.authService.getUserName());

  console.log('First Letter:', this.authService.getFirstLetter());

  this.userName = this.authService.getUserName();
  this.firstLetter = this.authService.getFirstLetter();

}
    // this.flowbiteService.loadFlowbite((flowbite) => {
    //   initFlowbite();
    // });
  


  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.menuClick.emit();
  }

  closeMenu() {
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    // لو الضغطه بره الـ navbar
    if (!this.el.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  
@HostListener('window:scroll')
  onWindowScroll() {

  const currentScroll =
    window.pageYOffset || document.documentElement.scrollTop;

  // لو في أول الصفحة
  if (currentScroll <= 0) {
    this.showNavbar = true;
    this.lastScrollTop = 0;
    return;
  }

  // نازل لتحت -> اخفي Navbar
  if (currentScroll > this.lastScrollTop) {
    this.showNavbar = false;
  }

  // طالع لفوق -> اظهر Navbar
  else if (currentScroll < this.lastScrollTop) {
    this.showNavbar = true;
  }

  this.lastScrollTop = currentScroll;
}

  signOut():void{
    this.authService.logOut()
  }
}
