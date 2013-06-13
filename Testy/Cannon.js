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
	this.shoot = false;
	
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
	
	
	
	this.fixDefRotationPoint = new B2FixtureDef();
	this.bodyDefRotationPoint = new B2BodyDef();
	this.bodyDefRotationPoint.position.x = 15;
	this.bodyDefRotationPoint.position.y = 2;
	this.bodyDefRotationPoint.type = B2Body.b2_staticBody;
		 
	this.fixDefRotationPoint.density = 1000.0;
	this.fixDefRotationPoint.friction = 0;
	this.fixDefRotationPoint.restitution = 0.2;
	this.fixDefRotationPoint.shape = new B2CircleShape(0.5);
	this.RotationPoint = world.CreateBody(this.bodyDefRotationPoint);
	this.RotationPoint.CreateFixture(this.fixDefRotationPoint);
	this.RotationPoint.SetUserData("RotationPoint");
	
	
	this.fixDefCircle = new B2FixtureDef();
	this.bodyDefCircle = new B2BodyDef();
	this.bodyDefCircle.position.x = 15;
	this.bodyDefCircle.position.y = 7;
	this.bodyDefCircle.type = B2Body.b2_dynamicBody;
		 
	this.fixDefCircle.density = 1.0;
	this.fixDefCircle.friction = 0;
	this.fixDefCircle.restitution = 0.2;
	this.fixDefCircle.shape = new B2CircleShape(0.35);
	this.circle = world.CreateBody(this.bodyDefCircle);
	this.circle.CreateFixture(this.fixDefCircle);
	this.circle.SetUserData("ball");
	
	
	this.RevJoint = new B2RevoluteJointDef();
	this.RevJoint.bodyA = this.theBody;
	this.RevJoint.bodyB = this.RotationPoint;
	this.RevJoint.localAnchorA.Set(0,-2);
	world.CreateJoint(this.RevJoint);
	
	this.RevJoint2 = new B2RevoluteJointDef();
	this.RevJoint2.bodyA = this.theBody;
	this.RevJoint2.bodyB = this.circle;
	this.RevJoint2.localAnchorA.Set(0,2);
	world.CreateJoint(this.RevJoint2);

	this.Update = function()
	{
		if(this.shoot == true)
		{
			if (this.RevJoint2 != null) 
			{
				//world.DestroyJoint(this.RevJoint2);
				this.RevJoint2=null;
				this.shoot = false;
				//this.circle.ApplyImpulse(new B2Vec2(0,this.Body.GetAngle()),this.theBody.GetWorldCenter()  );
				//var bodyAngle = this.theBody.GetAngle();
				//this.theBody.SetAngle(bodyAngle);
				//var bodyAngle = this.theBody.GetPosition();
				//this.theBody.SetTransform( this.theBody.GetPosition(), bodyAngle );
				
			}
		}
		if (this.MoveLeft == true)
			{
				//this.theBody.ApplyForce(new B2Vec2(40*-1,0),new B2Vec2(0,0));
				//this.theBody.ApplyImpulse(new B2Vec2(0,-125),new B2Vec2(0,0));
				//this.theBody.SetTransform(this.theBody.GetPosition(), -.45 * this.DEGTORAD );
				//this.theBody.ApplyImpulse(new B2Vec2(-.001,0),this.theBody.GetWorldPoint( this.rot ) );
				this.theBody.SetAngularVelocity(1);
				//this.theBody.SetTransform( this.theBody.GetPosition() , this.theBody.GetAngle() );
				console.log("Left");
			}
		
		else if (this.MoveRight == true)
			{
				//this.theBody.ApplyForce(new B2Vec2(40*1,0),new B2Vec2(0,0));
				//this.theBody.ApplyImpulse(new B2Vec2(0,125),new B2Vec2(0,0));
				//this.theBody.SetTransform(this.theBody.GetPosition(), .45 * this.DEGTORAD );
				//this.theBody.ApplyImpulse(new B2Vec2(.001,0),this.theBody.GetWorldPoint( this.rot ) );    //this.theBody.GetWorldPoint( B2Vec2(1,1) ));
				this.theBody.SetAngularVelocity(-1);
				console.log("Right");
			}
		else{this.theBody.SetAngularVelocity(0);}
	};
};








/*bool SetTransform(const b2Vec2& position, float32 angle);
const b2Transform& GetTransform() const;
const b2Vec2& GetPosition() const;
float32 GetAngle() const;*/