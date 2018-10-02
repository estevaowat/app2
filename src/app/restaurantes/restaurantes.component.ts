import { Component, OnInit } from '@angular/core'
import { Oferta } from '../shared/oferta.model'
import { OfertasServices } from '../ofertas.service'

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css'],
  providers: [OfertasServices]
})
export class RestaurantesComponent implements OnInit {

  public ofertas:Oferta[]

  constructor(private ofertasServices:OfertasServices) { }

  ngOnInit() {
    this.ofertasServices.getOfertasPorCategoria("restaurante")
    .then((ofertas:Oferta[])=>{
      this.ofertas = ofertas
    })
  }
}