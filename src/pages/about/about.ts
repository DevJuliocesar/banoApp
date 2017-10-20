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
  icono: any = 'assets/markerToiletDesable.png';
  map: GoogleMap;
  mapElement: HTMLElement;
  myPosition: any = {};
  markerOptionsJC : MarkerOptions = {};
  markers: any[] = [
    {
      position: {
        latitude: 8.254798,
        longitude: -73.359678,
      },
      title: 'Baño público de UFPSO sede la primavera',
      snippet: 'Precio: $500',
      icon: this.icono
    },
    {
      position: {
        latitude: 8.2391074,
        longitude: -73.3535356,
      },
      title: 'Baño público San Agustin',
      snippet: 'Precio 500',
      icon: 'assets/markerToiletDesable.png'
    },
    {
      position: {
        latitude: 8.256733,
        longitude: -73.359425,
      },
      title: 'Baño público coliseo Argelino Duran Quintero',
      snippet: 'Precio: $500',
      icon: 'assets/markerToiletEnable.png',
    },
    {
      position: {
        latitude: 8.233488,
        longitude: -73.354158,
      },
      title: 'Baño público el Exito',
      snippet: 'Precio: $500',
      icon: 'assets/markerToiletDesable.png',
    },
  ];

  constructor(
    private googleMaps: GoogleMaps,
    private geolocation: Geolocation,
    public events: Events
  ) {
    events.subscribe('datos', (entrada) => {
      console.log('Welcome', entrada);
      if(entrada == 1){
        this.map[1].setIcon("assets/markerToiletEnable.png");
        this.icono = 'assets/markerToiletEnable.png';
      } else {
        this.map[1].setIcon("assets/markerToiletDesable.png");
        this.icono = 'assets/markerToiletDesable.png';
      }
    });
  }

  ionViewDidLoad() {
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

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log('Map is ready!');

      // move the map's camera to position
      this.map.moveCamera(position);

      this.markerOptionsJC = {
        position: this.myPosition,
        title: "Mi posicion",
        icon: 'www/assets/imgs/marker-pink.png'
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
      icon: options.icon
    };
    this.map.addMarker(markerOptions);
  }

}
