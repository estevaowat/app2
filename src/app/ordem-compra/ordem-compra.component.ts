import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'
import { CarrinhoService } from '../carrinho.service';
import { ItemCarrinho } from '../shared/item-carrinho.model';


@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService, CommonModule]
})
export class OrdemCompraComponent implements OnInit {

  public idPedidoCompra: number
  public itensCarrinho: ItemCarrinho[] = []
  public formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null, [Validators.required])
  })

  constructor(
    private ordemCompraService: OrdemCompraService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirItens()
    console.log(this.carrinhoService.exibirItens());
  }

  public confirmarCompra(): void {
    if (this.formulario.status == "INVALID") {
      this.formulario.get('endereco').markAsTouched()
      this.formulario.get('numero').markAsTouched()
      this.formulario.get('complemento').markAsTouched()
      this.formulario.get('formaPagamento').markAsTouched()
    }
    else {
      if (this.carrinhoService.exibirItens().length <= 0) {
        alert("Você deve colocar pelo menos um item no carrinho.")
      }
      else {
        let pedido: Pedido = new Pedido(
          this.formulario.value.endereco,
          this.formulario.value.numero,
          this.formulario.value.complemento,
          this.formulario.value.formaPagamento,
          this.carrinhoService.exibirItens()
        )
        this.ordemCompraService.efetivarCompra(pedido)
          .subscribe((idPedidoCompra: number) => {
            console.log(idPedidoCompra)
            this.idPedidoCompra = idPedidoCompra
            this.carrinhoService.limparCarrinho()
          })
      }
    }

  }

  public adicionarQuantidade(item: ItemCarrinho): void {
    this.carrinhoService.adicionarQuantidade(item)
  }
  public diminuirQuantidade(item: ItemCarrinho): void {
    this.carrinhoService.diminuirQuantidade(item)
  }
  public alterarQuantidade(item: ItemCarrinho, tipo: string): void {
    this.carrinhoService.alterarQuantidade(item, tipo)
  }
}
