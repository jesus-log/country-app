import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountrySearchInput } from "../../components/country-search-input/country-search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country-service';
import { Country } from '../../interfaces/county.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-by-capital-search',
  imports: [CountrySearchInput, CountryList],
  templateUrl: './by-capital-search.html',
})
export class ByCapitalSearch {

  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal<string>(() => this.queryParam);
  requestError = signal<string | null>(null);

  //Con RxResource --> observable
  countryResources = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      this.requestError.set(null);
      if (!params.query) return of([]);
      return this.countryService.searchByCapital(params.query).pipe(
        catchError((error) => {
          const message = error instanceof Error ? error.message : 'Unexpected error';
          this.requestError.set(message);
          return of([]);
        })
      );
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
