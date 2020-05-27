package com.vm.project;

import com.microsoft.azure.management.Azure;
import com.microsoft.azure.management.compute.KnownLinuxVirtualMachineImage;
import com.microsoft.azure.management.compute.KnownWindowsVirtualMachineImage;
import com.microsoft.azure.management.compute.AvailabilitySet;
import com.microsoft.azure.management.compute.AvailabilitySetSkuTypes;
import com.microsoft.azure.management.compute.CachingTypes;
import com.microsoft.azure.management.compute.InstanceViewStatus;
import com.microsoft.azure.management.compute.DiskInstanceView;
import com.microsoft.azure.management.compute.VirtualMachine;
import com.microsoft.azure.management.compute.VirtualMachineSizeTypes;
import com.microsoft.azure.management.network.PublicIPAddress;
import com.microsoft.azure.management.network.Network;
import com.microsoft.azure.management.network.NetworkInterface;
import com.microsoft.azure.management.resources.ResourceGroup;
import com.microsoft.azure.management.resources.fluentcore.arm.Region;
import com.microsoft.azure.management.appservice.WebApp;
import com.microsoft.azure.management.storage.StorageAccount;
import com.microsoft.azure.management.storage.SkuName;
import com.microsoft.azure.management.storage.StorageAccountKey;
import com.microsoft.azure.management.sql.SqlDatabase;
import com.microsoft.azure.management.sql.SqlServer;
import com.microsoft.azure.management.resources.fluentcore.arm.Region;
import com.microsoft.azure.management.resources.fluentcore.utils.SdkContext;
import com.microsoft.azure.management.resources.fluentcore.model.Creatable;
import com.microsoft.rest.LogLevel;
import java.io.File;
import java.util.Scanner;

public class AzureApp {

    public static void main(String[] args) {

        final String userName = "testUser";
        final String sshKey = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDHhWCJWcTzerUzfkjEuc8M5O21sEpRp6FTCxYEojPrkTDcP3RxDNURO7jqVr6HsPtiunBqgR/SKIiJTmmpLhht3wKE6Fd2NwTCa2Fcfj24ZO9tc9Y0QE/HLaATBklWFRvDALdMuV76x+jCS/mEEN6LPChoeEkF8jP5uzlKpA8x/RJlrrR+SIAT+BnV+CmBmiqlR5o6jZV62KTIBx237pK/xkjSuM8/hrnMFPVUoJtsajj2UJsj82cbZ65u1pop5T9BS0FDdiqBYQlWL6k6s7ZBvyW9K7clhRrqC/m/P5pEYiP/HNiA8rAuv9dgzuGDbFLalzK0DvZLVlPJxbcc32cIZ/r0Kq5HwE6h0nQhIMO3g/cR+RFIHMhzeEb714FDJP3uVIOO5SGa3brp5cb/fISL6BiuuQNQIKZ7JaMYAFobXpH+WUiT25SNPM4Rba0fXwG5fDXlN3i8DdER6BRbnRyStoJnZByJstC1T4Eqt/NWzCCejz1jxngq75mc4Zp5VvXMaQs/YjfiKTZ2ip6IZTuEEuTWInii17R5pC3Xt9Nv1HjgyC3jwSqjO89iTa89UCGxqQkqRddEViv7SG/0a4l0/InYA5k1XxC0BCplZEUn6uy8kZ2NnZerbLFlZmTeprpP7ahskuOpCuFkKKiQdOwXzKTZsKRfA+l1Yl2aiix0zQ== tonem@DESKTOP-SK2G7C0";

        try {

            // use the properties file with the service principal information to authenticate
            // change the name of the environment variable if you used a different name in the previous step
            final File credFile = new File("C:\\Users\\tonem\\azureauth.properties");
            Azure azure = Azure.configure()
                    .withLogLevel(LogLevel.BASIC)
                    .authenticate(credFile)
                    .withDefaultSubscription();
            //리소스 그룹 생성
            ResourceGroup resourceGroup = azure.resourceGroups()
            	    .define("testResourceGroup")
            	    .withRegion(Region.US_EAST)
            	    .create();
            
            //가용성 집합 생성
            AvailabilitySet availabilitySet = azure.availabilitySets()
            	    .define("testAvailableSet")
            	    .withRegion(Region.US_EAST)
            	    .withExistingResourceGroup("testResourceGroup")
            	    .withSku(AvailabilitySetSkuTypes.MANAGED)
            	    .create();
            
            //공용 IP 생성. 가상머신과 통신해야 함.
            PublicIPAddress publicIPAddress = azure.publicIPAddresses()
            	    .define("testPublicIP")
            	    .withRegion(Region.US_EAST)
            	    .withExistingResourceGroup("testResourceGroup")
            	    .withDynamicIP()
            	    .create();
            
            //가상 네트워크 생성
            Network network = azure.networks()
            	    .define("testVN")
            	    .withRegion(Region.US_EAST)
            	    .withExistingResourceGroup("testResourceGroup")
            	    .withAddressSpace("10.0.0.0/16")
            	    .withSubnet("testSubnet","10.0.0.0/24")
            	    .create();
            
            //네트워크 인터페이스 생성. 가상 머신이 가상 네트워크에서 통신할 때 필요함.
            NetworkInterface networkInterface = azure.networkInterfaces()
            	    .define("testNIC")
            	    .withRegion(Region.US_EAST)
            	    .withExistingResourceGroup("testResourceGroup")
            	    .withExistingPrimaryNetwork(network)
            	    .withSubnet("testSubnet")
            	    .withPrimaryPrivateIPAddressDynamic()
            	    .withExistingPrimaryPublicIPAddress(publicIPAddress)
            	    .create();
            
            VirtualMachine virtualMachine = azure.virtualMachines()
            	    .define("testVM")
            	    .withRegion(Region.US_EAST)
            	    .withExistingResourceGroup("testResourceGroup")
            	    .withExistingPrimaryNetworkInterface(networkInterface)
            	    .withLatestWindowsImage("MicrosoftWindowsServer", "WindowsServer", "2012-R2-Datacenter")
            	    .withAdminUsername("azureuser")
            	    .withAdminPassword("Azure12345678")
            	    .withComputerName("testVM")
            	    .withExistingAvailabilitySet(availabilitySet)
            	    .withSize(VirtualMachineSizeTypes.STANDARD_D3_V2)
            	    .create();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
    }
}
