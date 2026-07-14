import { Component, ElementRef, HostListener, inject, OnInit } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../../core/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
// constructor(private flowbiteService: FlowbiteService) {}

constructor(private el: ElementRef) {}
private readonly authService =inject(AuthService)


isOpen = false;


  ngOnInit(): void {
    // this.flowbiteService.loadFlowbite((flowbite) => {
    //   initFlowbite();
    // });
  }


  toggleMenu() {
    this.isOpen = !this.isOpen;
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

  signOut():void{
    this.authService.logOut()
  }
}
