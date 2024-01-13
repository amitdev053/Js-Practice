let font = [
  "games",
  "player",
  "players",
  "Crickter",
  "football",
  "Hockey",
  "Shivanm",
];
let brightness = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130];
let index = 0;

document.getElementById("p").innerHTML = brightness[index];
function showArray() {

  let arrLength = font.length;
  console.log(arrLength);

  let arrbirghtness = brightness.length;
  console.log("****", brightness);

  // if(index < arrLength - 1){
  //     console.log("if condition")
  //     index++
  //     console.log(index, arrLength)
  //     document.getElementById("p").innerHTML = font[index]

  // }else if (index == 0){
  //     index++
  //     document.getElementById("p").innerHTML = font[index]

  // }else{
  //     console.log("else condition")
  //     index = 0

  //     document.getElementById("p").innerHTML = font[index]

  // }

  if (index < arrbirghtness - 1) {
    console.log("if condition");
    index++;
    // console.log(index, arrLength)
    document.getElementById("p").innerHTML = brightness[index];
  } else if (index == 0) {
    index++;
    document.getElementById("p").innerHTML = brightness[index];
  } else {
    console.log("else condition");
    index = 0;

    document.getElementById("p").innerHTML = brightness[index];
  }
}

function controlFilter(filterName) {
    console.log(filterName);
    let recentFilterName = [];
  
    // Your logic here based on the value of filterName
  
    // Example: Push filterName into recentFilterName
    recentFilterName.push(filterName);
  
    // Return or use recentFilterName as needed
    return recentFilterName;
  }
  
  // Example usage:
  const result = controlFilter("someFilter");
  console.log(result);