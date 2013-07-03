var CANVAS_WIDTH = 1000, CANVAS_HEIGHT = 900, SCALE = 30;

        /*var    b2Vec2 = Box2D.Common.Math.b2Vec2
        ,      b2BodyDef = Box2D.Dynamics.b2BodyDef
        ,      b2Body = Box2D.Dynamics.b2Body
        ,      b2FixtureDef = Box2D.Dynamics.b2FixtureDef
        ,      b2World = Box2D.Dynamics.b2World
        ,      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
        ,      b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
        ,      b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef
        ,      b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef
        ,      b2RopeJointDef = Box2D.Dynamics.Joints.b2RopeJointDef
        ,      b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef
        ,      b2DebugDraw = Box2D.Dynamics.b2DebugDraw
        ,      b2Fixture = Box2D.Dynamics.b2Fixture
        ,      b2AABB = Box2D.Collision.b2AABB
        ,      b2Color = Box2D.Common.b2Color;*/
		
	var B2Vec2 = Box2D.Common.Math.b2Vec2
		,	B2BodyDef = Box2D.Dynamics.b2BodyDef
		,	B2Body = Box2D.Dynamics.b2Body
		,	B2FixtureDef = Box2D.Dynamics.b2FixtureDef
		,	B2World = Box2D.Dynamics.b2World
		,	B2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
		,   B2CircleShape = Box2D.Collision.Shapes.b2CircleShape
        ,   B2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef
        ,   B2RopeJointDef = Box2D.Dynamics.Joints.b2RopeJointDef
        ,   B2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef
		,	B2Fixture = Box2D.Dynamics.b2Fixture
        ,   B2AABB = Box2D.Collision.b2AABB
        ,   B2Color = Box2D.Common.b2Color
		,	B2DebugDraw = Box2D.Dynamics.b2DebugDraw
		,	B2Mat22 = Box2D.Common.Math.b2Mat22	
		,   B2Joint = Box2D.Dynamics.Joints
		,   B2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef
		,   B2WeldJointDef = Box2D.Dynamics.Joints.b2WeldJointDef
		,	B2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef;

    var world = new B2World(new B2Vec2(0,5), false);
		//this.world = new B2World( new B2Vec2(0, 9.81), true);
    var b_canvas = document.getElementById("canvas");
    var b_context = b_canvas.getContext("2d");

	   //for platform
    var a = document.createElement('script');
    a.src = "platform.js"
    document.body.appendChild(a);
	
	var game, barrier1;
    var drawPlatform = true;
    var destroy = false;
	var updateCannon = false;
	var updateRope = false;
	
	var destroyCannonBall = false;
	var destroyRopeBall = false;
	
	var hitLeftWall = false;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    var debugDraw = new B2DebugDraw();
    debugDraw.SetSprite ( document.getElementById ("canvas").getContext ("2d"));
    debugDraw.SetDrawScale(30);     //define scale
    debugDraw.SetFillAlpha(0.3);    //define transparency
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(B2DebugDraw.e_shapeBit | B2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);
		
	game = new Game(b_canvas, b_context, world); 
	//var contactLis; 	
		
