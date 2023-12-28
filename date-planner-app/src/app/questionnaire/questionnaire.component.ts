import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';

export interface Hobby {
  name: string;
}

@Component({
  selector: 'app-questionnaire',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule, 
    MatCardModule, 
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './questionnaire.component.html',
  styleUrl: './questionnaire.component.scss'
})
export class QuestionnaireComponent implements OnInit{
  myControl = new FormControl<string | Hobby>('');
  options: Hobby[] = [
    {name: 'Indoors'},
    {name: 'Outdoors'},
    {name: 'Sports'},
    {name: 'Clubbing'},
    {name: 'Bar-Hopping'},
    {name: 'Arts'},
    {name: 'Movies'},
    {name: 'Learning'},
    {name: 'Cooking'},
    {name: 'Archery'},
    {name: 'Sightseeing'}
  ];
  filteredOptions!: Observable<Hobby[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  displayFn(hobby: Hobby): string {
    return hobby && hobby.name ? hobby.name : '';
  }

  private _filter(name: string): Hobby[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}
