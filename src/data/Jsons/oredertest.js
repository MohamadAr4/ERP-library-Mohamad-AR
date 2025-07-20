let aOrder = [
  { id: "mstNum", name: "Number" },
  { id: "mstDate", name: "Date" },
  { id: "tdocId", name: "Bank.Doc" },
  { id: "trnDocn", name: "her.Num" },
  { id: "trnDocd", name: "her.Date" },
];

let PhFOrderOperations = [
  {sign: '1', label: 'ASC'},
  {sign: '-1', label: 'DESC'}
];

let meta = {
  Field: [
   { label: "Order.by",
    element: "Ord",
    field: "ord",
    isRequired: false,
    orderCount: 5,
    options: aOrder,
    aOpers: PhFOrderOperations,
    defValue: ["mstDate"],}
  ],
};
export {meta} ;