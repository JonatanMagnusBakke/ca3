/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Api;

import Entities.Facade;
import Entities.User;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import exceptions.AuthenticationException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * REST Web Service
 *
 * @author ezl
 */
@Path("login")
public class LoginEndpointResource
{
    public static final int TOKEN_EXPIRE_TIME = 1000 * 60 * 30; //30 min
    public LoginEndpointResource()
    {
    }

    /**
     * Retrieves representation of an instance of Api.LoginEndpointResource
     * @return an instance of java.lang.String
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(String jsonString) throws AuthenticationException
    {
        JsonObject json = new JsonParser().parse(jsonString).getAsJsonObject();
        String username = json.get("username").getAsString();
        String password = json.get("password").getAsString();
        try {
            User user = Facade.getInstance().getVeryfiedUser(username, password);
            String token = createToken(username, user.getRolesAsStrings());
            JsonObject responseJson = new JsonObject();
            responseJson.addProperty("username", username);
            responseJson.addProperty("token", token);
            return Response.ok(new Gson().toJson(responseJson)).build();

        } catch (Exception  ex) {
            if(ex instanceof AuthenticationException){
                throw (AuthenticationException)ex;
            }
        }
        throw new AuthenticationException("Invalid username or password! Please try again");
    }
    
    private String createToken(String userName, List<String> roles) //throws JOSEException 
    {           
           return  "In this exercise you must create a valid token, for Authenticated users";
    }
}
