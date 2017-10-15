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

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  map: GoogleMap;
  mapElement: HTMLElement;
  myPosition: any = {};
  markers: any[] = [
    {
      position: {
        latitude: 8.2544423,
        longitude: -73.3597717,
      },
      title: 'Baño público de UFPSO sede la primavera',
      icon: 'assets/markerToiletEnable.png'
    },
    {
      position: {
        latitude: 8.2391074,
        longitude: -73.3535356,
      },
      title: 'Baño público San Agustin',
      icon: 'assets/markerToiletDesable.png'
    },
    {
      position: {
        latitude: 8.2561595,
        longitude: -73.3598927,
      },
      title: 'Baño público coliseo Argelino Duran Quintero',
      icon: 'assets/markerToiletEnable.png'
    },
    {
      position: {
        latitude: 8.2354683,
        longitude: -73.3524015,
      },
      title: 'Baño público el Exito',
      icon: 'assets/markerToiletDesable.png'
    },
  ];

  constructor(private googleMaps: GoogleMaps, private geolocation: Geolocation, ) { }

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

      let markerOptions: MarkerOptions = {
        position: this.myPosition,
        title: "Hello",
        icon: 'www/assets/imgs/marker-pink.png'
      };

      this.addMarker(markerOptions);

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
