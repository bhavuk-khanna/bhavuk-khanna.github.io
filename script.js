var smoothScroll = function(event){
    //console.log('function got called');
    var sectionID = event.target.id;
   // console.log(sectionID.substr(4));
    var section =document.getElementById(sectionID.substr(4));
    //console.log(section);
    if(section !== null){
        var intervalID = setInterval(function(){
        scrollBy(0,10);
        
        if((section.getBoundingClientRect().top<=0) ||((window.innerHeight + window.scrollY) >= document.body.offsetHeight)){
            clearInterval(intervalID);
        }
    },5);
    }
  };



//1. setup event listner
document.querySelector('#body-header').addEventListener('click',smoothScroll);

/*-------------------------------------------------------------------------------*/



//1. Handle scroll event on window

//2. CHeck that skills sections container is visible or not
//3. ensure that the initial width of the colored skills div is zero -> initialised/rest to 0 width value
//4. start animation on every skill -> increase skill width from 0  to the skill level at regular intervals
//5. Store skill level -> HTML with the help of data attribute
var intializeSkill = function(skill){
    skill.style.width = 0;
}
var updateSkill = function(skillId){
    var intervalID = setInterval(function(){
            var skillElement = document.querySelector(skillId);
            var targetPercent = parseInt(skillElement.getAttribute("data-target"));
            var targetWidth = (document.querySelector('.skill-progress-cntnr').getBoundingClientRect().width * targetPercent)/100;
            
          //increse skill width by 10% 
            var currWidth = skillElement.offsetWidth;
             if(currWidth>=targetWidth){
                 clearInterval(intervalID);
             }else{
                 
                 skillElement.style.width = currWidth+1+"px";
             }
        
          //clear interval once the target value is reached
            
      },10);
} 

var setanimationFiredToFalse = function(){
    for(let i= 0 ;i<skillArr.length;i++){
    animationFired[i]=false;
}
}
var findVisibleSkills = function (skill){
    var skillNumber =parseInt(skill.id.substring(6))-1;
    if(skill.getBoundingClientRect().top<window.innerHeight && animationFired[skillNumber]===false ){ 
        animationFired[skillNumber]=true;
        intializeSkill(skill);
        updateSkill('#'+skill.id);
        console.log();
        //animationFired[parent(skill.id.substring(6))-1] =true;
    }
   else if(document.querySelector('#skills').getBoundingClientRect().top >window.innerHeight){
      setanimationFiredToFalse();
  }
}


var skillList = document.querySelectorAll('.skill-progress'); 
var skillArr = Array.prototype.slice.call(skillList);
var animationFired = new Array(skillArr.length);
setanimationFiredToFalse();


var skillAnimation = function(event){
    
    skillArr.forEach(function(current, index, array) {
               findVisibleSkills(current);
            });
    
    
};
window.addEventListener('scroll', skillAnimation);



/*---------------------Percent Scroll------------------------------*/

function updateScrollPercent(){
    var body = document.body, html = document.documentElement;
    var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
    height = height - window.innerHeight;
    var pixelScrolled = window.scrollY;
    var percent = Math.ceil( (pixelScrolled/ height) *100);
    console.log((pixelScrolled/ height) *100);

    document.querySelector('#percent-value').textContent = percent;

}



window.addEventListener('scroll', updateScrollPercent);












