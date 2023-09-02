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



let person = {
    name: "Shaun",
    contact: {
        phone: "934-379-1420",
        email: "shaun2000@abc.com",
        address: {
            city: "London",
            country: "United Kingdom"
        }
    }
};
let objecttype = person.contact.address.country
let arraytype = person["contact"]["address"]["country"];

console.log(typeof objecttype, typeof arraytype)