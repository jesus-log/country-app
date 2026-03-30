import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-country.interface';
import { CountryMapper } from '../mappers/countries.mapper';
import { map,catchError, throwError, delay, of, tap } from 'rxjs';
import { Country } from '../interfaces/county.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string,Country[]>();
  private queryCacheCountry = new Map<string,Country[]>();
  private queryCacheRegion = new Map<string,Country[]>();


  searchByCapital(query: string) {
    query = query.toLowerCase();

    if(this.queryCacheCapital.has(query)){
      return of(this.queryCacheCapital.get(query)!);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map( (restCountries) =>
        CountryMapper.restCountryArrayToCountryArray(restCountries)
      ),
      tap(countries => this.queryCacheCapital.set(query,countries)),
      delay(1500),
      catchError( (error) => {
        console.log('Error fetching ', error);
        return throwError(
          () => new Error(`No se pudo obtener países con '${query}'`)
        )
      })
    )
  }

  searchByCountry(query: string) {
    query = query.toLowerCase();
    if(this.queryCacheCountry.has(query)){
      return of(this.queryCacheCountry.get(query))
    }

    console.log(`Llegando al servidor por ${query}`);

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map( (restCountries) =>
        CountryMapper.restCountryArrayToCountryArray(restCountries)
      ),
      tap(countries => this.queryCacheCountry.set(query,countries)),
      delay(1500),
      catchError( (error) => {
        console.log('Error fetching ', error);
        return throwError(
          () => new Error(`No se pudo obtener países con '${query}'`)
        )
      })
    )
  }

  serchByRegion(query:string){
    query = query.toLowerCase();
    if(this.queryCacheRegion.has(query)){
      return of(this.queryCacheRegion.get(query))
    }

    console.log(`Llegando al servidor por ${query}`);

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${query}`)
    .pipe(
      map( (restCountries) =>
        CountryMapper.restCountryArrayToCountryArray(restCountries)
      ),
      tap(countries => this.queryCacheRegion.set(query,countries)),
      delay(1500),
      catchError( (error) => {
        console.log('Error fetching ', error);
        return throwError(
          () => new Error(`No se pudo obtener países con '${query}'`)
        )
      })
    )
  }

    searchByCountryByAlphaCode(code: string) {
    code = code.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
    .pipe(
      map( (res) =>
        CountryMapper.restCountryArrayToCountryArray(res)
      ),
      map(countries => countries.at(0)),
      catchError( (error) => {
        console.log('Error fetching ', error);
        return throwError(
          () => new Error(`No se pudo obtener el país '${code}'`)
        )
      })
    )
  }

}
