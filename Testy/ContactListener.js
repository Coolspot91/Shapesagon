function ContactListener(mCanvas,mContext,mWorld, mBar)
{		
this.world = mWorld;
this.canvas = mCanvas;
this.context = mContext;
this.barrier = mBar;
	
var listener = new Box2D.Dynamics.b2ContactListener;
	  
	  listener.BeginContact = function(contact) 
	  {
		  // console.log(contact.GetFixtureA().GetBody().GetUserData());
		  if(contact.GetFixtureB().GetBody().GetUserData()=="platform" 
		        || contact.GetFixtureA().GetBody().GetUserData()=="platform")
		  {       	
			  if(contact.GetFixtureA().GetBody().GetUserData()== "wallLeft" 	
				  ||contact.GetFixtureB().GetBody().GetUserData()=="wallLeft")    	
			  {   		 
				  hitLeftWall = true;  
				 
			  }
			  
			  if(contact.GetFixtureA().GetBody().GetUserData()== "wallRight" 	
				  ||contact.GetFixtureB().GetBody().GetUserData()=="wallRight")    	
			  {   		 
				  hitLeftWall = false;  
				 
			  }
			  
			  if(contact.GetFixtureA().GetBody().GetUserData()== "ball" 	
				  ||contact.GetFixtureB().GetBody().GetUserData()=="ball")    	
			  {   		 
				  destroy = true;  
				 
			  }
			  
		  }
		  
		if(contact.GetFixtureA().GetBody().GetUserData()== "Barrier" 	
				  && contact.GetFixtureB().GetBody().GetUserData()=="ball")    	
		{   		 
			  
				mBar.alive = false;				
		}
	  }

	    
	  listener.EndContact = function(contact) 
	  {
		  // console.log(contact.GetFixtureA().GetBody().GetUserData());
		  if(contact.GetFixtureB().GetBody().GetUserData()=="platform" 
		        || contact.GetFixtureA().GetBody().GetUserData()=="platform")
		  {
			  if(contact.GetFixtureA().GetBody().GetUserData()== "ball" 	
				  ||contact.GetFixtureB().GetBody().GetUserData()=="ball")    	
			  {   		 
				  destroy = false;  
				 
			  }
		  }
	  }
	  
	this.world.SetContactListener(listener);
}