function Barrier(mCanvas,mContext,mWorld,mPos, mSize, mAngle)
{		
	this.alive = true;
	this.world = mWorld;
	this.canvas = mCanvas;
	this.context = mContext;
	this.fixDef = new B2FixtureDef();
	this.bodyDef = new B2BodyDef();
	this.pos = mPos;
	this.size = mSize;
	this.angle = mAngle;
	this.fixDef.density = 1.0;	
	this.fixDef.friction = 1;	
	this.fixDef.restitution = 0.5;	
	this.DEGTORAD  = 0.0174532925199432957;
	
	this.fixDef.shape = new B2PolygonShape();
	this.fixDef.shape.SetAsBox(this.size.x , this.size.y);
	
	this.bodyDef.type = B2Body.b2_staticBody;   
	this.bodyDef.position.Set(this.pos.x,this.pos.y);
	this.theBody = world.CreateBody(this.bodyDef);
	this.theBody.CreateFixture(this.fixDef);
	this.theBody.SetUserData("Barrier");
	this.theBody.SetAngle(this.angle*this.DEGTORAD);
}

Barrier.prototype.Update = function()
{
	if(this.alive == false)
	{
		world.DestroyBody(this.theBody);
	}
}
