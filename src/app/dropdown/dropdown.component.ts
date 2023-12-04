import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {
  @Input()
  items!: any[];

  @Input()
  btnName!: string;

  selectedItemName!: string;

  @Output()
  selectedItem:EventEmitter<any>= new EventEmitter();

  selectItem(item: any) {
    this.selectedItemName = item;
    this.selectedItem.emit(item);
  }
}
