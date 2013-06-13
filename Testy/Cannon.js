//var theBody;
function Cannon(mCanvas,mContext,mWorld,mPos)
{		
	this.world = mWorld;
	//this.canvas = mCanvas;
	//this.context = mContext;
	this.fixDef = new B2FixtureDef();
	this.bodyDef = new B2BodyDef();
	this.pos = mPos;
	this.MoveLeft = false;
	this.MoveRight = false;
	
	this.fixDef.density = 1.0;	
	this.fixDef.friction = 0.8;	
	this.fixDef.restitution = 0.1;	
	
	this.DEGTORAD  = 0.0174532925199432957;
	this.RADTODEG = 57.295779513082320876;
	this.rot = new B2Vec2(1,1);
	
	// SETS DEFAULT DATA FOR THE OBJECT WHICH CAN BE RETRIEVED LATER
	//this.bodyDef.userData = "Cannon";
	
	this.fixDef.shape = new B2PolygonShape();
	this.fixDef.shape.SetAsBox(1.5/2 , 3/2);
	
	this.bodyDef.type = B2Body.b2_dynamicBody;   // b2_kinematicBody  // b2_dynamicBody // b2_staticBody
	this.bodyDef.position.Set(this.pos.x,this.pos.y);
	//bodyDef.position.Set(pos.x,pos.y);
	
	this.theBody = world.CreateBody(this.bodyDef);
	this.theBody.CreateFixture(this.fixDef);
	
	this.pos = this.theBody.GetPosition();
	this.rot.x = this.pos.x +2;
	this.rot.y = this.pos.y +2;
	this.theBody.GetWorldPoint(this.rot );
	//theBody = world.CreateBody(this.bodyDef);
	//theBody.CreateFixture(this.fixDef);


	this.Update = function()
	{
		if (this.MoveLeft == true)
			{
				//this.theBody.ApplyForce(new B2Vec2(40*-1,0),new B2Vec2(0,0));
				//this.theBody.ApplyImpulse(new B2Vec2(0,-125),new B2Vec2(0,0));
				//this.theBody.SetTransform(this.theBody.GetPosition(), -.45 * this.DEGTORAD );
				//this.theBody.ApplyImpulse(new B2Vec2(-.001,0),this.theBody.GetWorldPoint( this.rot ) );
				this.theBody.SetAngularVelocity(-1);
				//this.theBody.SetTransform( this.theBody.GetPosition() , this.theBody.GetAngle() );
				console.log("Left");
			}
		
		else if (this.MoveRight == true)
			{
				//this.theBody.ApplyForce(new B2Vec2(40*1,0),new B2Vec2(0,0));
				//this.theBody.ApplyImpulse(new B2Vec2(0,125),new B2Vec2(0,0));
				//this.theBody.SetTransform(this.theBody.GetPosition(), .45 * this.DEGTORAD );
				//this.theBody.ApplyImpulse(new B2Vec2(.001,0),this.theBody.GetWorldPoint( this.rot ) );    //this.theBody.GetWorldPoint( B2Vec2(1,1) ));
				this.theBody.SetAngularVelocity(1);
				console.log("Right");
			}
		else{this.theBody.SetAngularVelocity(0);}
	};
};