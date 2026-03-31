import { Component, effect, inject, linkedSignal, signal } from '@angular/core';
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

export type Region =
  | 'Africa'
  | 'Americas'
  | 'Asia'
  | 'Europe'
  | 'Oceania'
  | 'Antarctica';


  function validatequeryParam(queryParam:string):Region{
    queryParam = queryParam.toLocaleLowerCase();
    const validRegions: Record<string, Region> = {
    africa:   'Africa',
    americas:'Americas',
    asia:'Asia',
    europa:'Europe',
    oceania:'Oceania',
    antarctica:'Antarctica',
  }
  return validRegions[queryParam] ?? 'Africa'
  }



@Component({
  selector: 'app-by-region-page',
  imports: [CountryList],
  templateUrl: './byRegionPage.html',
})
export class ByRegionPage {
   public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctica',
  ];
  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? 'Africa';
  regionSelected = linkedSignal<string>(() => validatequeryParam(this.queryParam));
  requestError = signal<string | null>(null);
  //regionSelected = signal<Region>('Africa');

/*    regionEffect = effect( ()=>{
    const region:Region =  this.regionSelected();
    this.countryService.serchByRegion(region);
   }) */

      //Con RxResource --> observable
  countryResources = rxResource({
    params: () => ({ query: this.regionSelected() }),
    stream: ({params}) => {
      if (!params.query) return of([]);
      return this.countryService.serchByRegion(params.query).pipe(
              catchError((error) => {
                const message = error instanceof Error ? error.message : 'Unexpected error';
                this.requestError.set(message);
                return of([]);
              })
            );;
    }
  });




 }
