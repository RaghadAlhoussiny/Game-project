/*The Game Project Part 8*/
var gameChar_x;
var gameChar_y;
var floorPos_y;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var isJumping;
var initialJumpY;

var canyons;
var collectables;
var sun;
var trees_x;
var clouds;
var cloudSpeed;
var mountains;
var fallingObject;
var flowers;

var cameraPosX;
var game_score;
var flagpole;
var lives;
var extraLifeReward;

var jumpSound;
var collectItem;
var fallingFromCanyon;
var LevelUpSound;
var RewardSound;
var TouchEnemySound;

var platforms;
var enemies;

// Preloading all the sound files required for the game.
function preload(){
soundFormats('mp3' , 'wav');
jumpSound = loadSound('assets/jump.wav');
jumpSound.setVolume(0.1);
collectItem = loadSound('assets/collectable.mp3');
collectItem.setVolume(0.1);
fallingFromCanyon = loadSound('assets/falling.mp3');
fallingFromCanyon.setVolume(0.1);
LevelUpSound = loadSound('assets/LevelUP.mp3');
LevelUpSound.setVolume(0.1);
RewardSound = loadSound('assets/Reward-Sound.mp3');
RewardSound.setVolume(0.1);
TouchEnemySound = loadSound('assets/Losing.mp3');
TouchEnemySound.setVolume(0.1);
}

// This function sets up the initial state of the game.
function setup() {
  createCanvas(1024, 576);
  floorPos_y = height * 3/4;
  lives = 3;
  startGame(); };

//Initializing all the game variables and objects.
function startGame() {
gameChar_x = width/2;
gameChar_y = floorPos_y;
isLeft = false;
isRight = false;
isFalling = false; 
isPlummeting = false;
isJumping = false;

//initializing objects
sun = { x_pos: 200, y_pos: 100, size: 100, color: color(255, 255, 0) };
// Define arrays for canyons, collectables, trees, clouds, mountains, falling objects, and flowers
canyons = [
        { x_pos: -150, width: 100 },
        { x_pos: 50, width: 100 },
        { x_pos: 300, width: 100 },
        { x_pos: 550, width: 100 },
        { x_pos: 1100, width: 100 },
        { x_pos: 1650, width: 100 }, ];

collectables = [
        { x_pos: 200, y_pos: 410, size: 50, isFound: false },
        { x_pos: 400, y_pos: 410, size: 50, isFound: false },
        { x_pos: 700, y_pos: 410, size: 50, isFound: false },
        { x_pos: 950, y_pos: 410, size: 50, isFound: false },
        { x_pos: 1100, y_pos: 410, size: 50, isFound: false },
        { x_pos: 1350, y_pos: 410, size: 50, isFound: false },
        { x_pos: 1475, y_pos: 410, size: 50, isFound: false }, ];

trees_x = [-200,0,250, 450, 650, 850 , 1050 , 1250 , 1450,1760];
clouds = [
        {x: 0, y: 50, size:60},
        {x: 100, y: 100, size: 50},
        {x: 400, y: 100, size: 60},
        {x: 700, y: 100, size: 70},
        {x: 200, y: 150, size: 45},
        {x: 550, y: 75, size: 65},
        {x: 900, y: 120, size: 55},
        {x: 1050, y: 100, size: 70},
        {x: 1300, y: 75, size: 65},
        {x: 1475, y: 90, size: 55}, ];
    
cloudSpeed= 0.2;

mountains = [
        {x1: -250, y1: floorPos_y, x2: -100, y2: floorPos_y - 300, x3: 100, y3: floorPos_y},
        {x1: 0, y1: floorPos_y, x2: 100, y2: floorPos_y - 100, x3: 200, y3: floorPos_y},
        {x1: 150, y1: floorPos_y, x2: 300, y2: floorPos_y - 200, x3: 500, y3: floorPos_y},
        {x1: 400, y1: floorPos_y, x2: 600, y2: floorPos_y - 300, x3: 800, y3: floorPos_y},
        {x1: 770, y1: floorPos_y, x2: 890, y2: floorPos_y - 100, x3: 1000, y3: floorPos_y},
        {x1: 1000, y1: floorPos_y, x2: 1200, y2: floorPos_y - 200, x3: 1400, y3: floorPos_y},
        {x1: 1300, y1: floorPos_y, x2: 1500, y2: floorPos_y - 150, x3: 1700, y3: floorPos_y}, ];
    
fallingObject = {
  x_pos: random(width), 
  y_pos: 0, 
  size: 40, 
  isTouching: false 
};
    
flowers = [
        { x_pos: 0, y_pos: floorPos_y - 50, size: 50 },
        { x_pos: 250, y_pos: floorPos_y - 50, size: 50 },
        { x_pos: 720, y_pos: floorPos_y - 50, size: 50 },
        { x_pos: 800, y_pos: floorPos_y - 50, size: 50 },
        { x_pos: 1000, y_pos: floorPos_y - 50, size: 50 },
        { x_pos: 1500, y_pos: floorPos_y - 50, size: 50 },
        { x_pos: 1600, y_pos: floorPos_y - 50, size: 50 }, ];
    
//Initiallizing a new item that is a reward for the game character.
extraLifeReward = {
    x_pos: 1420, 
    y_pos: floorPos_y -30, 
    size: 40,
    isFound: false
};
     extraLifeReward.isFound = false; 
    
// Initialize platforms and enemies    
platforms = [] ; 
platforms.push(createPlatforms(150,floorPos_y - 100,100));
platforms.push(createPlatforms(700,floorPos_y - 100,200));
platforms.push(createPlatforms(950,floorPos_y - 100,100));
platforms.push(createPlatforms(1300,floorPos_y - 100,200));
    
enemies = [];
enemies.push(new Enemy(150 , floorPos_y - 10 , 100));
enemies.push(new Enemy(1200 , floorPos_y - 10 , 100));

// Set initial camera position, game score, and flagpole state
cameraPosX = 0;
    
game_score = 0;
    
flagpole = {isReached:false , x_position:1875};
};

