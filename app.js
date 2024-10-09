console.log("Hello DSNY4, welcome to B2S!!!!!!");
// We are creating constants that we will use later
const viz = document.getElementById("tableauViz");
let workbook;
let vizActiveSheet;
let dashboard;
let listSheets;

// The sheets we want to filter
let saleMap;
let totalSales;
let salesByProduct;
let salesBySegment;

// logging information about our workbook
function logWorkbookInformation() {
  //get the workbook
  workbook = viz.workbook;
  console.log(`The workbook name is ${workbook.name}`);

  // get the array of dashboards and stand alone sheets
  let sheets = workbook.publishedSheetsInfo;
  sheets.forEach((element) => {
    index = element.index;
    console.log(`The sheet with index [${index}] is: "${element.name}"`);
  });

  // Finding the active worksheet
  vizActiveSheet = workbook.activeSheet;
  console.log(`The active sheet is "${vizActiveSheet.name}"`);

  // List all of the worksheets within the active sheet
  listSheets = vizActiveSheet.worksheets;
  listSheets.forEach((element) => {
    index = element.index;
    worksheetName = element.name;
    console.log(`The worksheet with index [${index}] is: "${worksheetName}"`);
  });

  // Assign sheets to the variables created at the top of the script
  saleMap = listSheets.find((ws) => ws.name == "SaleMap");
  totalSales = listSheets.find((ws) => ws.name == "Total Sales");
  salesByProduct = listSheets.find((ws) => ws.name == "SalesbyProduct");
  salesBySegment = listSheets.find((ws) => ws.name == "SalesbySegment");
}

// Run our function when the workbook becomes interactive
viz.addEventListener("firstinteractive", logWorkbookInformation);

//Constants for buttons
const oregonWashingtonButton = document.getElementById("oregon_and_washington");
const clearFilterButton = document.getElementById("clear_filter");
const undoButton = document.getElementById("undo");

// create function for when buttons are pressed
function oregonWashFunction() {
  // Log what button pressed
  console.log(oregonWashingtonButton.value);
  // apply filter to all the sheets
  saleMap.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  totalSales.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesByProduct.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesBySegment.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
}

function clearStateFilter() {
  // Log what button pressed
  console.log(clearFilterButton.value);
  //Apply the filter to all of the sheets
  saleMap.clearFilterAsync("State");
  totalSales.clearFilterAsync("State");
  salesByProduct.clearFilterAsync("State");
  salesBySegment.clearFilterAsync("State");
}

function unDo() {
  // Log what button pressed
  console.log(undoButton.value);
  //Undo last action on viz
  viz.undoAsync();
}

// Event listners that re the button click
oregonWashingtonButton.addEventListener("click", oregonWashFunction);
clearFilterButton.addEventListener("click", clearStateFilter);
undoButton.addEventListener("click", unDo);
