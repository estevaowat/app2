import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { OfertasServices } from './../ofertas.service'
import { Oferta } from "./../shared/oferta.model"
import { CarrinhoService } from '../carrinho.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasServices]
})
export class OfertaComponent implements OnInit {

  public oferta: Oferta

  constructor(private route: ActivatedRoute,
    private ofertaService: OfertasServices,
    private carrinhoService: CarrinhoService) { }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.ofertaService.getOfertasPorId(this.route.snapshot.params["id"])
        .then((oferta: Oferta) => {
          this.oferta = oferta
        })
    })

  }

  public adicionarItemCarrinho(): void {
    this.carrinhoService.incluirItem(this.oferta)
    console.log(this.carrinhoService.exibirItens())
  }
}
