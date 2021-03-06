import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { OfertasServices } from '../../ofertas.service'

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css'],
  providers: [OfertasServices]

})
export class OndeFicaComponent implements OnInit {

  public ondeFica: string = ''
  constructor(
    private route: ActivatedRoute,
    private ofertaServices: OfertasServices
  ) { }

  ngOnInit() {

    this.route.parent.params.subscribe((parametros: Params) => {
      this.ofertaServices.getOndeFicaPorId(this.route.parent.snapshot.params["id"])
        .then((descricao: string) => {
          this.ondeFica = descricao
        })
    })
  }
}
