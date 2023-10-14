console.log("Call Back Function Javascript")

function addarray(...arr) {

    let sum = 0;  
    for (let i of arr) { 
        // console.log(i)
        sum += i;
        // console.log(sum)  
    }  
    console.log(sum)
    return sum
    
}
function functiontwo(sum2){
 
 addarray(1,2,3,20)

}
functiontwo()
