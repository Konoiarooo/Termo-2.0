let wordDay = 'TESTE'
let observedLetters = []
let wordDigited = ''

const containers = document.getElementsByClassName('word-container')
let boxesSelected = document.getElementsByClassName('letter')

let boxSelected = null
let next = null
let previous= null

var regex = /^[a-zA-Z]+$/

const chars = wordDay.split('')

document.addEventListener('keydown', (e) => verifyBoxes(e))

function handleBoxClick({ target }){
    target.nextElementSibling.select()
}

function Initialize(){
    for (let index = 0; index < containers.length; index++) {
        selectAllBoxes(index)
    }
}

function verifyBoxes({ key }){
    findBeforeAfterBoxes()

    if(key === 'Enter'){
        handleEnterButtonPress()
    }
    else if(key === 'ArrowRight'){
        next?.select()
    }
    else if(key === 'ArrowLeft'){
        setTimeout(() => previous?.select(), 100)
    }
}

function findNextButton({ target }){
    if(!regex.test(target.value)){
        target.value = ''
        return
    }

    if(target.value.length > 0){
        if(next !== undefined && next?.value < 1){
            next?.select()
            return
        }

        for (let newIndex = boxesSelected?.length -1; newIndex >= 0; newIndex--) {
            if(boxesSelected.item(newIndex)?.lastElementChild.value < 1){
                boxesSelected.item(newIndex)?.lastElementChild.select()
                return
            }
        }
    }
}

function boxSeletedChange({ srcElement }){
    boxSelected = srcElement
}

function findBeforeAfterBoxes(){
    for (let index = 0; index < boxesSelected?.length; index++) {
        if(boxesSelected.item(index).children[1] === boxSelected){
            next = boxesSelected.item(index +1)?.children[1]
            previous = boxesSelected.item(index -1)?.children[1]
        }
    }
}

function isLetterCorrect(index){
    if(boxesSelected?.item(index).lastElementChild.value.toUpperCase() === chars[index]){
        boxesSelected.item(index).children[1].style.backgroundColor = 'green'
        wordDigited += boxesSelected.item(index).lastElementChild.value
        return true
    }

    return false
}

function isLetterInWord(index, ignoreLetter){
    if(!ignoreLetter && 
        wordDay.includes(boxesSelected?.item(index).lastElementChild.value.toUpperCase()) && 
        chars.indexOf(boxesSelected?.item(index).lastElementChild.value === -1) &&
        !observedLetters.includes(boxesSelected?.item(index).lastElementChild.value)){
        boxesSelected.item(index).children[1].style.backgroundColor = 'yellow'
        observedLetters.push(boxesSelected?.item(index).lastElementChild.value)
    }
}

function isEmpty(index){
    return boxesSelected?.item(index).lastElementChild.value < 1
}

function selectAllBoxes(index){
    if(containers.item(index).classList.contains('selected')){
        boxesSelected = containers.item(index).getElementsByClassName('letter')
        for (let index = 0; index < boxesSelected?.length; index++) {
            boxesSelected.item(index).lastElementChild.removeAttribute('readonly')
        }
    }
}

function selectNextConatiner(){
    for (let index = 0; index < containers.length; index++) {
        if(containers.item(index).classList.contains('selected')){
            containers.item(index).classList.remove('selected')
            for (let newIndex = 0; newIndex < boxesSelected?.length; newIndex++) {
                boxesSelected.item(newIndex).lastElementChild.setAttribute('readonly','readonly')
            }
            
            containers.item(index +1)?.classList.add('selected')
            boxesSelected = containers.item(index + 1)?.getElementsByClassName('letter')
            break
        }
    }

    for (let newIndex = 0; newIndex < boxesSelected?.length; newIndex++) {
        boxesSelected.item(newIndex)?.lastElementChild.removeAttribute('readonly')
    }

    boxesSelected?.item(0)?.lastElementChild.select()
}

function handleEnterButtonPress(){
    for (let index = 0; index < boxesSelected?.length; index++) {
        if(isEmpty(index)) {
            return
        }
    }

    for (let index = 0; index < boxesSelected?.length; index++) {
        isLetterInWord(index, isLetterCorrect(index))
    }

    observedLetters.length = 0
    if(wordDigited.toUpperCase() === wordDay)
        console.log('ganhou')
    else
    {
        selectNextConatiner()
        wordDigited = ''
    }
}

Initialize()