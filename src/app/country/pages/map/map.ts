import { Component, ElementRef, input, signal, viewChild, inject } from '@angular/core';
import mapboxgl, { LngLat, LngLatLike, Marker } from 'mapbox-gl';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  host: {
    class: 'flex flex-1 min-h-0',
  },
  /*   styles: `
      div{
        height: 100vh;
      }
      `
      */
})
export class Map {

  divElement = viewChild<ElementRef>('map');
  route = inject(ActivatedRoute);
  marker = signal<Marker[]>([]);


  coordinates = signal<LngLatLike | undefined>(undefined);

  private getCenterFromRoute(): [number, number] {
    const latParam = this.route.snapshot.paramMap.get('lat');
    const lngParam = this.route.snapshot.paramMap.get('lng');

    const lat = latParam !== null ? Number(latParam) : 40.41;
    const lng = lngParam !== null ? Number(lngParam) : -3.70;

    return [lng, lat];
  }

  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;
    const element = this.divElement()?.nativeElement;

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.getCenterFromRoute(), // starting position [lng, lat]
      attributionControl: false,
      zoom: 5,
      interactive: true,
      pitch: 30
    });
    new mapboxgl.Marker({ draggable: false, color: 'red' })
      .setLngLat([40, -3.7492])
      .addTo(map);

    // this.mapListeners(map);
  }



  //TODO:No consigo que salga el marcador en el mapa, pruebo a que se abra el mnapa y que aparezca en el centro la ubicación
  /*

    async ngAfterViewInit() {
      const [lng, lat] = this.getCenterFromRoute();
      this.coordinates.set(new LngLat(lng, lat));
      if (!this.divElement()?.nativeElement) return;
      const element = this.divElement()?.nativeElement;

      const map = new mapboxgl.Map({
        container: element, // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [lng, lat], // starting position [lng, lat]
        attributionControl: false,
        zoom: 5,
        interactive: false,
        pitch: 30
      });
      new mapboxgl.Marker({ draggable: false, color: 'red' })
        .setLngLat([40,-3.7492])
        .addTo(map);

    // this.mapListeners(map);
  } */

  /*  mapListeners(map: mapboxgl.Map) {
     map.on('load', () => {
       map.resize();
       const center = map.getCenter();
       new mapboxgl.Marker({ draggable: false, color: 'red' })
         .setLngLat([center.lng, center.lat])
         .addTo(map);
     });

     this.map.set(map);
   } */

}
