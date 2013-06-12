var platformWidth = 5;
var platformHeight = 0.5;

if(drawPlatform == true)
{
	  //TOP
	  var platformDef = new b2BodyDef;
	  platformDef.type = b2Body.b2_staticBody;
	  platformDef.position.x = 18;
	  platformDef.position.y = 20;
	 
	  var fixDefPlatform = new b2FixtureDef;
	  fixDefPlatform.shape = new b2PolygonShape();
	  fixDefPlatform.shape.SetAsBox(platformWidth , platformHeight);
	  
	  var platformF = world.CreateBody(platformDef);
	  platformF.CreateFixture(fixDefPlatform);
	  platformF.SetUserData("platform");
	  
}