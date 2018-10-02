import { Http } from '@angular/http'
import { Injectable } from '@angular/core'
import { Oferta } from './shared/oferta.model';
import { API_URL } from './app.api'

@Injectable()

export class OfertasServices {

    constructor(private http: Http) {

    }
    public getOfertas(): Promise<Oferta[]> {
        return this.http.get(`${API_URL}?destaque=true`)
            .toPromise()
            .then((resposta: any) => resposta.json())
    }

    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
        return this.http.get(`${API_URL}?categoria=${categoria}`)
            .toPromise()
            .then((resposta: any) => resposta.json())
    }
    
    public getOfertasPorId(id: number): Promise<Oferta> {
        return this.http.get(`${API_URL}?id=${id}`)
            .toPromise()
            .then((resposta: any) => resposta.json()[0])
    }
}