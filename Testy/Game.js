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
		,	B2DebugDraw = Box2D.Dynamics.b2DebugDraw
		,	B2Mat22 = Box2D.Common.Math.b2Mat22	
		,   B2Joint = Box2D.Dynamics.Joints
		,   B2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef
		,   B2WeldJointDef = Box2D.Dynamics.Joints.b2WeldJointDef
		,	B2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef;

        var world = new B2World(new B2Vec2(0,0), false);
		//this.world = new B2World( new B2Vec2(0, 9.81), true);
        var b_canvas = document.getElementById("canvas");
        var b_context = b_canvas.getContext("2d");
		var fixDef = new B2FixtureDef();	
		var bodyDef = new B2BodyDef();	
		
		var Cannon;
        var drawPlatform = true;
        var destroy = false;
		var circle;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        var debugDraw = new B2DebugDraw();
        debugDraw.SetSprite ( document.getElementById ("canvas").getContext ("2d"));
        debugDraw.SetDrawScale(30);     //define scale
        debugDraw.SetFillAlpha(0.3);    //define transparency
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(B2DebugDraw.e_shapeBit | B2DebugDraw.e_jointBit);
        world.SetDebugDraw(debugDraw);
		
		
	function Game(b_canvas, b_context, world)
	{	
	
		 var bodyDef = new B2BodyDef;
		 bodyDef.type = B2Body.b2_dynamicBody;
		 bodyDef.position.x = 22;
		 bodyDef.position.y = 13;
		 
		var fixDef = new B2FixtureDef;
		fixDef.density = 1000.0;
		fixDef.friction = 0;
		fixDef.restitution = 0.2;
		fixDef.shape = new B2CircleShape(0.35);
		circle = world.CreateBody(bodyDef);
		circle.CreateFixture(fixDef);
		circle.SetUserData("ball");
		  
		  
		  
		  //LEFT
		  var bodyDefWall = new B2BodyDef;
		  bodyDefWall.type = B2Body.b2_staticBody;
		  bodyDefWall.position.x = 4.75;
		  bodyDefWall.position.y =13;
		 
		  var fixDefWall = new B2FixtureDef;
		  fixDefWall.density = 1000.0;
		  fixDefWall.friction = 0;
		  fixDefWall.restitution = 0.2;
		  fixDefWall.shape = new B2PolygonShape();
		  fixDefWall.shape.SetAsBox(.5/2 , 24/2);
		  var wall = world.CreateBody(bodyDefWall);
		  wall.CreateFixture(fixDefWall);
		  wall.SetUserData("wall");
		  
		  //RIGHT
		  var bodyDefWall2 = new B2BodyDef;
		  bodyDefWall2.type = B2Body.b2_staticBody;
		  bodyDefWall2.position.x = 25.25;
		  bodyDefWall2.position.y = 13;
		 
		  var fixDefWall2 = new B2FixtureDef;
		  fixDefWall2.density = 1000.0;
		  fixDefWall2.friction = 0;
		  fixDefWall2.restitution = 0.2;
		  fixDefWall2.shape = new B2PolygonShape();
		  fixDefWall2.shape.SetAsBox(.5/2 , 24/2);
		  var wall2 = world.CreateBody(bodyDefWall2);
		  wall2.CreateFixture(fixDefWall2);
		  wall2.SetUserData("wall");
		  
		  
		  
		  
		  //TOP
		  var bodyDefWall3 = new B2BodyDef;
		  bodyDefWall3.type = B2Body.b2_staticBody;
		  bodyDefWall3.position.x = 15;
		  bodyDefWall3.position.y = 1;
		 
		  var fixDefWall3 = new B2FixtureDef;
		  fixDefWall3.density = 1000.0;
		  fixDefWall3.friction = 0;
		  fixDefWall3.restitution = 0.2;
		  fixDefWall3.shape = new B2PolygonShape();
		  fixDefWall3.shape.SetAsBox(20/2 , .5/2);
		  var wall3 = world.CreateBody(bodyDefWall3);
		  wall3.CreateFixture(fixDefWall3);
		  wall3.SetUserData("wall");
		  
		  //this.Cannon = new Cannon(this.b_canvas,this.b_context,this.world);
		  Cannon = new Cannon(this.b_canvas,this.b_context,this.world,  new B2Vec2(15, 5));

	}
	Game.prototype.init = function()
	{
		//Cannon = new Cannon(this.b_canvas,this.b_context,this.world,  new B2Vec2(15, 3));
		//this.Cannon = new mys();
		//var test = new TestClass();
	}
	
		var game = new Game(b_canvas, b_context, world);
		game.init();
		

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        window.setInterval(update,1000/60);
		
        function update() 
        {
            world.Step(1 / 60, 10, 10);
            world.DrawDebugData();
            world.ClearForces();
           
			
			Cannon.Update();
    	   	
		}
		
/*window.addEventListener('keypress', function (event) {
	this.game.Cannon.GameInput(event.keyCode, 0);
}
, false);*/

window.addEventListener('keyup', function (event) 
{
	switch (event.keyCode) 
    {      
               
        case 37: // Left arrow
		Cannon.MoveLeft = false;
           	break;
       	case 39: // Right arrow
		Cannon.MoveRight = false;
           	break;
    }
}
, false);

window.addEventListener('keydown', function (event) 
{
	switch (event.keyCode) 
    {      
               
        case 37: // Left arrow
		Cannon.MoveLeft = true;
		//Cannon.theBody.ApplyImpulse(new B2Vec2(0,5*-125),new B2Vec2(0,0));
		circle.ApplyImpulse(new B2Vec2(-200,0),new B2Vec2(0,0));
           	break;
			
       	case 39: // Right arrow
		Cannon.MoveRight = true;
		//Cannon.theBody.ApplyImpulse(new B2Vec2(0,5*125),new B2Vec2(0,0));
		circle.ApplyImpulse(new B2Vec2(2000,0),new B2Vec2(0,0));
           	break;
			
		case 38:
		circle.ApplyImpulse(new B2Vec2(0,5*-200),new B2Vec2(0,0));
			break;
    }
}
, false);




		