// This function handles all the drawing of elements on the canvas.
function draw()
{
	///////////DRAWING CODE//////////
	background(100,155,255); //fill the sky blue
	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground
    
    // Check if game character's x position is greater than 750
    if (gameChar_x > 750) {
    background(0, 0, 50);// Change background color to night sky
    noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground
    // Draw moon
    fill(246, 241, 213);
    ellipse(200, 100, 100);} 

    cameraPosX = gameChar_x - width / 2;// Set the camera position

    // Translate the canvas to adjust for the camera position
    push();
    translate(-cameraPosX, 0);
    
    //Draw sun
    fill(sun.color);
    ellipse(sun.x_pos, sun.y_pos, sun.size);

    drawMountains();// Draw mountains
    drawTrees(); //Draw trees
    drawClouds();  //Draw clouds
       
   // Draw collectables
   for (var i = 0; i < collectables.length; i++) {
   drawCollectable(collectables[i]);
   // Check collectable and break out if found
   if (checkCollectable(collectables[i])) {
        break;}};
    
  // Draw canyons
    for (var i = 0; i < canyons.length; i++) {
        checkCanyon(canyons[i]);}
    
  // Draw flowers 
    for (var i = 0; i < flowers.length; i++) {
        drawFlower(flowers[i]);}
    
   //Draw platforms
    for(var i=0 ; i<platforms.length ; i++){
        platforms[i].draw()
    };
   
  //Draw Enemies
    for(var i=0 ; i < enemies.length ; i++){
      enemies[i].draw()
      var isContactNew = enemies[i].CheckContactEnemies(gameChar_x , gameChar_y)
      if(isContactNew){
         lives -= 1
         TouchEnemySound.play();
         if(lives > 0){
            startGame();
             break;
            } } };
    
    // Draw the extra life reward item
    drawExtraLife(extraLifeReward);
    // Check for interaction with the extra life reward item
    if (checkExtraLife(extraLifeReward)) {
        // If the reward item is found, stop drawing it
        extraLifeReward.size = 0;
    }
    
  //Draw game character
    drawGameCharacter();

  // Display score text
  fill(0); 
  rect(cameraPosX + 10, 10, 100, 40); 
  fill(255); 
  textSize(20);
  text("Score: " + game_score, cameraPosX + 20, 35);
    
	///////////INTERACTION CODE//////////
    //interactions with collectables, canyons, enemies, falling objects, and flagpole
    if(isLeft == true) {
        gameChar_x -=1;};
    
    if(isRight == true) {
        gameChar_x +=1;};
    
    if(isJumping == true){
       gameChar_y -= 20;};
    
    if(isFalling == true){
        gameChar_y +=0
    };
     // Handle jumping
    if (isJumping) {
        // Check if the game character has reached the maximum jump height
        if (gameChar_y <= initialJumpY - 200) {
            isJumping = false; // Reset jumping state
            isFalling = true; // Update falling state
        } else {
            gameChar_y -= 5; 
        } };

    //Platform interaction
    if (gameChar_y < floorPos_y) {
    for(var i=0 ; i< platforms.length ; i++){
        var isContact = false;
        if(platforms[i].checkContact(gameChar_x , gameChar_y)== true){
            isContact = true;
            break;
        } }      
    if(isContact == false){
    gameChar_y += 1; // increment gameChar_y to make the character fall
    isFalling = true;}
       } else {
    isFalling = false; }
    
  drawFallingObject(); //draw the falling object
  renderFlagpole();

  if (!flagpole.isReached) {
    checkFlagpole();
  }

  checkPlayerDie(); //function that checks if the player dies what happens
  drawLives(); //Drawing the shape of the lives
  
  pop();
        
 // Display "Game over" text when lives are less than 1
  if (lives < 1) {
    fill(255);
    textSize(30);
    textAlign(CENTER);
    text("Game over. Press space to continue.", width / 2, height / 2);
    noLoop();
    return; 
  }
  // Display "Level complete" text when flagpole is reached
  if (flagpole.isReached) {
    fill(255);
    textSize(30);
    textAlign(CENTER);
    text("Level complete. Press space to continue.", width / 2, height / 2);
    return; 
  }
}

