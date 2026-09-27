import { Component, EventEmitter, inject, Output } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref } from "@angular/router";
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLinkActive, RouterLinkWithHref],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
private readonly authService =inject(AuthService)

 @Output() linkClick = new EventEmitter<void>();

    signOut():void{
    this.authService.logOut()
  }

 closeSidebar(): void {
    this.linkClick.emit();
  }
  

}
