function Cannon(mCanvas,mContext,mWorld,x,y)
{		
	this.world = mWorld;
	this.canvas = mCanvas;
	this.context = mContext;
	this.pos = new B2Vec2(x,y);
	
	this.fixDef = new B2FixtureDef();
	this.fixDef.density = 1.0;	
	this.fixDef.friction = 0.8;	
	this.fixDef.restitution = 0.1;	
	this.bodyDef = new B2BodyDef();
	
	// SETS DEFAULT DATA FOR THE OBJECT WHICH CAN BE RETRIEVED LATER
	this.bodyDef.userData = "Cannon";
	
	this.bodyDef.type = B2Body.b2_dynamicBody;
	
	this.fixDef.shape = new b2PolygonShape();
	this.fixDef.shape.m_radius = this.radius;
	
	this.bodyDef.position.Set(this.pos.x, this.pos.y);
	this.theBody = this.world.CreateBody(this.bodyDef);
	this.theBody.CreateFixture(this.fixDef);
}

function mys(mCanvas,mContext,mWorld,x,y)
{
}
this.GameInput = function(keycode, TypeofEvent)
{	
	if(keycode == 37)//left arrow
	{

	}
	
	if(keycode == 39)//right arrow
	{

	}
}