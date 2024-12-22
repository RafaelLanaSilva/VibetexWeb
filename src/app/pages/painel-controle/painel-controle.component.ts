import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';


@Component({
  selector: 'app-painel-controle',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './painel-controle.component.html',
  styleUrl: './painel-controle.component.css'
})
export class PainelControleComponent {


  usuario: any[] = [];


  constructor(private httpClient: HttpClient) {}


  ngOnInit(): void {
    this.initMap();
  }


  initMap(): void {
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        })
      ],
      view: new View({
        center: fromLonLat([-43.1793, -22.9068]), // Coordenadas da COTI (lon, lat)
        zoom: 12,
      }),
    });


    // Criando o marcador com um ícone personalizado
  const marker = new Feature({
    geometry: new Point(fromLonLat([-43.1793, -22.9068])) // Coordenadas de São Paulo
  });


    // Adicionando um marcador no mapa
    const markerStyle = new Style({
      image: new Icon({
        src: 'https://img.icons8.com/ios-filled/50/000000/marker.png', // URL do ícone
        scale: 0.5, // Reduzir o tamanho do ícone (ajuste conforme necessário)
      })
    });
 
    // Atribuindo o estilo ao marcador
    marker.setStyle(markerStyle);


    const vectorSource = new VectorSource({
      features: [marker]
    });


    const vectorLayer = new VectorLayer({
      source: vectorSource
    });


    map.addLayer(vectorLayer);
  }


  form = new FormGroup({
    dataMin: new FormControl('', [Validators.required]),
    dataMax: new FormControl('', [Validators.required]),
  });


  get f() {
    return this.form.controls;
  }


  onSubmit() {
    this.httpClient.get(environment.apiVibetex)
    .subscribe({
      next: (data) => {
        this.usuario = data as any[];
      },
      error: (e) => {
        console.log(e.error);
      }
    });
  }
}



