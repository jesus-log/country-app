import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { CountrySearchInput } from "../../components/country-search-input/country-search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country-service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [CountrySearchInput, CountryList],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage {


  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  router = inject(Router);
  query = linkedSignal(()=>this.queryParam)


  //Con RxResource --> observable
  countryResources = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({params}) => {
      this.router.navigate(['/country/by-country'],{
        queryParams:{
          query: params.query
        }
      })
      if (!params.query) return of([]);
      return this.countryService.searchByCountry(params.query);
    }
  });

/*   countryResources = resource({
    params: () => ({query: this.query()}),
    loader: async({params}) => {

      if(!params.query) return [];

      return await firstValueFrom(
        this.countryService.searchByCountry(params.query)
      );

    }
  }) */

 }
