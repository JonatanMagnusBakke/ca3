/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Entities;

import exceptions.AuthenticationException;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

/**
 *
 * @author ezl
 */
public class Facade
{
    EntityManagerFactory emf = Persistence.createEntityManagerFactory("persistence");
    private static final Facade instance = new Facade();
    
    private Facade(){}
    
    public static Facade getInstance(){
        return instance;
    }
    
    public User getVeryfiedUser(String username, String password) throws AuthenticationException
    {
        EntityManager em = emf.createEntityManager();
        User user;
        try {
            user = em.find(User.class, new Long(1));
            if (user == null || !user.verifyPassword(password)) {
                throw new AuthenticationException("Invalid user name or password");
            }
        } finally {
            em.close();
        }
        return user;
    }
    
    public static void main(String[] args) throws AuthenticationException
    {
        Facade facade = new Facade();
        User user = Facade.getInstance().getVeryfiedUser("EZL", "Kode1234");
        System.out.println("--" + user.getRolesAsStrings());
    }
}
