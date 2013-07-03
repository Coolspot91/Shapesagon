function LvlWalls(mCanvas,mContext,mWorld,mPos,mSize,mUserData)
{
	this.world = mWorld;
	this.canvas = mCanvas;
	this.context = mContext;
	this.fixDef = new B2FixtureDef();
	this.bodyDef = new B2BodyDef();
	this.pos = mPos;
	this.size = mSize;
	
	var bodyDefWall = new B2BodyDef;
	bodyDefWall.type = B2Body.b2_staticBody;
	bodyDefWall.position.x = this.pos.x;
	bodyDefWall.position.y = this.pos.y;
		 
	var fixDefWall = new B2FixtureDef;
	fixDefWall.density = 1000.0;
	fixDefWall.friction = 0;
	fixDefWall.restitution = 0.8;
	fixDefWall.shape = new B2PolygonShape();
	fixDefWall.shape.SetAsBox(this.size.x , this.size.y);
	var wall = world.CreateBody(bodyDefWall);
	wall.CreateFixture(fixDefWall);
	wall.SetUserData(mUserData);
		  
}