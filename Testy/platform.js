var platformWidth = 5;
var platformHeight = 0.5;

if(drawPlatform == true)
{
	  //TOP
	  var platformDef = new B2BodyDef;
	  platformDef.type = B2Body.b2_staticBody;
	  platformDef.position.x = 18;
	  platformDef.position.y = 20;
	 
	  var fixDefPlatform = new B2FixtureDef;
	  fixDefPlatform.shape = new B2PolygonShape();
	  fixDefPlatform.shape.SetAsBox(platformWidth , platformHeight);
	  
	  var platformF = world.CreateBody(platformDef);
	  platformF.CreateFixture(fixDefPlatform);
	  platformF.SetUserData("platform");
	  
}