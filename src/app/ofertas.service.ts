import { Http } from '@angular/http'
import { Injectable } from '@angular/core'
import { Oferta } from './shared/oferta.model';
import { API_URL_OFERTAS, API_URL_COMO_USAR, API_URL_ONDE_FICA } from './app.api'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'


@Injectable()

export class OfertasServices {

    constructor(private http: Http) {

    }
    public getOfertas(): Promise<Oferta[]> {
        return this.http.get(`${API_URL_OFERTAS}?destaque=true`)
            .toPromise()
            .then((resposta: any) => resposta.json())
    }

    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
        return this.http.get(`${API_URL_OFERTAS}?categoria=${categoria}`)
            .toPromise()
            .then((resposta: any) => resposta.json())
    }

    public getOfertasPorId(id: number): Promise<Oferta> {
        return this.http.get(`${API_URL_OFERTAS}?id=${id}`)
            .toPromise()
            .then((resposta: any) => resposta.json()[0])
    }
    public getOfertasPorDescricao(texto: string): Observable<Oferta[]> {
        return this.http.get(`${API_URL_OFERTAS}?descricao_oferta_like=${texto}`)
            .pipe(map((resposta: any) => resposta.json()))
    }

    public getComoUsarPorId(id: number): Promise<string> {
        return this.http.get(`${API_URL_COMO_USAR}?id=${id}`)
            .toPromise()
            .then((resposta: any) => resposta.json()[0].descricao)
    }

    public getOndeFicaPorId(id: number): Promise<string> {
        return this.http.get(`${API_URL_ONDE_FICA}?id=${id}`)
            .toPromise()
            .then((resposta: any) => resposta.json()[0].descricao)
    }

}