// This function handles the key presses for movement and jumping.
function keyPressed() {
   // Handle key presses for moving left, right, and jumping
  if (key == "a") {
    isLeft = true;
  } else if (key == "d") {
    isRight = true;
  }
   else if (key == "w" && !isFalling && !isJumping) {
        initialJumpY = gameChar_y;
        isJumping = true;
        isFalling = true;
        jumpSound.play();
    } };

// This function handles the key releases for stopping movement and jumping.
function keyReleased() {
  if (key == "a") {
    console.log("a");
    isLeft = false;
  } else if (key == "d") {
    console.log("d");
    isRight = false;
  } else if (key == "w") {
    console.log("w");
    isJumping = false;
    isFalling = true;
  }  }

// Drawing the game character function based on its state.
function drawGameCharacter() {
    // Drawing the game character based on its state (standing, walking, jumping, falling)
    //the game character
	if(isLeft && isFalling){
    // add your jumping-left code
    fill(232,190,172)
    ellipse(gameChar_x , gameChar_y - 60, 30 , 30)
    
    fill(150 , 75 , 0)
    rect(gameChar_x - 12, gameChar_y - 45 , 24 , 30)
    
    fill(0)
    rect(gameChar_x - 12, gameChar_y - 17 , 5 , 5)
    
    fill(0)
    rect(gameChar_x - 7, gameChar_y - 17 , 5 , 5)
    
    fill(232,190,172)
    rect(gameChar_x -10, gameChar_y - 40, 10 , 20)
    
    fill(232,190,172)
    rect(gameChar_x-5, gameChar_y - 40, 10 , 20)
    
    fill(0)
    ellipse(gameChar_x - 7,gameChar_y - 63,4)
    
    fill(0)
    rect (gameChar_x - 9,gameChar_y - 55,10,2) }

	else if(isRight && isFalling){
    // add your jumping-right code
    fill(232,190,172)
    ellipse(gameChar_x , gameChar_y - 60, 30 , 30)
    
    fill(150 , 75 , 0)
    rect(gameChar_x - 12, gameChar_y - 45 , 24 , 30)
    
    fill(0)
    rect(gameChar_x +2, gameChar_y - 17 , 5 , 5)
    
    fill(0)
    rect(gameChar_x + 7, gameChar_y - 17 , 5 , 5)
    
    fill(232,190,172)
    rect(gameChar_x - 7, gameChar_y - 40, 10 , 20)
    
    fill(232,190,172)
    rect(gameChar_x - 1, gameChar_y - 40, 10 , 20)
        
    fill(0)
    ellipse(gameChar_x + 7,gameChar_y - 63,4)
    
    fill(0)
    rect (gameChar_x,gameChar_y - 55,10,2)}
    
	else if(isLeft){
    // add your walking left code
    fill(232,190,172)
    ellipse(gameChar_x , gameChar_y - 45, 30 , 30)
    
    fill(150 , 75 , 0)
    rect(gameChar_x - 12, gameChar_y-30, 24 , 30)
    
    fill(0)
    rect(gameChar_x - 12, gameChar_y - 1, 5 , 5)
    
    fill(0)
    rect(gameChar_x -8, gameChar_y -1, 5 , 5)

    fill(232,190,172)
    rect(gameChar_x -10, gameChar_y - 25, 10 , 20)
    
    fill(232,190,172)
    rect(gameChar_x-5, gameChar_y - 25, 10 , 20)
    
    fill(0)
    ellipse(gameChar_x - 7,gameChar_y - 47,4)
    
    fill(0)
    rect (gameChar_x - 10,gameChar_y - 40,10,2) }
    
	else if(isRight){
    // add your walking right code
    fill(232,190,172)
    ellipse(gameChar_x , gameChar_y - 45, 30 , 30)
    
    fill(150 , 75 , 0)
    rect(gameChar_x - 12, gameChar_y-30, 24 , 30)
    
    fill(0)
    rect(gameChar_x +4, gameChar_y - 1, 5 , 5)
    
    fill(0)
    rect(gameChar_x + 7, gameChar_y -1, 5 , 5)

    fill(232,190,172)
    rect(gameChar_x - 7, gameChar_y - 25, 10 , 20)
    
    fill(232,190,172)
    rect(gameChar_x - 1, gameChar_y - 25, 10 , 20)
    
    fill(0)
    ellipse(gameChar_x + 7,gameChar_y - 47,4)
    
    fill(0)
    rect (gameChar_x,gameChar_y - 40,10,2)}
    
	else if(isFalling || isPlummeting){
    // add your jumping facing forwards code
    fill(232,190,172)
    ellipse(gameChar_x , gameChar_y - 60, 30 , 30)
    
    fill(150 , 75 , 0)
    rect(gameChar_x - 12, gameChar_y - 45 , 24 , 30)
    
    fill(0)
    rect(gameChar_x - 12, gameChar_y - 17 , 5 , 5)
    
    fill(0)
    rect(gameChar_x + 7, gameChar_y - 17 , 5 , 5)
    
    fill(232,190,172)
    rect(gameChar_x -17, gameChar_y - 40, 10 , 20)
    
    fill(232,190,172)
    rect(gameChar_x + 9, gameChar_y - 40, 10 , 20)
    
    fill(0)
    ellipse(gameChar_x - 5,gameChar_y - 60,4)
    
    fill(0)
    ellipse(gameChar_x + 5,gameChar_y - 60,4)
    
    fill(0)
    rect (gameChar_x - 7,gameChar_y - 53,15,2)}
    
	else{
    // add your standing front facing code
    fill(232,190,172)
    ellipse(gameChar_x , gameChar_y - 45, 30 , 30)
    
    fill(150 , 75 , 0)
    rect(gameChar_x - 12, gameChar_y-30, 24 , 30)
    
    fill(0)
    rect(gameChar_x - 12, gameChar_y - 1, 5 , 5)
    
    fill(0)
    rect(gameChar_x + 7, gameChar_y -1, 5 , 5)

    fill(232,190,172)
    rect(gameChar_x -17, gameChar_y - 25, 10 , 20)
    
    fill(232,190,172)
    rect(gameChar_x + 9, gameChar_y - 25, 10 , 20)
    
    fill(0)
    ellipse(gameChar_x - 5,gameChar_y - 47,4)
    
    fill(0)
    ellipse(gameChar_x + 5,gameChar_y - 47,4)
    
    fill(0)
    rect (gameChar_x - 7,gameChar_y - 40,15,2)};
}

