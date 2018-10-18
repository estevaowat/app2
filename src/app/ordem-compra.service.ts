import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Pedido } from "./shared/pedido.model";
import { API_URL_PEDIDO } from "./app.api";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators'

@Injectable()
export class OrdemCompraService {

    constructor(private http: Http) { }

    public efetivarCompra(pedido: Pedido): Observable<number> {
        console.log(pedido)
        let headers: Headers = new Headers()
        headers.append('Content-type', 'application/json')
        return this.http.post(
            `${API_URL_PEDIDO}`,
            JSON.stringify(pedido),
            new RequestOptions({ headers: headers })
        ).pipe(
            map((resposta: Response) => resposta.json().id
            ))
    }
}