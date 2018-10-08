import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { OfertasServices } from './../ofertas.service'
import { Oferta } from "./../shared/oferta.model"

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasServices]
})
export class OfertaComponent implements OnInit {

  public oferta: Oferta

  constructor(private route: ActivatedRoute,
    private ofertaService: OfertasServices) { }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.ofertaService.getOfertasPorId(this.route.snapshot.params["id"])
        .then((oferta: Oferta) => {
          console.log(oferta)
          this.oferta = oferta
        })
    })

  }
}
