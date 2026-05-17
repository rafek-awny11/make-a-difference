import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";


@Component({
  selector: 'app-blank-layouts',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './blank-layouts.component.html',
  styleUrl: './blank-layouts.component.css',
})
export class BlankLayoutsComponent {

}
