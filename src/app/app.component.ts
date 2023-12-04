import { Component, OnInit } from '@angular/core';
import { FileUploadService } from './file-upload.service';
import { COLUMN_NAMES, DIRECTION, JsonKeys, KEY_TYPES } from './JsonKeys';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  selectedFile: File | null = null;
  selectedOutputFileName: string = 'countryData.json';
  headers: string[] = [];
  columnName!: string;
  displayValueColumn!: string;
  extraJsonKeys: JsonKeys[] = [];
  keyTypes = Object.values(KEY_TYPES);
  directions = Object.values(DIRECTION);
  jsonKeyValues: { [key: string]: string } = {};
  extraJsonArray: any[] = [];
  data = {
    fileName: this.selectedFile?.name,
    jsonFileName: this.selectedOutputFileName,
    jsonKeysMap: this.jsonKeyValues,
    staticFields: this.extraJsonArray
  };
  

  constructor(private fileUploadService: FileUploadService) {}


  ngOnInit(): void {

  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.selectedFile = inputElement.files ? inputElement.files[0] : null;
  }

  onOutputFileNameSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.selectedOutputFileName = inputElement.value;
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

  onDownload(){
    if(this.extraJsonKeys){
      this.addExtraKeys();
    }
    this.data = {
      fileName: this.selectedFile?.name,
      jsonFileName: this.selectedOutputFileName,
      jsonKeysMap: this.jsonKeyValues,
      staticFields: this.extraJsonArray
    };
    if(this.jsonKeyValues || this.extraJsonArray){
      this.fileUploadService.downloadFile(this.data).subscribe(
        (fileData: Blob) => {
          const blob = new Blob([fileData], { type: 'application/octet-stream' });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = this.selectedOutputFileName;
          link.click();
        },
        error => {
          console.error('Error downloading file:', error);
          // Handle error as needed
        }
      );

    }
  }

  addExtraKeys(){
    for(const key of this.extraJsonKeys){
      if(key.type == 'NUMBER'){
        this.extraJsonArray.push({
          name : key.keyName,
          startValue : key.startValue,
          direction : key.direction
        })
      }else if(key.type == 'STRING'){
        this.extraJsonArray.push({
          name: key.keyName,
          value: key.value
        })
      }
    }
  }
}
