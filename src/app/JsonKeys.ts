export const KEY_TYPES = {
  number: "NUMBER",
  string: "STRING"
};

export const COLUMN_NAMES = {
  direction: 'Select Direction',
  value: 'Enter Value'
}

export const DIRECTION = {
  incremental: 'INCREMENTAL',
  decremental: 'DECREMENTAL'
}

export interface JsonKeys {
  keyName: string;
  type: string;  // string/number
  columnName?: string; //name of the column
  displayType?: string;
  direction?: string;
  value?: string; // if type is string then value is string
  startValue?: number;  // if type is number then startValue is integer value
};
