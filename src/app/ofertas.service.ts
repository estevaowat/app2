import { Http } from '@angular/http'
import { Injectable } from '@angular/core'
import { Oferta } from './shared/oferta.model';

@Injectable()

export class OfertasServices {

    constructor(private http: Http) {

    }
    public getOfertas(): Promise<Oferta[]> {
        return this.http.get("http://localhost:3000/ofertas?destaque=true")
            .toPromise()
            .then((resposta: any) => resposta.json())
    }

}