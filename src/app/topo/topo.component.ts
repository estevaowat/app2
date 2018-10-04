import { Component, OnInit } from '@angular/core';
import { OfertasServices } from '../ofertas.service'
import { Observable } from 'rxjs';
import { Oferta } from '../shared/oferta.model';
@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasServices]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>

  constructor(private ofertasService: OfertasServices) { }

  ngOnInit() {
  }

  public pesquisar(txtBusca: string): void {
    this.ofertas = this.ofertasService.getOfertasPorDescricao(txtBusca)
    this.ofertas.subscribe(
      (ofertas: Oferta[]) => console.log(ofertas))
  }
}
