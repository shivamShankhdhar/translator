const fromText = document.getElementById("textarea-0");
const toText = document.getElementById("textarea-1");
changingCssProperties = document.getElementById('translate-btn');

const selectTag = document.querySelectorAll("select");
translateBtn = document.getElementById('translate');

var text ;
var translateFrom ;
var translateTo ;

selectTag.forEach((tag,id) =>{
  for(const country_code in countries){
    let selected;
    if(id == 0 && country_code == "en-GB"){
      selected = "selected";
    }else if(id == 1 && country_code == "hi-IN"){
      selected = "selected"
    }
    let option =`<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
    tag.insertAdjacentHTML("beforeend",option);
  }
});
translateBtn.addEventListener("click",()=>{
  text          =  fromText.value;
  translateFrom = selectTag[0].value;
  translateTo   = selectTag[1].value;

  // console.log("Entered in translate button");
  if(text!=""){
    // translating speech first
    let utterence = new SpeechSynthesisUtterance("Translating");
    utterence.lang = selectTag[0].value;
    speechSynthesis.speak(utterence);

// hiding the message if previously displaying
    document.getElementById('message').style.display = 'none';
  translateBtn.innerText = "Translating...";
  changingCssProperties.style.background="#34EC21";
  changingCssProperties.style.color="white";
  // console.log(text,translateFrom,translateTo);
  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  fetch(apiUrl).then(res=>res.json()).then(data=>{
    // console.log(data);
    toText.value = data.responseData.translatedText;
    translateBtn.innerText = "Translate";
    changingCssProperties.style.background="#036EC9";
    changingCssProperties.style.color="#ffffff";
  });
}else{
  document.getElementById('message').style.display = 'block';
}
});

var msgClose = document.getElementById('closeMsgBtn');
msgClose.addEventListener("click",()=>{
  document.getElementById('message').style.display = 'none';
});

var copyClipBtn = document.getElementById('leftbtn0');

copyClipBtn.addEventListener("click",()=>{
  if(fromText.value !=""){
    document.getElementById('message').style.display = 'none';
    fromText.select();
    fromText.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(fromText.value);
    
  }else{
    document.getElementById('message').style.display = 'block';
    
  }
});
// copy text of totext textarea

let copyToText = document.getElementById("btn-0-copy-text-right");
copyToText.addEventListener("click", ()=>{
  if(toText.value !=""){
    document.getElementById('message').style.display = 'none';
    toText.select();
    toText.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(toText.value);
    
  }else{
    document.getElementById('message').style.display = 'block';
    
  }
});
// reset button
var resetTextBtn = document.getElementById('left-btn-2');

resetTextBtn.addEventListener("click",()=>{
  if(fromText.value){
    document.getElementById('message').style.display = 'none';  //taking the element
    fromText.value = ''; //set empty 

// also set to text value empty
    document.getElementById('message').style.display = 'none';  //taking the element
    toText.value = ''; //set empty 
}else{

  document.getElementById('message').style.display = 'block';
}
})

//exchange button working
let exchangeBtn = document.getElementById("exchange");

exchangeBtn.addEventListener("click",() => {
  if(fromText.value != "" && toText.value != ""){
    document.getElementById('message').style.display = 'none'; //if messgae is showing priviously then first hide it
//changing the value of text fields
    let tempText = fromText.value;
    fromText.value = toText.value;
    toText.value = tempText;

//changing the value of select
    let tempSelect = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempSelect;
  }//if both textareas ar empty just exchange the select fiels values
  else if(fromText.value == "" && toText.value == ""){
    //changing the value of select
    let tempSelect = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempSelect;
  }
  else{
    document.getElementById('message').style.display = 'block';
  }
});

//working with speech in left side text area
let speechButton1 = document.getElementById("left-btn-1");

speechButton1.addEventListener("click", () => {
  if (fromText.value != "") {
    document.getElementById('message').style.display = 'none';
    let utterence = new SpeechSynthesisUtterance(fromText.value);
    utterence.lang = selectTag[0].value;
    speechSynthesis.speak(utterence);
  }
  else{
      document.getElementById('message').style.display = 'block';
    }
});

//working with speech in right side text area
let speechButton2 = document.getElementById("btn-1");

speechButton2.addEventListener("click", () => {
  if (toText.value != "") {
    document.getElementById('message').style.display = 'none';
    let utterence1 = new SpeechSynthesisUtterance(toText.value);
    utterence1.lang = selectTag[1].value;
    speechSynthesis.speak(utterence1);
  }
  else{
      document.getElementById('message').style.display = 'block';
    }
});