import mapboxgl from 'mapbox-gl';
import { Country } from '../interfaces/county.interface';
import { RESTCountry } from '../interfaces/rest-country.interface';


export class CountryMapper {

  //static RestCountry => Country
  //static RESTCountry[] =>Country[]

  static restCountryArrayToCountryArray(cs:RESTCountry[]):Country[]{
    var countries:Country[]=[];
    cs.forEach( (c)=>{
      countries.push(this.restCountryToCountry(c))
    })
    return countries;
  }

  static restCountryToCountry(c: RESTCountry): Country {
    return {
      cca2: c.cca2,
      flag: c.flag,
      flagSvg: c.flags.svg,
      name: c.translations['spa']?.common ?? 'No Spanish name',
      capital: c.capital,
      population: c.population,
      region:c.region,
      timeZone:c.timezones[0],
      latlng:new mapboxgl.LngLat(c.latlng[1], c.latlng[0])
    }
  }



}
