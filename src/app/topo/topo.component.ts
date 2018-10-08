import { Component, OnInit } from '@angular/core';
import { OfertasServices } from '../ofertas.service'
import { Oferta } from '../shared/oferta.model';
import { Observable, Subject } from 'rxjs'
import { switchMap, } from 'rxjs/internal/operators/switchMap';
import { debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasServices]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasServices) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa.pipe(debounceTime(750),
      distinctUntilChanged(),
      switchMap((termo: string) => {
        return termo.trim() === "" ? of<Oferta[]>([]) : this.ofertasService.getOfertasPorDescricao(termo);
      }),
      catchError((erro: any) => {
        return of<Oferta[]>([])
      })
    );
  }

  public pesquisar(txtBusca: string): void {
    this.subjectPesquisa.next(txtBusca)
  }
  public limpaPesquisa() {
    this.subjectPesquisa.next('')
  }
}
