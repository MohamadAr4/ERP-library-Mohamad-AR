
let PhFOper_EQ = 0;
let PhFOper_NE = 1;
let PhFOper_GT = 2;
let PhFOper_GE = 3;
let PhFOper_LT = 4;
let PhFOper_LE = 5;
let PhFOper_BT = 6;
let PhFOper_NB = 7;
let PhFOper_ST = 8;
let PhFOper_ED = 9;
let PhFOper_CT = 10;
let PhFOper_NST = 11;
let PhFOper_NED = 12;
let PhFOper_NCT = 13;



let PhAggregate_None = 1;
let PhAggregate_Count = 1;
let PhAggregate_Sum = 2;
let PhAggregate_Avg = 3;
let PhAggregate_Min = 4;
let PhAggregate_Max = 5;
let PhAggregate_StdDev = 6;
let PhAggregate_Var = 7;
let PhAggregate_Median = 8;

let PhFOperations = [
  {sign: '=', label: ('qoper.equal'), tooltip: ('qoper.equal')},
  {sign: '!=', label: ('qoper.not.equal'), tooltip: ('qoper.not.equal')},
  {sign: '>', label: ('qoper.greater.than'), tooltip: ('qoper.greater.than')},
  {sign: '>=', label: ('qoper.grater.than.or.equal'), tooltip: ('qoper.grater.than.or.equal')},
  {sign: '<', label: ('qoper.less.than'), tooltip: ('qoper.less.than')},
  {sign: '<=', label: ('qoper.less.than.or.equal'), tooltip: ('qoper.less.than.or.equal')},
  {sign: '<>', label: ('qoper.between'), tooltip: ('qoper.between')},
  {sign: '><', label: ('qoper.not.between'), tooltip: ('qoper.not.between')},
  {sign: '[%', label: ('qoper.start.with'), tooltip: ('qoper.start.with')},
  {sign: '%]', label: ('qoper.end.with'), tooltip: ('qoper.end.with')},
  {sign: '%', label: ('qoper.contain'), tooltip: ('qoper.contain')},
  {sign: '![%', label: ('qoper.not.start.with'), tooltip: ('qoper.not.start.with')},
  {sign: '!%]', label: ('qoper.not.end.with'), tooltip: ('qoper.not.end.with')},
  {sign: '!%', label: ('qoper.not.contain'), tooltip: ('qoper.not.contain')}
];


let PhAggregate = [
  {value: PhAggregate_None, label: ''},
  {value: PhAggregate_Count, label: ('Agg.Count')},
  {value: PhAggregate_Sum, label: ('Agg.Sum')},
  {value: PhAggregate_Avg, label: ('Agg.Avg')},
  {value: PhAggregate_Min, label: ('Agg.Min')},
  {value: PhAggregate_Max, label: 'Agg.Max'},
  {value: PhAggregate_StdDev, label: 'Agg.StdDev'},
  {value: PhAggregate_Var, label: 'Agg.Variance'},
  {value: PhAggregate_Median, label: 'Agg.Median'}
];

let PhFC_Text = 0;
let PhFC_Select = 1;
let PhFC_Number = 2;
let PhFC_DatePicker = 3;
let PhFC_Autocomplete = 4;
let PhFC_CheckBox = 5;
let PhFC_Radio = 6;
let PhFC_Empty = 7;

export default PhFOperations;

export {PhAggregate, PhAggregate_None,
  PhFC_Text,
  PhFC_Select,
  PhFC_Number,
  PhFC_DatePicker,
  PhFC_Autocomplete,
  PhFC_CheckBox,
  PhFC_Radio,
  PhFC_Empty,
  PhAggregate_Count,
  PhAggregate_Sum,
  PhAggregate_Avg,
  PhAggregate_Min,
  PhAggregate_Max,
  PhAggregate_StdDev,
  PhAggregate_Var,
  PhAggregate_Median,PhFOper_EQ, PhFOper_NE, PhFOper_GT, PhFOper_GE, PhFOper_LT, PhFOper_LE, PhFOper_BT, PhFOper_NB, PhFOper_ST, PhFOper_ED, PhFOper_CT, PhFOper_NST, PhFOper_NED, PhFOper_NCT};