console.log("apply method")

let obj1 ={
    list:"Blank",
    property: "Student",
    feature: function(name, ...rest){
       console.log(`This object lis is  ${this.list} and property is ${this.property} and the objects name is  ${name}`)
        
        console.log(`these all are called rest parameter ${rest}`)
    }
}
let obj2 ={
    list: "undefined",
    property:  "person"
}

// obj1.feature("abhishek") 
let arr =["amit", "nikhil","and", "all"]

let setobj2= obj1.feature.apply(obj2,arr) 


// obj1.feature.call(obj2, "first" + " "+ "secound"+ " " + "third") 