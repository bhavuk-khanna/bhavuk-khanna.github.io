var HighestScore = 0;
var dataController = (function(){
    
    
})();



var UIController = (function(){
    
    var DOMstrings = {
        rod1 : '#rod-1',
        rod2 : '#rod-2',
        ball : '.ball'
    }
    var rod1 = document.querySelector(DOMstrings.rod1);
    var rod2 = document.querySelector(DOMstrings.rod2);
    var ball = document.querySelector(DOMstrings.ball);
    return{
        getDomStrings: function(){
            return DOMstrings;
        },

       /* moveRods: function(){
            
        }*/
        
        centerRods:  function(){    
          //1. Find the length of the rods
            var rodLength = 150;
            console.log(rodLength);
          //2. find the current width of the screen.
            var screenWidth = window.innerWidth;
            console.log(screenWidth);
          //To center set :  left  = (width of the screen/2) - (width of the rods/2);
             rod1.style.left = ((screenWidth/2) - (rodLength/2)) +'px';
             rod2.style.left = ((screenWidth/2) - (rodLength/2)) +'px';
            
            //1. Position ball on top of the rod 2
              ball.style.left = ((screenWidth/2) - (15/2)) +'px';  
              ball.style.top= (window.innerHeight -35) +'px';
            
            }   
        
        
    }
    
    
})();





var MainController = (function(UICntrl,DataCntrl){
    var isGameRunning = true;
    var isBallMoving = false;
    var currScore =0;
    
    var DOM = UICntrl.getDomStrings();
    
    var setupEventListners = function(){
        console.log('Application has started');
        document.addEventListener('keydown',findKeyPressed);
    
    };
    


var shootBall = function(){
    var ball = document.querySelector(DOM.ball);
    var rod1 = document.querySelector(DOM.rod1);
    var rod2 = document.querySelector(DOM.rod2);
    var currX = ball.getBoundingClientRect().left;
    var currY = ball.getBoundingClientRect().top;
    console.log(currY);
    var horizontalChange = 0.7;
    var verticalChange = -0.7;
    var speedMultiplier = 0.7;
    
    var intervalID = setInterval(function(){
        console.log(currX);
        var newLeft = currX+ horizontalChange;
        console.log(newLeft);
        ball.style.left = (newLeft) +'px';
        currX = newLeft;
        var newTop = currY+ verticalChange;    
        ball.style.top = (newTop) +'px';
        currY = newTop;
        console.log(newTop);
        
        if(ball.getBoundingClientRect().left >=window.innerWidth-17){
           horizontalChange = -1 *(Math.random()+1) * speedMultiplier;
           }
        if(ball.getBoundingClientRect().left<=0){
            horizontalChange = 1 *(Math.random()+1) * speedMultiplier;
        }
        
        
        /*if(ball.getBoundingClientRect().top<=0){
            verticalChange =  1 *(Math.random()+1);
        }*/
        
        if(ball.getBoundingClientRect().top<=0){
            isBallMoving =false;
            alert('The game is over. Your Score is : '+ currScore);
            clearInterval(intervalID);
            isGameRunning =false;
            if(currScore>HighestScore){
                HighestScore= currScore;
            }
            currScore =0;
        }
        if(ball.getBoundingClientRect().bottom>=window.innerHeight){
            isBallMoving =false;
            alert('The game is over. Your Score is : '+ currScore);
            clearInterval(intervalID);
            isGameRunning = false;
             if(currScore>HighestScore){
                HighestScore= currScore;
            }
            currScore =0;
        }
        
        // if the ball hits the rod-1 i.e.  the upper rod
        // change the vertical change to a postive value
        // ball.top <= rod1.bottom && ball.left>= rod1.left && ball.right<=rod1.right 
            if(currY<=(rod1.getBoundingClientRect().top+20) && currX>=rod1.getBoundingClientRect().left && currX+15 <=rod1.getBoundingClientRect().right){
                verticalChange =  1 *(Math.random()+1) * speedMultiplier;
                currScore++
            }
        
        
        // if the ball hits the rod-2 i.e. the bottom rod
        // change the vertical change to a postive value
        //ball.top+15 <= rod2.top && ball.left>= rod2.left && ball.right<=rod2.right 
        if(currY +15 >=(rod2.getBoundingClientRect().top) && currX>=rod2.getBoundingClientRect().left && currX+15 <=rod2.getBoundingClientRect().right){
                verticalChange =  -1 *(Math.random()+1) * speedMultiplier;
                currScore++;
            }
        
    },1)
    
    
    
};

    
    
var findKeyPressed =   function(){
  if(event.key === ' ' ){
      if(isGameRunning === false){
          setupEventListners();
            UICntrl.centerRods();
          isGameRunning = true;
      }
      else if(isBallMoving === false){
        isBallMoving =true;
        shootBall();  
      }
        
    }

    if(event.key ==='a' || event.key ==='d'){
        moveRods(event);
    }
    
} ;


    
    var moveRods = function(event){
        
        
        
        var rod1 = document.querySelector(DOM.rod1);
        var rod2 = document.querySelector(DOM.rod2);
        var ball = document.querySelector(DOM.ball);
        var maxRight = window.innerWidth - 153;
        var currentRodPosStr = rod1.style.left;
        var currentRodPos =parseInt( currentRodPosStr.substring(0,currentRodPosStr.length-2));
        var currentBallPosStr = ball.style.left;
        var currentballPos =parseInt( currentBallPosStr.substring(0,currentBallPosStr.length-2));
        if(event.key === 'a' && currentRodPos>=5){
            console.log('We are in the correct if statement');
            rod1.style.left = (currentRodPos -30) +'px';
            rod2.style.left = (currentRodPos -30) +'px';  
            if(isBallMoving === false){
                ball.style.left = (currentballPos -30) +'px';
            }
        }else if(event.key === 'd' && currentRodPos<maxRight){
            rod1.style.left = (currentRodPos +30) +'px';
            rod2.style.left = (currentRodPos +30) +'px';
            if(isBallMoving === false){
                ball.style.left = (currentballPos +30) +'px';
            }
        }
        
    };
    
    
    
    return{
        
        init : function(){
            setupEventListners();
            UICntrl.centerRods();
        }
        
        
    }
    
    
    
    
})(UIController,dataController);





MainController.init();






