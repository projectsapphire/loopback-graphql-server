 //calls the check the ACLS on the model and return the access permission on method.
 function checkAccess({ accessToken, id, model, method, options, ctx }) {

     return new Promise((resolve, reject) => {
	     // ignore checking if does not enable auth
	     if (model.app.isAuthEnabled) {
		 if (!model.app.models.ACL) {
		     console.log('ACL has not been setup, skipping access check.')
		     resolve(true);
		 } else {
		     //               console.trace()
		     //               console.log("Access Token", accessToken)
		     //               console.log("ctx.req", ctx.req.query.access_token)
		     //               console.log("model", model)
		     //               console.log("options", options)
		     var app         = ctx.req.app;
		     var registry    = app.registry;
		     var AccessToken = registry.getModelByType('AccessToken');
		     AccessToken.findForRequest(ctx.req, options, function(err, accessToken) {
			console.log("found User Access Token", accessToken)
			model.checkAccess(accessToken, id, method, ctx,
					   ((err, allowed) => {
					       if (err)
						   reject(err);
					       else if (allowed)
						   resolve(allowed);
					       else
						   reject(`ACCESS_DENIED`);
					   }))
			});
		 }
	     } else {
		 resolve(true);
	     }
	 })

 }
 module.exports = checkAccess;