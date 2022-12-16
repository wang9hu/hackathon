let index = 0;
console.log('hh');

function populateStorage () {
  chrome.storage.local.get(null, (result) => {
    console.log(result);
    index = Math.max(...Object.keys(result)) + 1;
    for (let key in result) {
      const tabsOl = document.querySelector('.tabs');
      const newLi = document.createElement('li');
      const removeLi = document.createElement('div');
      const copyLi = document.createElement('div');

      removeLi.innerText = '[x]';
      copyLi.innerText = '[copy]';
      tabsOl.appendChild(newLi);
      newLi.setAttribute('id', key);
      const newParag = document.createElement('p');
      newParag.innerText = result[key];
      newLi.append(removeLi, copyLi, newParag);

      removeLi.addEventListener('click', () => {removeList(newLi)});
      copyLi.addEventListener('click', () => {copy(newLi)});
    }
  });
}

function removeList(ele) {
  //document.getElementById("text").value = "";
  const id = ele.getAttribute('id');
  chrome.storage.local.remove(id, () => {});
  // ele.innerHTML = '';
  ele.remove();
}

// function copyLi(ele) {
//   const 
// }

populateStorage();

const textarea = document.querySelector('#text')
textarea.focus();
document.execCommand('paste', false, null);

const buttonPaste = document.querySelector(".paste");
buttonPaste.addEventListener('click', addNewItem);

const buttonExport = document.querySelector(".export");
buttonExport.addEventListener('click', () => {window.open('export.html')});

const buttonClear = document.querySelector('.clear');
buttonClear.addEventListener('click', () => {clearStorage()});


function addNewItem() {
      // Get the text field
  const copyText = document.getElementById("text");
  if (copyText.value === '') return;
  const tabsOl = document.querySelector('.tabs');
  const newLi = document.createElement('li');

  const removeLi = document.createElement('div');
  removeLi.innerText = '[x]';
  removeLi.addEventListener('click', () => {removeList(newLi)});

  newLi.setAttribute('id', index);
  tabsOl.appendChild(newLi);
  const newParag = document.createElement('p');
  newParag.innerText = copyText.value;

  newLi.appendChild(removeLi);
  newLi.appendChild(newParag);

  saveToStorage(index, copyText.value);
  
  copyText.value = '';

  return
}

function saveToStorage (key, value) {
  const obj = {};
  obj[key] = value;
  chrome.storage.local.set(obj, () => {console.log(obj)})

  chrome.storage.local.get(null, (result) => {
    console.log(result);
  });
  index += 1;
}

function clearStorage () {
  chrome.storage.local.clear(() => {})
  index = 0;
  const tabsOl = document.querySelector('.tabs');
  tabsOl.innerHTML = '';
}




// click on the url, if original tab removeLid, open a new one, if not, return to that tab

//if possible, removeLi inactive tabs after a certain amount of time 
function removeTabs() {
    chrome.tabs.query({active:false}, (tabs) => { 
      tabs.forEach((tab) => {
      chrome.tabs.remove(tab.id);
    })
  }); 
}
const declutterButton = document.querySelector('.declutterTabs');
declutterButton.addEventListener('click', () => {removeTabs()});


// navigator.permissions.query({name: "clipboard-write"}).then((result) => {
//     if (result.state === "granted" || result.state === "prompt") {
//       /* write to the clipboard now */
//     }
//   });
