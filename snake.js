const scoreText = document.getElementById("score")
const cvs = document.getElementById("canvas");
const ctx =cvs.getContext("2d")
var loop;

const snakeW=10;
const snakeH=10;
var score = 0;
var playing = true;

const uiButton = {
    x:175,
    y:300,
    w:150,
    h:50
}

function draw_snake(x,y)
{
    ctx.fillStyle= "white";
    ctx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);

    ctx.fillStyle= "black";
    ctx.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);
}

cvs.addEventListener("click", event => {
    if(!playing){
        if(uiButton.x < event.x < (uiButton.x + uiButton.w) && uiButton.y < event.y < (uiButton.y + uiButton.h)){
            play()
        }
    }
}, false)

//UI
function showUI(){
    playing = false;
    ctx.fillStyle = "#afff03"
    ctx.font = "50px Arial";
    ctx.fillText("Score : " + score, 150, 180);

    ctx.fillStyle = "#38c7ff"
    ctx.fillRect(uiButton.x, uiButton.y, uiButton.w, uiButton.h);

    ctx.fillStyle = "#4603ff"
    ctx.font = "30px Arial";
    ctx.fillText("Play again", 180, 340)
}

//direction control
//Left = 0
//Up = 1
//Right = 2
//Down = 3
var dir;
var snake;
document.addEventListener("keydown",dirControl)
function dirControl(event){
    switch(event.keyCode){
        case 37 : if(dir != 2) dir = 0
        break;
        case 38 : if(dir != 3) dir = 1
        break;
        case 39 : if(dir != 0) dir = 2
        break;
        case 40 : if(dir != 1) dir = 3
    }
}

//create food
var food ={
    x:Math.round(Math.random()*(cvs.width/snakeW)),
    y:Math.round(Math.random()*(cvs.height/snakeH))

}
function createFood(x,y){
    ctx.fillStyle= "red";
    ctx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);

    ctx.fillStyle= "black";
    ctx.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);
}

//update
function draw(){
    ctx.clearRect(0,0,cvs.clientWidth,cvs.height)
    for(var i=0;i<snake.length;i++){
        var X=snake[i].x;
        var Y=snake[i].y;
        draw_snake(X,Y);
    }

    createFood(food.x,food.y);

    //snake head
    var snakeX =snake[0].x;
    var snakeY=snake[0].y;

    //Check collision
    for(var i=1; i<snake.length; i++){
        if(snakeX == snake[i].x && snakeY == snake[i].y){
            //Game over
            clearInterval(loop);
            ctx.clearRect(0, 0, cvs.width, cvs.height);
            showUI()
        }
    }
    if(snakeX < 0 || snakeX >= 50 || snakeY < 0 || snakeY >= 50){
        //Game over
        clearInterval(loop);
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        showUI()
    }

    switch(dir){
        case 0 : snakeX--;
        break;
        case 1 : snakeY--;
        break;
        case 2 : snakeX++;
        break;
        case 3 : snakeY++;
    }

    if(food.x==snakeX &&food.y==snakeY)
    {
        food ={
            x:Math.round(Math.random()*(cvs.width/snakeW)),
            y:Math.round(Math.random()*(cvs.height/snakeH))
        }
        score++;
        scoreText.innerHTML = "Score : " + score
    }
    else{
        snake.pop();    
    }

    snake.unshift({
        x:snakeX,
        y:snakeY
    })
}
//end update

function play(){
    playing = true;
    score = 0
    var len=4;
    snake=[];
    dir = 2;
    for(var i=len-1;i>=0;i--){
        snake.push({
            x:i,
            y:0
        })
    }
    scoreText.innerHTML = "Score : " + score
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    loop = setInterval(draw,100)
}
play()