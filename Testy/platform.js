var platformWidth = 5;
var platformHeight = 0.5;

var platformX = 18;
var platformY = 20;

var jointDef;
var weldJoint;
var jointF;

if(drawPlatform == true)
{
	  //TOP
	  var platformDef = new b2BodyDef;
	  platformDef.type = b2Body.b2_dynamicBody;
	  platformDef.position.x = platformX;
	  platformDef.position.y = platformY;
	 
	  var fixDefPlatform = new b2FixtureDef;
	  fixDefPlatform.shape = new b2PolygonShape();
	  fixDefPlatform.shape.SetAsBox(platformWidth , platformHeight);
	  
	  var platformF = world.CreateBody(platformDef);
	  platformF.CreateFixture(fixDefPlatform);
	  platformF.SetUserData("platform");
	  
	  //TOP
	  var platformDef2 = new b2BodyDef;
	  platformDef2.type = b2Body.b2_kinematicBody;
	  platformDef2.position.x = platformX;
	  platformDef2.position.y = platformY;
	 
	  var fixDefPlatform2 = new b2FixtureDef;
	  fixDefPlatform2.shape = new b2PolygonShape();
	  fixDefPlatform2.shape.SetAsBox(platformWidth , platformHeight);
	  
	  var platformF2 = world.CreateBody(platformDef2);
	  platformF2.CreateFixture(fixDefPlatform2);
	  platformF2.SetUserData("platform");
	  
	  jointDef = new b2WeldJointDef();
	  jointDef.bodyA = platformF;
	  jointDef.bodyB = platformF2;
	  jointDef.localAnchorA.Set(0,0);
	  
	  //jointF = world.CreateJoint(jointDef);
	  var jointJohn = world.CreateJoint(jointDef);
	
	  
	  listener2.BeginContact = function(contact) 
	  {
		  // console.log(contact.GetFixtureA().GetBody().GetUserData());
		  if(contact.GetFixtureB().GetBody().GetUserData()=="platform" 
		        || contact.GetFixtureA().GetBody().GetUserData()=="platform")
		  {       	
			  if(contact.GetFixtureA().GetBody().GetUserData()== "wallLeft" 	
				  ||contact.GetFixtureB().GetBody().GetUserData()=="wallLeft")    	
			  {   		 
				  hitLeftWall = true;  
				 
			  }
			  
			  if(contact.GetFixtureA().GetBody().GetUserData()== "wallRight" 	
				  ||contact.GetFixtureB().GetBody().GetUserData()=="wallRight")    	
			  {   		 
				  hitLeftWall = false;  
				 
			  }
			  
			  if(contact.GetFixtureA().GetBody().GetUserData()== "ball" 	
				  ||contact.GetFixtureB().GetBody().GetUserData()=="ball")    	
			  {   		 
				  destroy = true;  
				 
			  }
		  }
	  }

	    
	  listener2.EndContact = function(contact) 
	  {
		  // console.log(contact.GetFixtureA().GetBody().GetUserData());
		  if(contact.GetFixtureB().GetBody().GetUserData()=="platform" 
		        || contact.GetFixtureA().GetBody().GetUserData()=="platform")
		  {
			  if(contact.GetFixtureA().GetBody().GetUserData()== "ball" 	
				  ||contact.GetFixtureB().GetBody().GetUserData()=="ball")    	
			  {   		 
				  destroy = false;  
				 
			  }
		  }
	  }
	  
}