import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
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
      console.log("Passa aqui")
        this.route.parent.params.subscribe((parametros: Params) => {
            this.ofertaServices.getComoUsarPorId(parametros.id)
                .then((descricao: string) => {
                    console.log(descricao)
                    this.comoUsar = descricao
                }
                )
        })
    }
}
