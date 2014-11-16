codename-tank
=============

The cannon mobile app is a hybrid app based on Cordova developed by [SINFO](http://sinfo.org).

For the front-end we are using AngularJS + Ionic Framework.

### Node Dependecies:
  1. Cordova <code>$ npm install -g cordova</code>
  2. Ionic-Cli <code>$ npm install -g ionic</code>
  3. Grunt-Cli <code>$ npm install -g grunt-cli</code>
  4. Bower <code>$ npm install -g bower</code>

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
  5. Install <code>cordova</code> plugins: <code>$ cordova plugins install</code>
  6. Add one or more supported mobile platforms <code>$ grunt platform:add:android</code>
  7. Launch app into your device <code>$ grunt run:android</code> or emulator <code>$ grunt emulate:ios</code>
  8. When developing, it's possible to run the app on your device or emulator and watch for local changes <code>$ grunt run:android --livereload</code>