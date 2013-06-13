function Ball(mCanvas,mContext,mWorld,mPos)
{
	this.world = mWorld;
	this.canvas = mCanvas;
	this.context = mContext;
	this.fixDef = new B2FixtureDef();
	this.bodyDef = new B2BodyDef();
	this.pos = mPos;
	this.thisShot = false;
	
	this.bodyDef.type = B2Body.b2_dynamicBody;
	this.bodyDef.position.x = this.pos.x;
	this.bodyDef.position.y = this.pos.y;
		 
	this.fixDef.density = 1000.0;
	this.fixDef.friction = 0;
	this.fixDef.restitution = 0.2;
	this.fixDef.shape = new B2CircleShape(0.35);
	this.circle = world.CreateBody(this.bodyDef);
	this.circle.CreateFixture(this.fixDef);
	this.circle.SetUserData("ball");
}
Ball.prototype.ToggleCustomBalls = function()
{

}

Ball.prototype.update = function()	//update the cannon position as the player moves
{

}