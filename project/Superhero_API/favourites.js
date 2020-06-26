(function(){
    
    //Frequestly used variables
    var tokenId = '3490091671019965';
    var favourites = JSON.parse(localStorage.getItem("favourites"));
    var listHead = document.getElementsByClassName('list-group')[0];
    const toastContainer = document.getElementById('toast');


    //serachById fetches data from the API corresponding to the id and passes the data to the display function
    async function serachById(id,index){
        try{
            const superhero =  await fetch(`https://superheroapi.com/api.php/${tokenId}/${id}`);
            const data = await superhero.json();

            displayResult(data);
        }
        catch(error){
            console.log(error);
        }
    }


    // Creates a list Item based on data received and adds it to the DOM
    function displayResult(item){

        let listItem = document.createElement('a');
        listItem.classList.add("list-group-item");
        listItem.classList.add("list-group-item-action");
        listItem.href ='#'; 
        listItem.innerHTML = `<div class="list-node-cntnr"><div class="list-node-name">${item.name}</div><button type="button" class="btn btn-outline-primary btn-sm">Del</button></div>`;
        listItem.setAttribute('data-id', item.id);
        listHead.appendChild(listItem);

    }

    //Deletes the id received from favourites array and DOM
    function deleteFav(id){

        let result = favourites.filter(value => value!==id);
        favourites = result;
        localStorage.setItem("favourites", JSON.stringify(favourites));
        let listItem  = document.querySelectorAll(`[data-id='${id}']`)[0];
        listItem.remove();
        showNotification('success','Hero deleted from favourites!');
    }

    //read id from the favourites array in local storage and call serachById function for each id
    function renderFavourites(){
        if(favourites.length>0)
        favourites.forEach(serachById);
        else{
            let listItem = document.createElement('h3');
             listItem.innerHTML = `Uh Oh! <br><small class="text-muted">You do not have any favourites</small>`;
             listHead.appendChild(listItem);
        }

    }







    // click Listner to detect when the delete btn is clicked
    function handleClickLisetner (e) {
         if(e.target.classList[0]==='btn'){
            deleteFav(e.target.parentElement.parentElement.getAttribute('data-id'));
        }
        else if(e.target.classList[0]==='list-group-item'||e.target.classList[0]==='list-node-name'){
            let id = -1;
            if(e.target.classList[0]==='list-group-item')
                id = e.target.getAttribute('data-id');
            else
                id = e.target.parentNode.parentNode.getAttribute('data-id');

             window.document.location = './details.html'+'?id='+id;
        }
    }


    // function to display notifications
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
    
    
    //initialize function
    function init(){
        document.addEventListener('click', handleClickLisetner);
        renderFavourites();
    }
    
    
    init();
    
    
    
})();




