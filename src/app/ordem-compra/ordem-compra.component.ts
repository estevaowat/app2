import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model';
@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {

  //Criacao de um pedido
  public pedido: Pedido = new Pedido('', '', '', '')
  public idCompraPedido: number //default undefined
  public endereco: string = ''
  public numero: string = ''
  public complemento: string = ''
  public formaPagamento: string = ''


  // variaveis para controlar a validacao dos campos
  public enderecoValido: boolean
  public numeroValido: boolean
  public complementoValido: boolean
  public formaPagamentoValido: boolean

  //variaveis para controlar o estado primitivo (pristine)
  public enderecoEstadoPrimitivo: boolean = true
  public numeroEstadoPrimitivo: boolean = true
  public complementoEstadoPrimitivo: boolean = true
  public formaPagamentoEstadoPrimitivo: boolean = true

  //controlar o botao de confirmar compra
  public formOrdemCompra: string = 'disabled'

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {
    //this.ordemCompraService.efetivarCompra(pedido);
  }

  public atualizarEndereco(endereco: string): void {
    //console.log(endereco)
    this.endereco = endereco
    this.enderecoEstadoPrimitivo = this.endereco.length == 0
    this.enderecoValido = (this.endereco.length > 3)
    this.habilitaForm()
  }

  public atualizarNumero(numero: string): void {
    //console.log(numero)
    this.numero = numero
    this.numeroEstadoPrimitivo = this.numero.length == 0
    this.numeroValido = (this.numero.length > 0)
    this.habilitaForm()
  }

  public atualizaComplemento(complemento: string): void {
    //console.log(complemento)
    this.complemento = complemento
    this.complementoEstadoPrimitivo = false
    this.complementoEstadoPrimitivo = this.complemento.length == 0
    if (this.complemento.length > 0) {
      this.complementoValido = true
    }
    this.habilitaForm()
  }
  public atualizarFormaPagamento(formaPagamento: string): void {
    //console.log(formaPagamento)
    this.formaPagamento = formaPagamento
    this.formaPagamentoEstadoPrimitivo = false
    this.formaPagamentoValido = this.formaPagamento.length > 0
    this.habilitaForm()
  }

  public habilitaForm(): void {
    this.formOrdemCompra = this.enderecoValido && this.numeroValido && this.formaPagamentoValido ? '' : 'disabled'
  }

  public confirmarCompra(): void {
    this.pedido.endereco = this.endereco
    this.pedido.numero = this.numero
    this.pedido.complemento = this.complemento
    this.pedido.formaPagamento = this.formaPagamento

    this.ordemCompraService.efetivarCompra(this.pedido)
      .subscribe((idPedido: any) => {
        console.log(idPedido)
        this.idCompraPedido = idPedido
      })
  }
}
