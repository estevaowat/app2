import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { OfertasServices } from '../../ofertas.service'

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [OfertasServices]
})
export class ComoUsarComponent implements OnInit {
  public comoUsar: string = ''

  constructor(
    private route: ActivatedRoute,
    private ofertaServices: OfertasServices
  ) { }

  ngOnInit() {
    this.ofertaServices.getComoUsarPorId(this.route.parent.snapshot.params["id"])
      .then((descricao: string) => {
        console.log(descricao)
        this.comoUsar = descricao
      }
      )
  }

}
