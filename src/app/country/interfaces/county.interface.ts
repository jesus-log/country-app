
import { LngLat } from 'mapbox-gl';

export interface Country {
  cca2: string;
  flag:string;
  flagSvg:string;
  name:string;
  capital:string[];
  population:number;
  region:string;
  timeZone:string;
  latlng:LngLat;
}
