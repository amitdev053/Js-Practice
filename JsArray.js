//console.log("Array Method in javascript")

let array = ["Girl", "Boys", "female", "male", "Boys", "Boys"]
const uniqueArray = [];

// let set = [...new Set(array)]
// //console.log(set.length)


for(let value of array){
    // //console.log(value)
// //console.log(uniqueArray.includes(value))
    if(uniqueArray.includes(value)){
    uniqueArray.push(value)
    }
    // //console.log(uniqueArray)
}

let poparray = array.pop()
console.log("poparray", poparray)
console.log(array)
// array.push("Other")
// array.unshift("others")

// Filter Method of an array
let setfilters = "Boys"
// let filterresult = array.filter((element)=>{
//     return element !== setfilters
// })

let duplicate = array.filter((value, index, self)=>{
    // return self.indexOf(value) === index;

})


// //console.log(array.length)
// //console.log(filterresult)
// //console.log(duplicate)

let object ={
    Name:"Amit",
    Favourite:{
        Person: "Shivani",
        mostFourite :"Shivani",
        Property: "Shivani"


    },
    amitLove:"Shivani"
}
//console.log(object)
let newObj = Object.assign({}, object)

let convertObjArray = Object.entries(object)
newObj.Name = "Sazal"
//console.log(newObj)
//console.log(convertObjArray)



convertObjArray.map((element)=>{
    //console.log("Map of an array",element)
})

let positionarr = [291,112,285,286,640]

let newarr = positionarr.unshift(3)
console.log(positionarr)