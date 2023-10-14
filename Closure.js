console.log("Closer Function in javascript")

function firstCloser(name) {
 console.log(name)
    function secoundClosure(){
        console.log(name)
    }
    secoundClosure()
}
firstCloser("amit")

function recursive(){
    console.log("This is recursive function")
    recursive()
}
recursive()

