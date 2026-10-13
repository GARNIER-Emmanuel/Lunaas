import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sentenceLines' })
export class SentenceLines implements PipeTransform {
  transform(text: string): string {
    return text.replace(/\. +/g, '.\n');
  }
}
