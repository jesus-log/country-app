import { DecimalPipe } from '@angular/common';
import { Component, input, inject } from '@angular/core';
import { Country } from '../../../interfaces/county.interface';
import { Router } from '@angular/router';
import { RouterLink } from "@angular/router";



@Component({
  selector: 'country-information',
  imports: [DecimalPipe,RouterLink],
  templateUrl: './country-information.html',
})
export class CountryInformation {

  router = inject(Router);

  country = input.required<Country>();
}
