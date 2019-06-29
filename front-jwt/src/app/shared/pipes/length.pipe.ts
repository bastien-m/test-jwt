import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'length'
})
export class LengthPipe implements PipeTransform {
    transform(value: string, length: number): string {
        return value.substring(0, length)
    }
}