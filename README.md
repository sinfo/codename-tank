codename-tank
=============
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/sinfo/codename-tank?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

The cannon mobile app is a hybrid app based on Cordova developed by [SINFO](http://sinfo.org).

For the front-end we are using AngularJS + Ionic Framework.

### Node Dependecies:
  1. Cordova <code>$ npm install -g cordova</code>
  2. Ionic-Cli <code>$ npm install -g ionic</code>
  3. Grunt-Cli <code>$ npm install -g grunt-cli</code>
  4. Bower <code>$ npm install -g bower</code>

### Ruby Dependecies:
  1. Sass <code>$ gem install sass</code>

### Android Dependecies:
  1. [Java SDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html)
  2. [Ant](http://ant.apache.org/bindownload.cgi)
  3. [Android SDK](https://developer.android.com/sdk/installing/index.html)

### iOS Dependecies:
  1. Xcode

### Installation:
  1. Clone the repo: <code>$ git clone git@github.com:sinfo/codename-tank.git</code>
  2. Enter the directory: <code>$ cd codename-tank</code>
  3. Install <code>npm</code> dependencies: <code>$ npm install</code>
  4. Install <code>bower</code> dependencies: <code>$ bower install</code>
  5. Add one or more supported mobile platforms <code>$ grunt platform:add:android</code> this will also install cordova plugins dependencies for each platform
  
###Note

Before running the app you must copy the database file ```assets/tank``` 

On **Android** you must copy it to ```platforms/android/assets``` 

On **iOS** you must copy it to the Resources directory and then Add it in to your Xcode Project. Right Click on the Resources directory, then click Add files.
  
### Launching app:
  1. Launch app into your device <code>$ grunt run:android</code> or emulator <code>$ grunt emulate:ios</code>
  2. When developing, it's possible to run the app on your device or emulator and watch for local changes <code>$ grunt run:android --livereload</code>
