import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountrySearchInput } from "../../components/country-search-input/country-search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country-service';
import { Country } from '../../interfaces/county.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-search',
  imports: [CountrySearchInput, CountryList],
  templateUrl: './by-capital-search.html',
})
export class ByCapitalSearch {

  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  router = inject(Router);
  query = linkedSignal<string>(() => this.queryParam);

  //Con RxResource --> observable
  countryResources = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          query: params.query
        }
      })
      if (!params.query) return of([]);
      return this.countryService.searchByCapital(params.query);
    }
  });

  //CON RESOURCE (PROMESA async await)
  /*   countryResources = resource({
      params: () => ({query: this.query()}),
      loader: async({params}) => {

        if(!params.query) return [];

        return await firstValueFrom(
          this.countryService.searchByCapital(params.query)
        );

      }
    }) */


  //SIN RESOURCE
  /*  isLoading = signal(false);
   isError = signal<string|null>(null);
   countries = signal<Country[]>([]);

   onSearch(query:string){
     if(this.isLoading()) return;

     this.isLoading.set(true);
     this.isError.set(null);

     this.countryService.searchByCapital(query).subscribe({
       next: (countries) => {
         this.isLoading.set(false);
         this.countries.set(countries);
       },
       error: (err) =>{
         console.log(err);
         this.isLoading.set(false);
         this.countries.set([]);
         this.isError.set(err);
       }
     })
   } */

}
