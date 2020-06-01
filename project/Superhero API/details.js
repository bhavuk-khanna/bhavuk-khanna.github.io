(function(){
    //frequesntly used variables
    let data = location.search;
    var tokenId = '1218793861791825';


    //fetches the id of the superhero from the URL
    function findId(){
        for(var i=data.length-1;i>=0;i--){
            if(data.charAt(i)==='='){
                return data.substring(i+1);    
            }
        }
    }


    //fetches superhero details from API using the ID
    async function serachById(id){  
        try{
            const superhero =  await fetch(`https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/${tokenId}/${id}`);
            const data = await superhero.json();
            if(data.response==="success")
                renderSuperhero(data);            
            else 
                renderResult([{name: "No Results found"}]);
        }
        catch(error){
            console.log(error);
        }
    }

    //displays superhero details on the webpage
    function renderSuperhero(data){
        let nameTag = document.getElementById('name');
        let imgTag = document.getElementsByTagName('img')[0];

        nameTag.innerHTML = data.name;
        imgTag.src= data.image.url;
        constructPowerStats(data.powerstats);
        constructBiography(data.biography);
    }


    //displays PowerStats on the webpage
    function constructPowerStats(stats){
        let tableBody = document.getElementsByTagName('tbody')[0];
        for (let [key, value] of Object.entries(stats)) {
            let rowElement = document.createElement('tr');

            rowElement.innerHTML = `<th scope="row">${key}</th><td>${value}</td>`;
            tableBody.appendChild(rowElement);
        }
    }


    //displays superhero Biography on the webpage
    function constructBiography(bio){
        let tableBody = document.getElementsByTagName('tbody')[1];
        for (let [key, value] of Object.entries(bio)) {
            let rowElement = document.createElement('tr');        
            rowElement.innerHTML = `<th scope="row">${key}</th><td>${value}</td>`;
            tableBody.appendChild(rowElement);
        }
    }
    
    
    //initialize function
    function init(){
        let id = findId();
        serachById(id);
    }


    init();
    
})();

