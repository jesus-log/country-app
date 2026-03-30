import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenu } from "../../components/top-menu/top-menu";
import { Footer } from "../../../shared/components/footer/footer";

@Component({
  selector: 'app-country-layout',
  imports: [RouterOutlet, TopMenu, Footer],
  templateUrl: './country-layout.html',
})
export class CountryLayout { }
