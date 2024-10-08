console.log("Hello DSNY4, welcome to B2S!!!!!!");
// We are creating constants that we will use later
const viz = document.getElementById("tableauViz");
let workbook;
let vizActiveSheet;
let dashboard;
let listSheets;

// logging informaiton about our workbook

function logWorkbookInformation() {
  //get the workbook
  workbook = viz.workbook;
  console.log(`The workbook name is ${workbook.name}`);
}

// Run our function when the workbook becomes interactive
viz.addEventListener("firstinteractive", logWorkbookInformation);
