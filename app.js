console.log("Hello DSNY4, welcome to B2S!!!!!!");
// We are creating constants that we will use later
const viz = document.getElementById("tableauViz");
let workbook;
let vizActiveSheet;
let dashboard;
let listSheets;
let saleMap;
let totalSales;
let salesByProduct;
let salesBySegment;

// Logging information about our workbook
function logWorkbookInformation() {
  workbook = viz.workbook;
  console.log(`The workbook name is ${workbook.name}`);

  // Get the array of dashboards and stand-alone sheets
  let sheets = workbook.publishedSheetsInfo;
  sheets.forEach((element) => {
    let index = element.index;
    console.log(`The sheet with index ${index} is: ${element.name}`);
  });

  // Finding the actual active worksheet
  vizActiveSheet = workbook.activeSheet;
  console.log(`The active sheet is ${vizActiveSheet.name}`);

  // List all of the worksheets within the active sheet
  listSheets = vizActiveSheet.worksheets;
  listSheets.forEach((element) => {
    let index = element.index;
    let worksheetName = element.name;
    console.log(`The worksheet with index ${index} is ${worksheetName}`);
  });

  saleMap = listSheets.find((ws) => ws.name === "SaleMap");
  totalSales = listSheets.find((ws) => ws.name === "Total Sales");
  salesByProduct = listSheets.find((ws) => ws.name === "SalesbyProduct");
  salesBySegment = listSheets.find((ws) => ws.name === "SalesbySegment");
}

// Constants for buttons
const oregonWashingtonButton = document.getElementById("oregon_and_washington");
const clearFilterButton = document.getElementById("reset");
const undoButton = document.getElementById("undo");

// Create functions for when buttons are pressed
function oregonWashFunction() {
  console.log(oregonWashingtonButton.value);
  saleMap.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  totalSales.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesByProduct.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesBySegment.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
}

function unDo() {
  console.log(undoButton.value);
  viz.undoAsync();
}

function clearStateFilter() {
  console.log(clearFilterButton.value);
  saleMap.clearFilterAsync("State");
  totalSales.clearFilterAsync("State");
  salesByProduct.clearFilterAsync("State");
  salesBySegment.clearFilterAsync("State");
}

oregonWashingtonButton.addEventListener("click", oregonWashFunction);
clearFilterButton.addEventListener("click", clearStateFilter);
undoButton.addEventListener("click", unDo);

// Run our function when the workbook becomes interactive
viz.addEventListener("firstinteractive", logWorkbookInformation);
