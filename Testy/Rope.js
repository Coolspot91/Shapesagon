function Rope(mCanvas,mContext,mWorld,mPos, mSize)
{		
	// this.world = mWorld;
	// this.canvas = mCanvas;
	// this.context = mContext;
	// this.fixDef = new B2FixtureDef();
	// this.bodyDef = new B2BodyDef();
	// this.fixDef2 = new B2FixtureDef();
	// this.bodyDef2 = new B2BodyDef();
	// this.fixDef3 = new B2FixtureDef();
	// this.bodyDef3 = new B2BodyDef();
	// this.pos = mPos;
	// this.size = mSize;
	// this.MoveLeft = false;
	// this.MoveRight = false;
	// this.shoot = false;
	
	// this.fixDef.density = 1.0;	
	// this.fixDef.friction = 0.8;	
	// this.fixDef.restitution = 0.1;	
	
	 this.DEGTORAD  = 0.0174532925199432957;
	 this.RADTODEG = 57.295779513082320876;
	// this.rot = new B2Vec2(1,1);
	
	this.fixDefRotationPoint = new B2FixtureDef();
	this.bodyDefRotationPoint = new B2BodyDef();
	this.bodyDefRotationPoint.position.x = 15;
	this.bodyDefRotationPoint.position.y = 2;
	this.bodyDefRotationPoint.type = B2Body.b2_dynamicBody;
	//this.bodyDefRotationPoint.active = false;
	this.bodyDefRotationPoint.gravityScale = 0.0;
		 
	this.fixDefRotationPoint.density = 55000.0;
	this.fixDefRotationPoint.friction = 10;
	this.fixDefRotationPoint.restitution = 0.1;
	this.fixDefRotationPoint.shape = new B2CircleShape(1);
	this.RotationPoint = world.CreateBody(this.bodyDefRotationPoint);
	this.RotationPoint.CreateFixture(this.fixDefRotationPoint);
	var angle = 95*this.DEGTORAD;
	this.RotationPoint.SetAngle(angle);
	
	this.fixDefCircle = new B2FixtureDef();
	this.bodyDefCircle = new B2BodyDef();
	this.bodyDefCircle.position.x = 15;
	this.bodyDefCircle.position.y = 7;
	this.bodyDefCircle.type = B2Body.b2_dynamicBody;		 
	this.fixDefCircle.shape = new B2CircleShape(0.35);
	this.circle = world.CreateBody(this.bodyDefCircle);
	this.circle.CreateFixture(this.fixDefCircle);
	this.circle.SetUserData("ball");
	
	this.fixDef = new B2FixtureDef();
	this.bodyDef = new B2BodyDef();
	this.bodyDef.type = B2Body.b2_dynamicBody;
	this.bodyDef.position.Set(15,4);
	this.fixDef.density = 1;
	this.fixDef.shape = new B2PolygonShape();
	this.fixDef.shape.SetAsBox(.5,0.1);
	
	//this.RotationPoint.setGravityScale(0);
	//this.bodyDef.gravityScale = 0.0;
	//create first link
	this.theBody = world.CreateBody(this.bodyDef);
	this.theBody.CreateFixture(this.fixDef);
	
	
	this.RevJoint = new B2RevoluteJointDef();
	this.RevJoint.localAnchorA.Set( 0.4,0);
	this.RevJoint.localAnchorB.Set(-0.4,0);
	
	this.RevJoint2 = new B2RevoluteJointDef();
	this.RevJoint2.bodyA = this.theBody;//the last added link of the chain
	this.RevJoint2.bodyB = this.circle;
	this.RevJoint2.localAnchorA.Set(-1,0);//the regular position for chain link joints, as above
	//world.CreateJoint( this.RevJoint2 );
	this.jointJohn = world.CreateJoint(this.RevJoint2);
  
  //use same definitions to create multiple bodies
  for (var i = 0; i < 4; i++) 
  {
	  this.newBody = world.CreateBody(this.bodyDef);
	  this.newBody.CreateFixture(this.fixDef);
	  
	  this.RevJoint.bodyA = this.theBody;
      this.RevJoint.bodyB = this.newBody;
      world.CreateJoint(this.RevJoint);
	  
	  //link = newLink;//prepare for next iteration
	  this.theBody = this.newBody;
  }
  
	//another revolute joint to connect the chain to the circle
	this.RevJoint.bodyA = this.theBody;//the last added link of the chain
	this.RevJoint.bodyB = this.RotationPoint;
	this.RevJoint.localAnchorA.Set(0.75,0);//the regular position for chain link joints, as above
	this.RevJoint.localAnchorB.Set(1.2,0);//a little in from the edge of the circle
	world.CreateJoint( this.RevJoint );
	
}

Rope.prototype.Update = function()
{
 //this.RotationPoint.ApplyForce( this.RotationPoint.GetMass() * world.GetGravity(), this.RotationPoint.GetWorldCenter() );
 //this.RotationPoint.ApplyForce( new B2Vec2(0,-5), this.RotationPoint.GetWorldCenter() );
 this.RotationPoint.SetLinearVelocity(new B2Vec2(0,-1));
	if(this.shoot == true)
		{
				this.shoot = false;
				world.DestroyJoint(this.jointJohn);

		}
		if (this.MoveLeft == true && this.RotationPoint.GetAngle() < 180*this.DEGTORAD)
			{
				this.RotationPoint.SetAngularVelocity(2);
			}
		
		else if (this.MoveRight == true && this.RotationPoint.GetAngle() > 0*this.DEGTORAD)
			{
				this.RotationPoint.SetAngularVelocity(-2);
			}
		else{this.RotationPoint.SetAngularVelocity(0);}
}

Rope.prototype.DestroyRope = function()
{	
	for (var b = world.GetBodyList(); b; b = b.GetNext())
	{
	 if(b.GetUserData()	 != "wall")
	  {
		world.DestroyBody(b);
	  }
	}

}