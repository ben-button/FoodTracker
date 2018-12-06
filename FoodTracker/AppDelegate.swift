//
//  AppDelegate.swift
//  FoodTracker
//
//  Created by Ben Evans on 05/12/2018.
//  Copyright © 2018 Button. All rights reserved.
//

import UIKit
import Button

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?


    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        
        // Debugging enabled (do not include in production)
        Button.debug.isLoggingEnabled = true
        
        // Replace app-xxxxxxxxxxxxxxxx with your App ID from the Button Dashboard https://app.usebutton.com
        Button.configure(applicationId: "app-7b5d900d4f03f457") { error in
            // Optional callback to inspect whether an error occurred while
            // creating or resuming a session. See also debug logging.
        }
        
        // Step 1 - Create a Purchase Path request
        let url = URL(string: "https://jet.com/product/Google-Smart-TV-Kit-Google-Home-Mini-and-Chromecast-3rd-Gen-Bundle/7bd2b616de9a46278326464a20e8f300?beaconId=0817204d-6901-4903-9102-2ed257ed8b14%2F2%2Fx~7bd2b616de9a46278326464a20e8f300&experienceId=26")!
        let request = PurchasePathRequest(url: url)
        
        // Optionally associate a unique token (e.g. campaign Id)
        // request.pubRef = "abc123"
        
        // Step 2 - Fetch a Purchase Path object
        Button.purchasePath.fetch(request: request) { purchasePath, error in
            
            // Step 3 - Start Purchase Path flow
            purchasePath?.start()
        }
        
        return true
    }

    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }

    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }


}

