package utils;

import entity.Role;
import entity.User;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import org.mindrot.jbcrypt.BCrypt;


public class SetupTestUsers {
  
  public static void main(String[] args) {
    
    EntityManager em = Persistence.createEntityManagerFactory("persistence").createEntityManager();
     em.getTransaction().begin();
          Role userRole = new Role("user");
          Role adminRole = new Role("admin");
          User user = new User("user", BCrypt.hashpw("test", "$2a$15$.m2mB5HEeJtdkHBAnksUku"));
          user.addRole(userRole);
          User admin = new User("admin", BCrypt.hashpw("test", "$2a$15$.m2mB5HEeJtdkHBAnksUku"));
          admin.addRole(adminRole);
          User both = new User("user_admin", BCrypt.hashpw("test", "$2a$15$.m2mB5HEeJtdkHBAnksUku"));
          both.addRole(userRole);
          both.addRole(adminRole);
          em.persist(userRole);
          em.persist(adminRole);
          em.persist(user);
          em.persist(admin);
          em.persist(both);
          em.getTransaction().commit();
          System.out.println("PW: "+user.getUserPass());
          System.out.println("Testing user with OK password: "+user.verifyPassword("test"));
          System.out.println("Testing user with wrong password: "+user.verifyPassword("test1"));
          System.out.println("Created TEST Users");
    
  }
        
}
