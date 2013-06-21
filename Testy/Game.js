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
	
		
		var Cannon, myBall, game, Rope;
        var drawPlatform = true;
        var destroy = false;
		var createCannon = true;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        var debugDraw = new B2DebugDraw();
        debugDraw.SetSprite ( document.getElementById ("canvas").getContext ("2d"));
        debugDraw.SetDrawScale(30);     //define scale
        debugDraw.SetFillAlpha(0.3);    //define transparency
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(B2DebugDraw.e_shapeBit | B2DebugDraw.e_jointBit);
        world.SetDebugDraw(debugDraw);
		
		game = new Game(b_canvas, b_context, world); 
		
		
	function Game(b_canvas, b_context, world)
	{	
		if(createCannon)
		{Cannon = new Cannon(this.b_canvas,this.b_context,this.world,  new B2Vec2(15, 5) , new B2Vec2(3/2 , 1.5/2));}
		else
		{Rope = new Rope(this.b_canvas,this.b_context,this.world,  new B2Vec2(20, 5) , new B2Vec2(.3/2 , 1/2));}
		  
		this.LeftWall = new LvlWalls(this.b_canvas,this.b_context,this.world,  new B2Vec2(4.75, 13), new B2Vec2(.5/2, 24/2)); 
		this.RightWall = new LvlWalls(this.b_canvas,this.b_context,this.world,  new B2Vec2(25.25, 13), new B2Vec2(.5/2, 24/2));
		this.TopWall = new LvlWalls(this.b_canvas,this.b_context,this.world,  new B2Vec2(15, 1), new B2Vec2(20/2, .5/2));

	}

		

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        window.setInterval(update,1000/60);
		
        function update() 
        {
            world.Step(1 / 60, 10, 10);
            world.DrawDebugData();
            world.ClearForces();
           
			if(createCannon)
			{Cannon.Update();}
			else{Rope.Update();}
    	   	
		}


window.addEventListener('keyup', function (event) 
{
	switch (event.keyCode) 
    {      
               
        case 37: // Left arrow
		Cannon.MoveLeft = false;
		Rope.MoveLeft = false;
           	break;
       	case 39: // Right arrow
		Cannon.MoveRight = false;
		Rope.MoveRight = false;
           	break;
		case 38:  // up arrow
		Cannon.reset = false;
			break;
		case 32: // Space
		Cannon.shoot = false;
		Rope.shoot = false;
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
		Rope.MoveLeft = true;
           	break;
			
       	case 39: // Right arrow
		Cannon.MoveRight = true;
		Rope.MoveRight = true;
           	break;
			
		case 38:  // up arrow
		Cannon.reset = true;
			break;
			
		// case 40:   // up arrow

			// break;
			
		case 32:  // Space
		Cannon.shoot = true;
		Rope.shoot = true;
			break;
			
		case 65: //a
			break;
			
		case 68:// d
			break;
			
		case 87: // e
		Cannon.DestroyCannon();
			break;
			
		case 88:  //x
		Rope.DestroyRope();
			break;
		
    }
}
, false);




		