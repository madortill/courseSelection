const DATA = {
    'בה"ד-6': [
        `קורס-בהד-6`,
        `קורס-2`,
        `קורס-3`,
        `קורס-4`,
    ],    
    'בה"ד-7': [
        `קורס-בהד-7`,
        `קורס-2`,
        `קורס-3`,
        `קורס-4`,
    ],    
    'בה"ד-10': [
        `קורס-בהד-10`,
        `קורס-2`,
        `קורס-3`,
        `קורס-4`,
    ],    
    'בה"ד-11': [
        `קורס-1`,
        `קורס-2`,
        `קורס-3`,
        `קורס-4`,
    ],    
    'בה"ד-13': [
        `קורס-1`,
        `קורס-2`,
        `קורס-3`,
        `קורס-4`,
    ],    
    'בה"ד-20': [
        `קורס-1`,
        `קורס-2`,
        `קורס-3`,
        `קורס-4`,
    ],    
    'בה"ד-חינוך': [
        `קורס-1`,
        `קורס-2`,
        `קורס-3`,
        `קורס-4`,
    ],      
    'מפקדה': [
        `קורס-1`,
        `קורס-2`,
        `קורס-3`,
        `קורס-4`,
    ],      
}


//completeSentence
let strChoosenBhd;
let strChoosenCourse;
// const
const DELAY_AFTER_SENTENCE = 3000;

/* loading function
--------------------------------------------------------------
Description: */
window.addEventListener("load", () => { 
    /* for complete the sentence----------------------------------*/
    addContent();
});


/* addContent
--------------------------------------------------------------
Description: */
const addContent = () => {
    document.querySelector(`.completeSentenceContainer`).innerHTML = "";
    // create sentence
    let bhd = El("div", {cls: `bhdContainer`},
        El("div", {cls: `sentence`},`בחרו את שם הבה"ד אליו אתם שייכים:`),
        El("div", {cls: `dropDown`},
            El("div", {cls: `dropDownTitle`, listeners: {click : controlDropDownBhd}}, "בחר/י..."),
            El("div", {cls: `containerDropDown`})
        ),
    );
    let course = El("div", {cls: `courseContainer`},
        El("div", {cls: `sentence`},`בחרו את שם הקורס אליו אתם שייכים:`),
        El("div", {cls: `dropDown`},
            El("div", {cls: `dropDownTitle`}, "בחר/י..."),
            El("div", {cls: `containerDropDown`})
        ),
    );
    document.querySelector(`.completeSentenceContainer`).append(bhd);
    document.querySelector(`.completeSentenceContainer`).append(course);
    //create check button (without listener)
    let check =  El("div", {cls: `checkButtonSentence`}, "שלח");
    document.querySelector(`.completeSentenceContainer`).append(check);
}

/* controlDropDownBhd
--------------------------------------------------------------
Description: */
const controlDropDownBhd = () => {
    document.querySelector(`.bhdContainer .dropDownTitle`).innerHTML = "בחר/י...";
    document.querySelector(`.bhdContainer .dropDownTitle`).removeEventListener("click" , controlDropDownBhd);
    for(let bhd of Object.keys(DATA)){
        let dropDownItem = El("div", {classes: [`dropDownItem`, `ans${bhd}`, bhd], listeners: {click : selectAnswerBhd}},addSpace(bhd));
        document.querySelector(`.bhdContainer .containerDropDown`).append(dropDownItem);
    }
}

/* controlDropDownCourse
--------------------------------------------------------------
Description: */
const controlDropDownCourse = () => {
    document.querySelector(`.courseContainer .dropDownTitle`).innerHTML = "בחר/י...";
    document.querySelector(`.courseContainer .dropDownTitle`).removeEventListener("click" , controlDropDownCourse);
    for(let i = 0; i < DATA[strChoosenBhd].length; i++){
        let dropDownItem = El("div", {classes: [`dropDownItem`, `ans${i}`, `${DATA[strChoosenBhd][i]}`], listeners: {click : selectAnswerCourse}}, addSpace(DATA[strChoosenBhd][i]));
        document.querySelector(`.courseContainer .containerDropDown`).append(dropDownItem);
    }
}

/* selectAnswerBhd
--------------------------------------------------------------
Description: */
const selectAnswerBhd = (event) => {
    strChoosenBhd = event.currentTarget.classList[2];
    document.querySelector(`.bhdContainer .dropDownTitle`).innerHTML = addSpace(strChoosenBhd);
    document.querySelector(`.bhdContainer .containerDropDown`).innerHTML = ``;
    document.querySelector(`.bhdContainer .dropDownTitle`).addEventListener("click", controlDropDownBhd);
    document.querySelector(`.courseContainer .dropDownTitle`).innerHTML = "בחר/י...";
    document.querySelector(`.courseContainer .dropDownTitle`).addEventListener("click", controlDropDownCourse);
}

/* selectAnswerCourse
--------------------------------------------------------------
Description: */
const selectAnswerCourse = (event) => {
    strChoosenCourse = event.currentTarget.classList[2];
    document.querySelector(`.courseContainer .dropDownTitle`).innerHTML = addSpace(strChoosenCourse);
    document.querySelector(`.courseContainer .containerDropDown`).innerHTML = ``;
    document.querySelector(`.courseContainer .dropDownTitle`).addEventListener("click", controlDropDownCourse);
    document.querySelector(`.checkButtonSentence`).addEventListener("click", checkAnswer);
}

/* checkAnswer
--------------------------------------------------------------
Description: */
const checkAnswer = () => {
    document.querySelector(`.courseContainer .dropDownTitle`).removeEventListener("click" , controlDropDownCourse);
    document.querySelector(`.bhdContainer .dropDownTitle`).removeEventListener("click" , controlDropDownBhd);
    console.log(strChoosenBhd);
    console.log(strChoosenCourse);
}

// for all of the options - dont delete
/* addSpace
--------------------------------------------------------------
Description: change hyphen to space */
const addSpace = (phrase) => {
    return phrase.replace(/-/g, ' ');
}

/*
shuffle
------------------------------------------------
Description: take orgnaiz array and shffel it
Parameters: array.
------------------------------------------------
Programer: Gal
------------------------------------------------
*/
function shuffle(arr) {
    let tmp = arr.slice();
    for (let i = 0; i < arr.length; i++) {
        let index = Math.floor(Math.random() * tmp.length);
        arr[i] = tmp[index];
        tmp = tmp.slice(0, index).concat(tmp.slice(index + 1));
    }
    return arr;
}

/* El
--------------------------------------------------------------
Description: for all of the options - dont delete */
function El(tagName, options = {}, ...children) {
    let el = Object.assign(document.createElement(tagName), options.fields || {});
    if (options.classes && options.classes.length) el.classList.add(...options.classes);
    else if (options.cls) el.classList.add(options.cls);
    if (options.id) el.id = options.id;
    el.append(...children.filter(el => el));
    for (let listenerName of Object.keys(options.listeners || {}))
        if (options.listeners[listenerName]) el.addEventListener(listenerName, options.listeners[listenerName], false);
    for (let attributeName of Object.keys(options.attributes || {})) {
        if (options.attributes[attributeName] !== undefined) el.setAttribute(attributeName, options.attributes[attributeName]);
    }
    return el;
}
