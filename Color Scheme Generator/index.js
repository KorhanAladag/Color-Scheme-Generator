/*const colorButton = document.getElementById("color-button")*/

let colorScheme
let colorPalette = ""
let colorNames = ""

for (i = 0; i < 6; i ++) {
    colorPalette += `<div id="color-${i}" class="color"></div>`
    colorNames += `<p id="color-${i}-name" data-color="color-name"></p>`
}

function fetcher(){
    
    let color = document.getElementById("color-picker").value
    color = color.substring(1)
    const type = document.getElementById("color-type").value
    const url = `https://www.thecolorapi.com/scheme?hex=${color}&format=json&mode=${type}&count=6`
    fetch(url)
        .then(response => response.json())
         .then(data => {
            colorScheme = data.colors
            render()
        })     
}

function copy(containerid){
    if (window.getSelection) {
        // Chrome
        if (window.getSelection().empty) { 
            window.getSelection().empty()
        }
    }    
    if (document.selection ) {
            let range = document.body.createTextRange()
            document.execCommand("copy")
    }
    else if (window.getSelection) {
            let range = document.createRange()
            range.selectNode(document.getElementById(containerid))
            window.getSelection().addRange(range)
            document.execCommand("copy")
    }  
}


document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault()
    fetcher() 
})

document.body.addEventListener("click", e => {
        switch(e.target.id){
            case "color-0-name": 
                copy("color-0-name")
                break;
            case "color-1-name": 
                copy("color-1-name") 
                break;               
            case "color-2-name": 
                copy("color-2-name")
                break;
            case "color-3-name": 
                copy("color-3-name")
                break;
            case "color-4-name": 
                copy("color-4-name")
                break;
            case "color-5-name": 
                copy("color-5-name")                                                           
        }
})

function render() {
    colorScheme.map((color, index) => {

        document.getElementById(`color-${index}`).style.backgroundColor = color.hex.value

        document.getElementById(`color-${index}-name`).innerText = color.hex.value
    })
}

document.getElementById("color-palette").innerHTML = colorPalette
document.getElementById("color-names").innerHTML = colorNames
fetcher()