//Just to ensure we force js into strict mode in HTML scrips - we don't want any sloppy code
'use strict';  

import musicService from'./music-group-service.js';

(async () => {

  

  //Initialize the service
  const _service = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);
  const data = await _service.readInfoAsync();
  const amountpages = Math.ceil(data.nrSeededMusicGroups/10)

  const _pagebutton = document.getElementById("page-buttons");
  const artistList = document.querySelector('#musicgroups');
  let _data = await _service.readMusicGroupsAsync(0);
  console.log(_data);

  fillList(1);

  async function fillList(pagenumber){
    while (artistList.firstChild) {
      artistList.removeChild(artistList.firstChild);
    }      

    while (_pagebutton.firstChild) {
      _pagebutton.removeChild(_pagebutton.firstChild);
    }

    _data = await _service.readMusicGroupsAsync(pagenumber - 1);
    for (const item of _data.pageItems) {

      const li = document.createElement("li");
      li.innerHTML = `${item.name}`;
      artistList.appendChild(li);
    }
    
    
  
    for (let index = 0; index < amountpages; index++) {
        const btn = document.createElement('li');
        btn.classList.add('page-link', 'page-item');
        btn.innerText = `${index + 1}`;
        btn.addEventListener("click", clickPageNumbers);
        _pagebutton.appendChild(btn);
    }
  }

  let currentpage = 0;


  const pageNumbers = document.getElementById('page-buttons');
  const btnNext = document.getElementById("btnNext");
  const btnPrev = document.getElementById("btnPrev");

  btnNext.addEventListener("click", clickNext);
  btnPrev.addEventListener("click", clickPrev);



  function clickNext(event) {
    if (currentpage == amountpages) {
      return;
    }
    currentpage++;
    fillList(currentpage);
    console.log(currentpage);

  }

  function clickPrev(event) {
    if (currentpage == 1) {
      return;
    }
    currentpage--;
    fillList(currentpage);
    console.log(currentpage);
  }

  function clickPageNumbers(event) {
    currentpage = event.target.innerText;
    fillList(event.target.innerText);
  }

})();




