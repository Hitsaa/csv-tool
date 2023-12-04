import { Component, Input, OnInit } from '@angular/core';
import { FileUploadService } from './file-upload.service';
import { COLUMN_NAMES, DIRECTION, JsonKeys, KEY_TYPES } from './JsonKeys';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  selectedFile: File | null = null;
  headers: string[] = [];
  columnName!: string;
  displayValueColumn!: string;
  extraJsonKeys: JsonKeys[] = [];
  keyTypes = Object.values(KEY_TYPES);
  directions = Object.values(DIRECTION);

  constructor(private fileUploadService: FileUploadService) {}

  ngOnInit(): void {

  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.selectedFile = inputElement.files ? inputElement.files[0] : null;
  }

  onUpload(event: Event): void {
    event?.preventDefault();
    if (this.selectedFile) {
      this.fileUploadService.uploadFile(this.selectedFile).subscribe({
        next: (value) => {
          if(Array.isArray(value)) {
            this.headers = value;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.error('No file selected');
    }
  }

  selectKeyType(type: string, index: number) {
    if(type === KEY_TYPES.number) {
      this.extraJsonKeys[index].columnName = COLUMN_NAMES.direction;
      this.extraJsonKeys[index].displayType = 'dropdown';
    }
    else {
      this.extraJsonKeys[index].columnName = COLUMN_NAMES.value;
      this.extraJsonKeys[index].displayType = 'value';
    }
    this.extraJsonKeys[index].type = type;
  }

  selectedDirection(event: any, index: number) {
    this.extraJsonKeys[index].direction = event;
  }

  setKeyName(event: any, index: number) {
    this.extraJsonKeys[index].keyName = event.target.value;
  }

  setCustomValue(event: any, index: number) {
    this.extraJsonKeys[index].value = event.target.value;
  }

  setStartValue(event: any, index: number) {
    this.extraJsonKeys[index].startValue = event.target.value;
  }

  addJsonKey() {
    this.extraJsonKeys.push({
      keyName: '',
      type: ''
    })
  }

  removeJsonKey(index: number) {
    this.extraJsonKeys.splice(index,1);
  }
}
