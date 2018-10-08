import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "descricaoReduzida",
})
export class DescricaoReduzida implements PipeTransform {
    transform(texto: string, qtdeCaracteresTruncar): string {
        return texto.length > qtdeCaracteresTruncar ? texto.substr(0, qtdeCaracteresTruncar) + '...' : texto;
    }
}