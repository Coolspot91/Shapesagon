//var theBody;
function Cannon(mCanvas,mContext,mWorld,mPos, mSize)
{		
	this.world = mWorld;
	this.canvas = mCanvas;
	this.context = mContext;
	this.fixDef = new B2FixtureDef();
	this.bodyDef = new B2BodyDef();
	this.pos = mPos;
	this.size = mSize;
	this.MoveLeft = false;
	this.MoveRight = false;
	this.shoot = false;
	this.reset = false;
	this.fixDef.density = 1.0;	
	this.fixDef.friction = 1;	
	this.fixDef.restitution = 0.1;	
	this.DEGTORAD  = 0.0174532925199432957;
	this.RADTODEG = 57.295779513082320876;
	this.rot = new B2Vec2(1,1);
	
	// SETS DEFAULT DATA FOR THE OBJECT WHICH CAN BE RETRIEVED LATER
	//this.bodyDef.userData = "Cannon";
	
	this.fixDef.shape = new B2PolygonShape();
	this.fixDef.shape.SetAsBox(this.size.x , this.size.y);
	
	this.bodyDef.type = B2Body.b2_dynamicBody;   // b2_kinematicBody  // b2_dynamicBody // b2_staticBody
	this.bodyDef.position.Set(this.pos.x,this.pos.y);
	this.theBody = world.CreateBody(this.bodyDef);
	this.theBody.CreateFixture(this.fixDef);
	this.theBody.SetUserData("CannonBody");
	
	
	
	
	this.fixDefRotationPoint = new B2FixtureDef();
	this.bodyDefRotationPoint = new B2BodyDef();
	this.bodyDefRotationPoint.position.x = 15;
	this.bodyDefRotationPoint.position.y = 1.5;
	this.bodyDefRotationPoint.type = B2Body.b2_dynamicBody;
		 
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
		 
	//this.fixDefCircle.density = 1.0;
	//this.fixDefCircle.friction = 1;
	//this.fixDefCircle.restitution = 0.2;
	this.fixDefCircle.shape = new B2CircleShape(0.35);
	this.circle = world.CreateBody(this.bodyDefCircle);
	this.circle.CreateFixture(this.fixDefCircle);
	this.circle.SetUserData("gameball");
	
	
	this.WeldJoint = new B2WeldJointDef();
	this.WeldJoint.bodyA = this.RotationPoint;
	this.WeldJoint.bodyB = this.theBody;
	this.WeldJoint.localAnchorA.Set(2,0);
	world.CreateJoint(this.WeldJoint);
	
	this.RevJoint2 = new B2RevoluteJointDef();
	this.RevJoint2.bodyA = this.RotationPoint;
	this.RevJoint2.bodyB = this.circle;
	this.RevJoint2.localAnchorA.Set(4,0);
	
	
	this.jointJohn = world.CreateJoint(this.RevJoint2);
	var angle = 95*this.DEGTORAD;
	var angle2 = 90* this.RADTODEG;
	//this.theBody.SetAngle(angle);
	this.RotationPoint.SetAngle(angle);
	//this.circle.SetAngle(angle);
}

Cannon.prototype.Update = function()
{
this.RotationPoint.SetLinearVelocity(new B2Vec2(0,-1));
	if (this.reset == true)
		{
			this.ResetBall();
		}
	if(this.shoot == true)
		{
			//if (this.RevJoint2 != null) 
			//{
				//world.DestroyJoint(this.RevJoint2);
				this.RevJoint2=null;
				world.DestroyJoint(this.jointJohn);
				var bodyAngle = this.RotationPoint.GetAngle();
				bodyAngle = bodyAngle-.1;

				
				this.RotateVector(this.RotationPoint.GetPosition(), bodyAngle);
				
			//}
		}
		if (this.MoveLeft == true)
			{
				this.RotationPoint.SetAngularVelocity(1);
				console.log("Left");
			}
		
		else if (this.MoveRight == true)
			{
				this.RotationPoint.SetAngularVelocity(-1);
				console.log("Right");
			}
		else{this.RotationPoint.SetAngularVelocity(0);}
}

Cannon.prototype.RotateVector = function (vectorToRotate, angleInRadians) 
{
		var rotationMatrix = B2Mat22.FromAngle(angleInRadians);
		var newVec = vectorToRotate.Copy();
		newVec.MulM(rotationMatrix);
		
		this.circle.SetLinearVelocity(new B2Vec2(newVec.x,newVec.y));
};


Cannon.prototype.ResetBall = function()
{
	if (this.RevJoint2 == null)
	{
	this.RevJoint2 = new B2RevoluteJointDef();
	this.RevJoint2.bodyA = this.theBody;
	this.RevJoint2.bodyB = this.circle;
	this.RevJoint2.localAnchorA.Set(2,0);
	
	
	this.jointJohn = world.CreateJoint(this.RevJoint2);
	
	this.reset = false;
	}
}

Cannon.prototype.DestroyCannon = function()
{
	world.DestroyBody(this.theBody);
	world.DestroyBody(this.circle);
	world.DestroyBody(this.RotationPoint);
}





/*Cannon.prototype.AngleToVector = function(angle)
{
   // var X = Math.Sin(angle);
    //var Y = Math.Cos(angle);
	var rotationMatrix = B2Mat22.FromAngle(angle);
	rotationMatrix.x = rotationMatrix.x*5;
	rotationMatrix.y = rotationMatrix.y*5;
	this.circle.ApplyImpulse(new B2Vec2(rotationMatrix.x,rotationMatrix.y),this.theBody.GetWorldCenter()  );
	
}*/



// b2Vec2 rad2vec(float r, float m = 1) {
   // return b2Vec2(cos(r),sin(r))*m;
// }
// b2Vec2 deg2vec(float r, float m = 1) {
   // return rad2vec(r*0.017453292519943295769236907684886f,m);
// }
// float vec2rad(b2Vec2 v) {
   // return atan2(v.y,v.x);
// }
// float vec2deg(b2Vec2 v) {
   // return vec2rad(v)*57.295779513082320876798154814105f;
// }

/*Vector2 AngleToVector(float angle)
{
    return new Vector2((float)Math.Cos(angle), (float)Math.Sin(angle));
}

float VectorToAngle(Vector2 vector)
{
    return (float)Math.Atan2(vector.Y, vector.X);
}*/





/*bool SetTransform(const b2Vec2& position, float32 angle);
const b2Transform& GetTransform() const;
const b2Vec2& GetPosition() const;
float32 GetAngle() const;*/