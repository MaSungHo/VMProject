package com.vm.project;

import com.microsoft.azure.management.Azure;
import com.microsoft.azure.management.compute.VirtualMachine;
import com.microsoft.azure.management.compute.KnownLinuxVirtualMachineImage;
import com.microsoft.azure.management.compute.VirtualMachineSizeTypes;
import com.microsoft.azure.management.appservice.WebApp;
import com.microsoft.azure.management.storage.StorageAccount;
import com.microsoft.azure.management.storage.SkuName;
import com.microsoft.azure.management.storage.StorageAccountKey;
import com.microsoft.azure.management.sql.SqlDatabase;
import com.microsoft.azure.management.sql.SqlServer;
import com.microsoft.azure.management.resources.fluentcore.arm.Region;
import com.microsoft.azure.management.resources.fluentcore.utils.SdkContext;

import com.microsoft.rest.LogLevel;

import com.microsoft.azure.storage.*;
import com.microsoft.azure.storage.blob.*;

import java.io.File;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

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

            // create a Ubuntu virtual machine in a new resource group
            VirtualMachine linuxVM = azure.virtualMachines().define("testLinuxVM")
                    .withRegion(Region.US_EAST)
                    .withNewResourceGroup("sampleVmResourceGroup")
                    .withNewPrimaryNetwork("10.0.0.0/24")
                    .withPrimaryPrivateIPAddressDynamic()
                    .withoutPrimaryPublicIPAddress()
                    .withPopularLinuxImage(KnownLinuxVirtualMachineImage.CENTOS_7_2)
                    .withRootUsername(userName)
                    .withSsh(sshKey)
                    .withUnmanagedDisks()
                    .withSize(VirtualMachineSizeTypes.BASIC_A0)
                    .create();

        } catch (Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
    }
}
