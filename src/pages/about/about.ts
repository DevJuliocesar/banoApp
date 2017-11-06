import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  LatLng
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Component } from '@angular/core';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  snippet: any;
  map: GoogleMap;
  mapElement: HTMLElement;
  myPosition: any = {};
  markerOptionsJC: MarkerOptions = {};
  markers: any[] = [
      {
        position: {
          latitude: 8.2391074,
          longitude: -73.3535356,
        },
        title: 'Baño público San Agustin',
        snippet: 'Disponible: Precio $500',
        icon: 'assets/markerToilet.png'
      },
      {
        position: {
          latitude: 8.233488,
          longitude: -73.354158,
        },
        title: 'Baño público el Exito',
        snippet: 'Disponible: Precio: $500',
        icon: 'assets/markerToilet.png',
      },
    ];

  constructor(
    private googleMaps: GoogleMaps,
    private geolocation: Geolocation,
    public events: Events
  ) {
    events.subscribe('datos', (entrada) => {
      if (entrada == 1) {
        this.snippet = 'No Disponible: Precio: $500';
        this.loadMap();
      } else {
        this.snippet = 'Disponible: Precio: $500';
        this.loadMap();
      }
    });
  }

  ionViewDidLoad() {
    this.snippet = 'Disponible: Precio: $500';
    this.getCurrentPosition();
  }

  getCurrentPosition() {
    this.geolocation.getCurrentPosition()
      .then(position => {
        this.myPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        this.loadMap();
      })
      .catch(error => {
        console.log(error);
      })
  }

  loadMap() {
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    this.map = this.googleMaps.create(element);

    // create CameraPosition
    let position: CameraPosition<any> = {
      target: new LatLng(this.myPosition.latitude, this.myPosition.longitude),
      zoom: 16,
      tilt: 30
    };
    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {


      this.map.addMarker({
        position: {
          lat: 8.254798,
          lng: -73.359678,
        },
        title: 'Baño público de UFPSO sede la primavera',
        snippet: 'Disponible: Precio: $500',
        icon: 'assets/markerToilet.png'
      })
        .then(marker => {
          marker.on(GoogleMapsEvent.MARKER_CLICK)
            .subscribe(() => {
              marker.setSnippet(this.snippet);
            });
        });

      // move the map's camera to position
      this.map.moveCamera(position);

      this.markerOptionsJC = {
        position: this.myPosition,
        title: "Mi posicion"
      };

      this.addMarker(this.markerOptionsJC);

      this.markers.forEach(marker => {
        this.addMarker(marker);
      });

    });
  }

  addMarker(options) {
    let markerOptions: MarkerOptions = {
      position: new LatLng(options.position.latitude, options.position.longitude),
      title: options.title,
      icon: options.icon,
      snippet: options.snippet
    };
    this.map.addMarker(markerOptions);
  }

}
