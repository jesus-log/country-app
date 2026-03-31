import { Component, computed, input } from '@angular/core';
import { Country } from '../../interfaces/county.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'country-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-list.html',
})
export class CountryList {

  countries = input.required<Country[]>();

  errorMessage = input<string | unknown | null>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);

  normalizedError = computed(() => {
    const error = this.errorMessage();

    if (!error) return null;
    if (typeof error === 'string') return error;
    if (error instanceof Error) return error.message;

    const maybeError = error as { message?: unknown };
    if (typeof maybeError.message === 'string') return maybeError.message;

    return 'Unexpected error';
  });
}