// This function draws clouds on the canvas.
function drawClouds(){
    for (var i = 0; i < clouds.length; i++) {
    //Drawing the clouds using white color and using ellipses
    fill(255);
    ellipse(clouds[i].x, clouds[i].y, clouds[i].size, clouds[i].size);
    ellipse(clouds[i].x - 30, clouds[i].y, clouds[i].size -20);
    ellipse(clouds[i].x +30, clouds[i].y, clouds[i].size -20);
    //Animations to the clouds 
    clouds[i].x += cloudSpeed;
    if (clouds[i].x > width) {
    clouds[i].x = -100; // Reset clouds' position when they move out of the screen
    }} };

// This function draws trees on the canvas.
function drawTrees(){
  for (var i = 0; i < trees_x.length; i++) {
    //Draw the tree trunk using rectangle
    fill(139, 69, 19); 
    rect(trees_x[i], floorPos_y - 150, 30, 150);
    //Draw the tree crown using triangles
    fill(34, 139, 34);
    triangle(trees_x[i] - 50,floorPos_y - 150,trees_x[i] + 15,floorPos_y - 250,trees_x[i] + 80,floorPos_y - 150);
    triangle(trees_x[i] - 70,floorPos_y - 190,trees_x[i] + 15,floorPos_y - 290,trees_x[i] + 100,floorPos_y - 190);}  
}

