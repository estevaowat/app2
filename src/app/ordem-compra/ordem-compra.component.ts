import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css']
})
export class OrdemCompraComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

  public atualizarEndereco(endereco: string): void {
    console.log(endereco)
    this.endereco = endereco
    this.enderecoEstadoPrimitivo = false
    this.enderecoValido = (this.endereco.length > 3)
  }

  public atualizarNumero(numero: string): void {
    console.log(numero)
    this.numero = numero
    this.numeroEstadoPrimitivo = false 
    this.numeroValido = (this.numero.length > 0)
  }

  public atualizaComplemento(complemento: string): void {
    console.log(complemento)
    this.complemento = complemento
    this.complementoEstadoPrimitivo = false
    if (this.complemento.length > 0) {
      this.complementoValido = true
    }

  }
  public atualizarFormaPagamento(formaPagamento: string): void {
    console.log(formaPagamento)
    this.formaPagamento = formaPagamento
    this.formaPagamentoEstadoPrimitivo = false 
    this.formaPagamentoValido = this.formaPagamento.length > 0
  }
}
