import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";

@Component({
  selector: 'app-main-layouts',
  imports: [RouterOutlet, ],
  templateUrl: './main-layouts.component.html',
  styleUrl: './main-layouts.component.css',
})
export class MainLayoutsComponent {

}
