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

obj1.feature.call(obj2, "amit" ,  "first" + " "+ "secound"+ " " + "third") 


// obj1.feature.call(obj2, "first" + " "+ "secound"+ " " + "third") 



