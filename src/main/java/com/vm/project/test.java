package com.vm.project;

import org.libvirt.Connect;
import org.libvirt.LibvirtException;

import org.libvirt.*;
public class test {
    public static void main(String[] args) {
        Connect conn=null;
        try {
        	System.out.println("ssdsdsdsdsd");
        	conn = new Connect("test:///default", true);
        } catch (LibvirtException e) {
        	System.out.println("No way" + e);
        }
        /*
        try{
        	System.out.println("Hello");
            conn = new Connect("test:///default", true);
        } catch (LibvirtException e){
            System.out.println("exception caught:"+e);
            System.out.println(e.getError());
        }
        try{
            Domain testDomain=conn.domainLookupByName("test");
            System.out.println("Domain:" + testDomain.getName() + " id " +
                               testDomain.getID() + " running " +
                               testDomain.getOSType());
        } catch (LibvirtException e){
            System.out.println("exception caught:"+e);
            System.out.println(e.getError());
        } */
    	}
} 