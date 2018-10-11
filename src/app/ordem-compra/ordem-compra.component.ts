import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {

  constructor(private ordemCompraService: OrdemCompraService) { }

  @ViewChild('formulario') public formulario: NgForm
  ngOnInit() {

  }

  public confirmarCompra(): void {
    //console.log(this.formulario.value)
    let pedido: Pedido = new Pedido(this.formulario.value.endereco,
      this.formulario.value.numero,
      this.formulario.value.complemento,
      this.formulario.value.formaPagamento,
    )

    this.ordemCompraService.efetivarCompra(pedido)
      .subscribe((idPedido:number)=>console.log("O numero do pedido inserido foi ", idPedido))

  }
}