function Game(b_canvas, b_context, world)
{	
		  
	this.BounceBall = new Ball(this.b_canvas,this.b_context,this.world,  new B2Vec2(9, 15));
	this.BounceBall2 = new Ball(this.b_canvas,this.b_context,this.world,  new B2Vec2(12, 15));
	this.BounceBall3 = new Ball(this.b_canvas,this.b_context,this.world,  new B2Vec2(15, 15));
	this.BounceBall4 = new Ball(this.b_canvas,this.b_context,this.world,  new B2Vec2(18, 15));
	this.BounceBall5 = new Ball(this.b_canvas,this.b_context,this.world,  new B2Vec2(21, 15));
		
	this.BounceBall6 = new Ball(this.b_canvas,this.b_context,this.world,  new B2Vec2(10.5, 17));
	this.BounceBall7 = new Ball(this.b_canvas,this.b_context,this.world,  new B2Vec2(13.5, 17));
	this.BounceBall8 = new Ball(this.b_canvas,this.b_context,this.world,  new B2Vec2(16.5, 17));
	this.BounceBall9 = new Ball(this.b_canvas,this.b_context,this.world,  new B2Vec2(19.5, 17));
	
	barrier1 = new Barrier(this.b_canvas,this.b_context,this.world,  new B2Vec2(20.3, 16), new B2Vec2(1.7/2 , .5/2), -53);
		
	this.LeftWall = new LvlWalls(this.b_canvas,this.b_context,this.world,  new B2Vec2(4.75, 13), new B2Vec2(.5/2, 24/2),"wallLeft"); 
	//this.LeftWall.SetUserData("wallLeft");
	
	this.RightWall = new LvlWalls(this.b_canvas,this.b_context,this.world,  new B2Vec2(25.25, 13), new B2Vec2(.5/2, 24/2),"wallRight");
	//this.RightWall.SetUserData("wallRight");
	
	this.TopWall = new LvlWalls(this.b_canvas,this.b_context,this.world,  new B2Vec2(15, 1), new B2Vec2(20/2, .5/2),"wallTop");
	
	//var contactLis = new ContactListener(b_canvas, b_context, world, barrier1);	

	}

		

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    window.setInterval(update,1000/60);
		
    function update() 
    {
        world.Step(1 / 60, 10, 10);
        world.DrawDebugData();
        world.ClearForces();
           
		if(updateCannon)
		{this.myCannon.Update();}
		if (updateRope)
		{this.myRope.Update();}
		
		barrier1.Update();
		
		if(hitLeftWall == false)
		{
		platformF.SetLinearVelocity(new B2Vec2(-5, -0.084));
		platformF2.SetLinearVelocity(new B2Vec2(-5, 0));
		}
		else if(hitLeftWall == true)
		{
		platformF.SetLinearVelocity(new B2Vec2(5, -0.084));
		platformF2.SetLinearVelocity(new B2Vec2(5, 0));
		}
		
		if(destroyCannonBall == true)
		{
		this.myCannon.reset = true;
		}
				
		if(destroyRopeBall == true)
		{
		this.myCannon.reset = true;
		}
    	   	
	}


window.addEventListener('keyup', function (event) 
{
	switch (event.keyCode) 
    {      
               
        case 37: // Left arrow
		if(updateCannon){
		this.myCannon.MoveLeft = false;}
		this.myRope.MoveLeft = false;
           	break;
       	case 39: // Right arrow
		if(updateCannon){
		this.myCannon.MoveRight = false;}
		this.myRope.MoveRight = false;
           	break;
		case 38:  // up arrow
		this.myCannon.reset = false;
			break;
		case 32: // Space
		if(updateCannon){
		this.myCannon.shoot = false;}
		this.myRope.shoot = false;
			break;
    }
}
, false);

window.addEventListener('keydown', function (event) 
{
	switch (event.keyCode) 
    {      
               
        case 37: // Left arrow
		if(updateCannon){
		this.myCannon.MoveLeft = true;}
		this.myRope.MoveLeft = true;
           	break;
			
       	case 39: // Right arrow
		if(updateCannon){
		this.myCannon.MoveRight = true;}
		this.myRope.MoveRight = true;
           	break;
			
		case 38:  // up arrow
		this.myCannon.reset = true;
			break;
			
		// case 40:   // up arrow

			// break;
			
		case 32:  // Space
		if(updateCannon){
		this.myCannon.shoot = true;}
		this.myRope.shoot = true;
			break;
			
		case 65: //a
		removeMultiObjects();
		updateRope=true;
		this.myRope = new Rope(this.b_canvas,this.b_context,this.world,  new B2Vec2(20, 5) , new B2Vec2(.3/2 , 1/2));
			break;
			
		case 68:// d
		removeMultiObjects();
		updateCannon=true
		this.myCannon = new Cannon(this.b_canvas,this.b_context,this.world,  new B2Vec2(15, 5) , new B2Vec2(3/2 , 1.5/2));
			break;
			
		case 87: // e
		this.myCannon.DestroyCannon();
			break;
			
		case 88:  //x
		this.myRope.DestroyRope();
			break;
		
    }
}
, false);


function removeMultiObjects() 
{
	if(this.myRope != null)
	{
		this.myRope.DestroyRope();
	}
	if(this.myCannon != null)
	{
		this.myCannon.DestroyCannon();
	}
}




		