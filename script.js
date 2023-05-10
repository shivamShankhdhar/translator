const fromText = document.getElementById("textarea-0");
const toText = document.getElementById("textarea-1");
changingCssProperties = document.getElementById('translate-btn');

const selectTag = document.querySelectorAll("select");
translateBtn = document.getElementById('translate');

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
  let text = fromText.value;
  let translateFrom = selectTag[0].value;
  let translateTo = selectTag[1].value;
  translateBtn.innerText = "Translating...";
  changingCssProperties.style.background="#4A148C";
  changingCssProperties.style.color="white";
  // console.log(text,translateFrom,translateTo);
  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  fetch(apiUrl).then(res=>res.json()).then(data=>{
    // console.log(data);
    toText.value = data.responseData.translatedText;
    translateBtn.innerText = "Translate";
    changingCssProperties.style.background="#7B1FA2";
    changingCssProperties.style.color="#ffffff";
  });


});