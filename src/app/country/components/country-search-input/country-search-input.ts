import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.html',
})
export class CountrySearchInput {

  value = output<string>();
  placeholder = input<string>('Buscar');
  debounceTime = input<number>();
  initialValue = input<string>('');

  inputValue = linkedSignal<string>(()=> this.initialValue() ?? '');

  debounceeffect = effect((onCleanup)=>{
    const value = this.inputValue();

    const timeout = setTimeout(()=>{this.value.emit(value)}, this.debounceTime());

    onCleanup(()=>{
      clearTimeout(timeout);
    })
  })

 }
