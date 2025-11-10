import { Component } from '@angular/core';
import { Heading } from "../../component/heading/heading";

@Component({
  selector: 'app-home',
  imports: [Heading],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
