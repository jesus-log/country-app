import { Component, effect, inject, linkedSignal, signal } from '@angular/core';
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

export type Region =
  | 'Africa'
  | 'Americas'
  | 'Asia'
  | 'Europe'
  | 'Oceania'
  | 'Antarctic';


  function validatequeryParam(queryParam:string):Region{
    queryParam = queryParam.toLocaleLowerCase();
    const validRegions: Record<string, Region> = {
    africa:   'Africa',
    americas:'Americas',
    asia:'Asia',
    europa:'Europe',
    oceania:'Oceania',
    antarctic:'Antarctic',
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
    'Antarctic',
  ];
  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? 'Africa';
  router = inject(Router);
  regionSelected = linkedSignal<string>(() => validatequeryParam(this.queryParam));
  //regionSelected = signal<Region>('Africa');

/*    regionEffect = effect( ()=>{
    const region:Region =  this.regionSelected();
    this.countryService.serchByRegion(region);
   }) */

      //Con RxResource --> observable
  countryResources = rxResource({
    params: () => ({ query: this.regionSelected() }),
    stream: ({params}) => {
      this.router.navigate(['/country/by-region'], {
        queryParams: {
          query: params.query
        }
      })
      if (!params.query) return of([]);
      return this.countryService.serchByRegion(params.query);
    }
  });




 }
