


(function(){
    
    
        //frequently used variables
    //var tokenId = '3490091671019965';
    var tokenId = '1218793861791825';
    var listHead = document.getElementsByClassName('list-group')[0];
    var searchBox = document.getElementById('search-box');
    const toastContainer = document.getElementById('toast');
    var favourites = [];
    


    //asnyc function that searches for a list of superheros from the provided name
    async function searchByName(name){  
        try{
            const superhero =  await fetch(`https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/${tokenId}/search/${name}`);
            const data = await superhero.json();
            if(data.response==="success")
            renderResult(data.results);
            else 
                renderResult([]);
        }
        catch(error){
            console.log(error);
        }
    }


    // passes the search results to display function one at a time
    function renderResult(results){
        listHead.innerHTML="";
        if(results.length>0)
            results.forEach(displayResult);
        else{
             let listItem = document.createElement('p');
             listItem.innerHTML = 'No Result Found';
             listHead.appendChild(listItem);
        }
    }


    //display a single superhero listItem on webpage
    function displayResult(item,index){
        let listItem = document.createElement('a');
        listItem.classList.add("list-group-item");
        listItem.classList.add("list-group-item-action");
        listItem.href ='#'; 
        listItem.innerHTML = `<div class="list-node-cntnr"><div class="list-node-name">${item.name}</div><button type="button" class="btn btn-outline-primary btn-sm">Fav</button></div>`;
        listItem.setAttribute('data-id', item.id);
        listHead.appendChild(listItem);

    }


    //adds a superhero to favourties
    function addToFavourites(id){
        if(favourites.indexOf(id) === -1 ){
            favourites.push(id);
            showNotification("success", "Added to Favourites!");
             localStorage.setItem("favourites", JSON.stringify(favourites));
        }
        else{
            showNotification("error", "This Hero is already exists in Favourites!");
        }


    }



    //displays a notification
    function showNotification (type, message) {
        if (type === 'error') {
          toastContainer.classList.remove('toast-success');
          toastContainer.classList.add('toast-error');
        } else if (type === 'success') {
          toastContainer.classList.remove('toast-error');
          toastContainer.classList.add('toast-success');
        }
        toastContainer.style.display = 'block';
        toastContainer.innerText = message;

        setTimeout(() => {
          toastContainer.style.display = 'none';
        }, 2000)
      }




    //click event handler
    function handleClickLisetner(e) {

        if (e.target.id === 'search-btn') {
          let name = document.getElementById('search-box').value;
           searchByName(name);
          return;
        } 
        else if(e.target.classList[0]==='list-group-item'||e.target.classList[0]==='list-node-name'){
            let id = -1;
            if(e.target.classList[0]==='list-group-item')
                id = e.target.getAttribute('data-id');
            else
                id = e.target.parentNode.parentNode.getAttribute('data-id');

             window.document.location = './details.html'+'?id='+id;
        }
        else if(e.target.classList[0]==='btn'){
            addToFavourites(e.target.parentElement.parentElement.getAttribute('data-id'));
        }
    }

    //type event handler 
    function handleInputKeypress (e) {
        if(e.target.id === "search-box"){
            let name = document.getElementById('search-box').value;
           searchByName(name);
          return;
        }
    }
    
    
    //initialize event handlers
    function init(){
        document.addEventListener('click', handleClickLisetner);
        searchBox.addEventListener('keyup', handleInputKeypress);
        if(JSON.parse(localStorage.getItem("favourites"))){
            favourites = JSON.parse(localStorage.getItem("favourites"));
            
        }
            
    }
    
    init();

})();


