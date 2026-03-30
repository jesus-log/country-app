import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country-service';
import { NotFound } from "../../../shared/components/not-found/not-found";
import { CountryInformation } from "./country-information/country-information";

@Component({
  selector: 'app-country-page',
  imports: [NotFound, CountryInformation],
  templateUrl: './CountryPage.html',
})
export class CountryPage {
  countryCode = inject(ActivatedRoute).snapshot.params['query'];
  countryService = inject(CountryService);

  countryResource = rxResource({
    params: () => ({code:this.countryCode}),
    stream: ({params})=> {return this.countryService.searchByCountryByAlphaCode(params.code)}
  })

}
