/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Api;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import Entities.User;
import Entities.UserFacade;
import exceptions.AuthenticationException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.MacProvider;
import java.io.UnsupportedEncodingException;
import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.crypto.spec.SecretKeySpec;
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
import javax.xml.bind.DatatypeConverter;

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
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(String jsonString) throws AuthenticationException {

        /*JsonObject json = new JsonParser().parse(jsonString).getAsJsonObject();
        String username = json.get("username").getAsString();
        String password = json.get("password").getAsString();*/
        String username = "EZL";
        String password = "Kode1234";

        //Todo refactor into facade
        try {
            User user = UserFacade.getInstance().getVeryfiedUser(username, password);
            String token = createToken(username, user.getRolesAsStrings());
            JsonObject responseJson = new JsonObject();
            responseJson.addProperty("username", username);
            responseJson.addProperty("token", token);
            return Response.ok(new Gson().toJson(responseJson)).build();

        } catch (Exception  ex) {
            if(ex instanceof AuthenticationException){
                throw (AuthenticationException)ex;
            }
            //Logger.getLogger(GenericExceptionMapper.class.getName()).log(Level.SEVERE, null, ex);
        }
        throw new AuthenticationException("Invalid username or password! Please try again");
    }
    
    @Path("/ttt")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String kkk(String jsonString)
    {
        JsonObject json = new JsonParser().parse(jsonString).getAsJsonObject();
        String jwt = json.get("jwt").getAsString();
        
        Claims claims = Jwts.parser()         
       .setSigningKey(DatatypeConverter.parseBase64Binary("secret"))
       .parseClaimsJws(jwt).getBody();
        
        return "Expiration: " + claims.getExpiration();
    }
    
    private String createToken(String userName, List<String> roles) throws UnsupportedEncodingException //throws JOSEException 
    {   
        //The JWT signature algorithm we will be using to sign the token
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        
        //We will sign our JWT with our ApiKey secret
            
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary("secret");
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        //Let's set the JWT Claims
        JwtBuilder builder = Jwts.builder().setId(userName)
                                    .setIssuedAt(now)
                                    .setSubject("REACT")
                                    .setIssuer("EMJ")
                                    .signWith(signatureAlgorithm, signingKey);
        if (TOKEN_EXPIRE_TIME >= 0) {
        long expMillis = nowMillis + TOKEN_EXPIRE_TIME;
        Date exp = new Date(expMillis);
        builder.setExpiration(exp);
    }

        //Builds the JWT and serializes it to a compact, URL-safe string
        return builder.compact();
    }
}
