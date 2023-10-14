let font = ["games", "player", "players"]
let index=0

// let popedfont = font.shift()

// console.log(popedfont)
// console.log(font)
// let popedtwo= font.shift()
// console.log("popped Element two", popedtwo)
// console.log("after s(ecound poped method new array is ", font)

// let element %= font.length
document.getElementById('p').innerHTML = font[0]

function showArray(){

    index++
    console.log(index , font.length)
    // index %= font.length
    // console.log(index%=font.length)
document.getElementById('p').innerHTML = font[index]

    
}