// This function draws mountains on the canvas.
function drawMountains(){
   for (var i = 0; i < mountains.length; i++) {
    //Draw the mountains using triangles
   fill(128, 128, 128);
   triangle(mountains[i].x1, mountains[i].y1, mountains[i].x2, mountains[i].y2, mountains[i].x3, mountains[i].y3);} 
}

// This function draws collectable items on the canvas.
function drawCollectable(t_collectable) {
    if (t_collectable.isFound == false) {
        // Draw star
        fill(255, 255, 0);
        beginShape();
        vertex(t_collectable.x_pos, t_collectable.y_pos - 20);
        vertex(t_collectable.x_pos + 5, t_collectable.y_pos);
        vertex(t_collectable.x_pos + 20, t_collectable.y_pos);
        vertex(t_collectable.x_pos + 8, t_collectable.y_pos + 12);
        vertex(t_collectable.x_pos + 14, t_collectable.y_pos + 30);
        vertex(t_collectable.x_pos, t_collectable.y_pos + 18);
        vertex(t_collectable.x_pos - 14, t_collectable.y_pos + 30);
        vertex(t_collectable.x_pos - 8, t_collectable.y_pos + 12);
        vertex(t_collectable.x_pos - 20, t_collectable.y_pos);
        vertex(t_collectable.x_pos - 5, t_collectable.y_pos);
        endShape(CLOSE); }
}

// This function draws Canyons on the canvas.
function drawCanyon(t_canyon){
    if (gameChar_x >= t_canyon.x_pos && gameChar_x < t_canyon.x_pos + t_canyon.width  && gameChar_y >= floorPos_y) {
        isPlummeting = true;}
    
    if (isPlummeting) {
        gameChar_y += 5;}
     
    fill(173,216,230)
    rect(t_canyon.x_pos,432,t_canyon.width,144)
    fill(0,0,139)
    rect(t_canyon.x_pos,432,t_canyon.width - 80,144)
    fill(0,0,139)
    rect(t_canyon.x_pos + 85,432,t_canyon.width- 80,144)
}

// This function checks for interactions with collectables and updates the game score.
function checkCollectable(t_collectable) {
    // Check for collision with collectable and update score if found
    if (!t_collectable.isFound && dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < 50) {
        t_collectable.isFound = true;
        game_score += 1;
        collectItem.play();
        return true;
    }
    return false;// Return false if no collectable is found
};

