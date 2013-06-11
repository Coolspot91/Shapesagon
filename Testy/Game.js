var CANVAS_WIDTH = 1000, CANVAS_HEIGHT = 900, SCALE = 30;

        var    b2Vec2 = Box2D.Common.Math.b2Vec2
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
        ,      b2Color = Box2D.Common.b2Color;

        var world = new b2World(new b2Vec2(0,5), false);

        var b_canvas = document.getElementById("canvas");
        var b_context = b_canvas.getContext("2d");

	

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        var debugDraw = new b2DebugDraw();
        debugDraw.SetSprite ( document.getElementById ("canvas").getContext ("2d"));
        debugDraw.SetDrawScale(30);     //define scale
        debugDraw.SetFillAlpha(0.3);    //define transparency
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        world.SetDebugDraw(debugDraw);
		
		  var bodyDef = new b2BodyDef;
		  bodyDef.type = b2Body.b2_dynamicBody;
		  bodyDef.position.x = 22;
		  bodyDef.position.y = 13;
		 
		  var fixDef = new b2FixtureDef;
		  fixDef.density = 1000.0;
		  fixDef.friction = 0;
		  fixDef.restitution = 0.2;
		  fixDef.shape = new b2CircleShape(0.35);
		  var circle = world.CreateBody(bodyDef);
		  circle.CreateFixture(fixDef);
		  circle.SetUserData("ball");
		  
		  
		  
		  
		  var bodyDefWall = new b2BodyDef;
		  bodyDefWall.type = b2Body.b2_staticBody;
		  bodyDefWall.position.x = 4.75;
		  bodyDefWall.position.y =13;
		 
		  var fixDefWall = new b2FixtureDef;
		  fixDefWall.density = 1000.0;
		  fixDefWall.friction = 0;
		  fixDefWall.restitution = 0.2;
		  fixDefWall.shape = new b2PolygonShape();
		  fixDefWall.shape.SetAsBox(.5/2 , 24/2);
		  var wall = world.CreateBody(bodyDefWall);
		  wall.CreateFixture(fixDefWall);
		  wall.SetUserData("wall");
		  
		  
		  var bodyDefWall2 = new b2BodyDef;
		  bodyDefWall2.type = b2Body.b2_staticBody;
		  bodyDefWall2.position.x = 25.25;
		  bodyDefWall2.position.y = 13;
		 
		  var fixDefWall2 = new b2FixtureDef;
		  fixDefWall2.density = 1000.0;
		  fixDefWall2.friction = 0;
		  fixDefWall2.restitution = 0.2;
		  fixDefWall2.shape = new b2PolygonShape();
		  fixDefWall2.shape.SetAsBox(.5/2 , 24/2);
		  var wall2 = world.CreateBody(bodyDefWall2);
		  wall2.CreateFixture(fixDefWall2);
		  wall2.SetUserData("wall");
		  
		  
		  
		  
		  var bodyDefWall3 = new b2BodyDef;
		  bodyDefWall3.type = b2Body.b2_staticBody;
		  bodyDefWall3.position.x = 15;
		  bodyDefWall3.position.y = 1;
		 
		  var fixDefWall3 = new b2FixtureDef;
		  fixDefWall3.density = 1000.0;
		  fixDefWall3.friction = 0;
		  fixDefWall3.restitution = 0.2;
		  fixDefWall3.shape = new b2PolygonShape();
		  fixDefWall3.shape.SetAsBox(20/2 , .5/2);
		  var wall3 = world.CreateBody(bodyDefWall3);
		  wall3.CreateFixture(fixDefWall3);
		  wall3.SetUserData("wall");
		  
		  
	

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        window.setInterval(update,1000/60);
		
        function update() 
        {
            world.Step(1 / 60, 10, 10);
            world.DrawDebugData();
            world.ClearForces();
            
            b_context.fillStyle = '#fff';
    	   	b_context.font = 'italic bold 30px sans-serif';

		}