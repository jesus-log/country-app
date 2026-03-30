import { Routes } from '@angular/router';
import { ByCapitalSearch } from './pages/by-capital-search/by-capital-search';
import { CountryLayout } from './layouts/country-layout/country-layout';
import { ByCountryPage } from './pages/byCountryPage/byCountryPage';
import { ByRegionPage } from './pages/byRegionPage/byRegionPage';
import { CountryPage } from './pages/CountryPage/CountryPage';
import { Map } from './pages/map/map';


export const countryRoutes: Routes = [

  {
    path: '',
    component: CountryLayout,
    children: [
      {
        path: 'by-capital',
        component: ByCapitalSearch
      },
      //byCountryPage
      {
        path: 'by-country',
        component: ByCountryPage
      },
      //byRegionPage
      {
        path: 'by-region',
        component: ByRegionPage
      },
      {
        path: 'by/:query',
        component: CountryPage
      },
      {
        path: 'map',
        component: Map
      },
      {
        path: 'map/:lat/:lng',
        component: Map
      },
      {
        path: '**',
        redirectTo: 'by-capital'
      }
    ]

  }


];

export default countryRoutes;