// This function checks for interactions with canyons and handles character falling.
function checkCanyon(t_canyon) {
    // Check for collision with canyon and handle character falling
    if (gameChar_x >= t_canyon.x_pos && gameChar_x < t_canyon.x_pos + t_canyon.width && gameChar_y >= floorPos_y) {
        isPlummeting = true;
       fallingFromCanyon.play();
    }
    if (isPlummeting) {
        gameChar_y += 5;
    }
    fill(173, 216, 230);
    rect(t_canyon.x_pos, 432, t_canyon.width, 144);
    fill(0, 0, 139);
    rect(t_canyon.x_pos, 432, t_canyon.width - 80, 144);
    fill(0, 0, 139);
    rect(t_canyon.x_pos + 85, 432, t_canyon.width - 80, 144);
};

// This function draws the falling object on the canvas.
function drawFallingObject(){
    fallingObject.y_pos += 1; // Increase the y position to make it fall 
    if (
    gameChar_x > fallingObject.x_pos - fallingObject.size / 2 &&
    gameChar_x < fallingObject.x_pos + fallingObject.size / 2 &&
    gameChar_y > fallingObject.y_pos - fallingObject.size / 2 &&
    gameChar_y < fallingObject.y_pos + fallingObject.size / 2
   )   {
  fallingObject.isTouching = true; // Set the flag to true if it touches the game character
   }   
  // Check if the falling object is touching the ground
  if (fallingObject.y_pos >= floorPos_y - fallingObject.size / 2) {
    fallingObject.y_pos = floorPos_y - fallingObject.size / 2; // Set the position to the ground level
    fallingObject.isTouching = true; // Set the flag to true
  }

 if (!fallingObject.isTouching) {
  // Draw the parachute
    fill(150, 75, 0);
    // Draw the parachute base
    rect(fallingObject.x_pos - 20, fallingObject.y_pos - 20, 40, 20);
    // Draw the parachute strings
    stroke(0);
    line(fallingObject.x_pos - 5, fallingObject.y_pos - 20, fallingObject.x_pos, fallingObject.y_pos - 50);
    line(fallingObject.x_pos + 5, fallingObject.y_pos - 20, fallingObject.x_pos, fallingObject.y_pos - 50);
    // Draw the parachute canopy
    fill(255, 0, 0);
    ellipse(fallingObject.x_pos, fallingObject.y_pos - 60, 40, 40);
  } else {
    // Make the falling object disappear
    fallingObject.size = 0;}   
}

// This function draws flowers on the canvas.
function drawFlower(t_flower) {
    // Draw flowers using ellipse() and rect() functions
    // Draw flower stem
    fill(34, 139, 34);
    rect(t_flower.x_pos - 5, t_flower.y_pos, 10, 50);
    // Draw flower petals
    fill(170, 51, 106);
    for (let i = 0; i < 5; i++) {
        let angle1 = TWO_PI * i / 5;
        let angle2 = TWO_PI * (i + 0.5) / 5;
        let petalSize = t_flower.size / 2;
        let x1 = t_flower.x_pos + cos(angle1) * petalSize;
        let y1 = t_flower.y_pos + sin(angle1) * petalSize;
        let x2 = t_flower.x_pos + cos(angle2) * petalSize;
        let y2 = t_flower.y_pos + sin(angle2) * petalSize;
        triangle(t_flower.x_pos, t_flower.y_pos, x1, y1, x2, y2);
    }
    // Draw flower center
    fill(255, 200, 0);
    ellipse(t_flower.x_pos, t_flower.y_pos, 15, 15);    
};

// This function renders the flagpole on the canvas.
function renderFlagpole(){
    // Draw the flagpole and flag based on its state (reached or not)
    push();
    strokeWeight(3);
    stroke(0);
    line(flagpole.x_position ,floorPos_y ,flagpole.x_position ,floorPos_y - 200 )
    fill(255,255,0);
    if(flagpole.isReached){
    rect(flagpole.x_position ,floorPos_y - 200 , 50 , 50) }
    else{
    rect(flagpole.x_position ,floorPos_y - 50 , 50 , 50) }
    pop();
};

// This function checks if the flagpole is reached and updates the game state.
function checkFlagpole(){
    // Check if the flagpole is reached and update game state if true
    var distance = abs(gameChar_x - flagpole.x_position);
    if(distance < 15 ){
       flagpole.isReached = true;
       LevelUpSound.play(); //Play the sound 
    } };

