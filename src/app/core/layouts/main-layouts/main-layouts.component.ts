import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";


@Component({
  selector: 'app-main-layouts',
  imports: [RouterOutlet, NavbarComponent, SidebarComponent],
  templateUrl: './main-layouts.component.html',
  styleUrl: './main-layouts.component.css',
})
export class MainLayoutsComponent {


 
 isSidebarOpen = window.innerWidth >= 992;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  @HostListener('window:resize')
  onResize(): void {

    if (window.innerWidth >= 992) {
      this.isSidebarOpen = true;
    } else {
      this.isSidebarOpen = false;
    }

  }

  closeSidebarOnMobile(): void {
  if (window.innerWidth < 992) {
    this.isSidebarOpen = false;
  }
}
}
