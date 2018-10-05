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
  public ofertasArray: Oferta[]
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasServices) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa.pipe(debounceTime(1000),
      distinctUntilChanged(),
      switchMap((termo: string) => {

        return termo.trim() === "" ? of<Oferta[]>([]) : this.ofertasService.getOfertasPorDescricao(termo);
      }),
      catchError((erro: any) => {
        console.log(erro)
        return of<Oferta[]>([])
      })
    );
    this.ofertas.subscribe((ofertas: Oferta[]) => {
      console.log(ofertas)
      this.ofertasArray = ofertas
    })
  }

  public pesquisar(txtBusca: string): void {
    console.log("Disparando o metodo pesquisar")
    this.subjectPesquisa.next(txtBusca)

  }
}