// This function checks if the player has died and updates the game state.
function checkPlayerDie() {
  // Check if the player has fallen off the screen and update game state if true
  if (gameChar_y > height) {
    lives -= 1;
    if (lives > 0) {
      startGame(); 
    } } };

// This function draws the remaining lives of the player.
function drawLives() {
// Draw ellipses to represent remaining lives
  for (var i = 0; i < lives; i++) {
     fill(255, 0, 0);
    ellipse(cameraPosX + 20 + i * 40, 70, 20,20 ) }
};

function checkExtraLife(t_reward) {
    // Check for collision with the reward item and add a life if found
    if (!t_reward.isFound && dist(gameChar_x, gameChar_y, t_reward.x_pos, t_reward.y_pos) < 50) {
        t_reward.isFound = true;
        lives += 1;
        RewardSound.play(); // Play the reward sound
        return true;
    }
    return false; // Return false if no reward item is found
};

// This function draws the extra life reward item on the canvas.
function drawExtraLife(t_reward) {
      if (!t_reward.isFound) {
        // Draw the reward item a heart shape
        fill(255, 0, 0); 
        let x = t_reward.x_pos;
        let y = t_reward.y_pos;
        let size = t_reward.size;
        let halfSize = size / 2;
        beginShape();
        vertex(x, y + halfSize / 2);
        bezierVertex(x + halfSize, y - halfSize / 2, x + halfSize * 2, y + halfSize / 3, x, y + size);
        bezierVertex(x - halfSize * 2, y + halfSize / 3, x - halfSize, y - halfSize / 2, x, y + halfSize / 2);
        endShape(CLOSE);
    } };

// This function creates platforms with collision detection.
function createPlatforms(x , y , length){
    // Create platform object with x, y, length properties and collision detection method
    var p = {
        x: x,
        y: y,
        length: length,
        draw: function(){
          fill(20, 92, 200) ;
          rect(this.x , this.y , this.length , 20);
        } ,
    checkContact: function(gameCharacterXCoor, gameCharacterYCoor) {
    var characterFeetY = gameCharacterYCoor - 12; 
    if (gameCharacterXCoor > this.x && gameCharacterXCoor < this.x + this.length &&
        characterFeetY >= this.y && characterFeetY <= this.y + 5) { 
        return true;
    }
    return false;
}
    }
    return p;
}

// This function for drawing the enemy and its interaction with the game character.
function Enemy(x,y,range){
    this.x = x;
    this.y = y;
    this.range = range ;
    this.currentX = x;
    this.inc = 1;
    this.update = function(){
        this.currentX += this.inc
        if(this.currentX >= this.x + this.range){
           this.inc = -1 ; 
           } else if(this.currentX < this.x){
               this.inc = 1;
           }
    }
    this.draw = function(){
         this.update();
    var enemyY = floorPos_y - 30; 
    //Draw the enemy
    // Body
    fill(100);
    rect(this.currentX, enemyY, 30, 30);
    
    // Head
    fill(200);
    ellipse(this.currentX + 15, enemyY - 10, 20, 20);
    
    // Eyes
    fill(255);
    ellipse(this.currentX + 10, enemyY - 15, 5, 5);
    ellipse(this.currentX + 20, enemyY - 15, 5, 5);
    
    // Arms
    fill(100);
    rect(this.currentX - 5, enemyY + 10, 5, 15);
    rect(this.currentX + 30, enemyY + 10, 5, 15);
    
    // Legs
    fill(150);
    rect(this.currentX + 5, enemyY + 25, 5, 10);
    rect(this.currentX + 20, enemyY + 25, 5, 10);
    
    // Propellers
    fill(100);
    ellipse(this.currentX + 5, enemyY + 20, 10, 2);
    ellipse(this.currentX + 25, enemyY + 20, 10, 2);
    }
    //Checking the contact of the enemy with the game character
    this.CheckContactEnemies = function(Game_character_x , Game_character_y ){
        var distanceFromEnemy = dist(Game_character_x , Game_character_y , this.currentX , this.y)
        if(distanceFromEnemy < 20 ){
           return true
           }
        return false
    } };