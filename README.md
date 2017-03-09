# spa-angular2-dotnet-auth
SPA Boilerplate for Angular2 with ASP.NET Core

The purpose of this repository is to document the steps involved in building a 'Single Page Application' using Angular2 and ASP.NET. This project uses the latest versions of Angular2 and ASP.NET Core.

-It is designed to be deployed to an IIS Server with Windows OS. It uses the full .NET framework.
-The project uses ASP.NET Identity. The user 'store' has been setup not to use the default EntityFramework implementation however. This allows you to plugin your own method for authentication (eg. Active Directory, External System, etc.)
-The backend API is secured by default. Users must login to access data.
-Any POST/PUT/DELETE calls to the backend check the Anti-forgery token to prevent CSRF.
-The frontend has bootstrap 4 with ng-bootstrap (no JQuery). Bootstrap is brought in via the SCSS source to allow overriding of styles, customisation without forking the code.
-Angular2 uses the Angular2 CLI. This avoids us having to use webpack directly, simplifying the development & build processes.
-The frontend uses Angular2 routing, SASS for CSS preprocessor.

##Getting Started

-Make sure you have .NET Core tooling installed, Visual Studio 2015 Update 3, VS Code, Node.JS, Angular CLI
-Fork the code and clone down to your machine. 
-Open up UtilityDelta.Backend in VS and run it. Check that your browser opens http://localhost:54216/
-Open up the utilitydelta-frontend folder in VS Code. Go to the terminal (Ctrl+~) and type 'npm start'. 
-Open up http://localhost:4200 and login

#Debugging the Frontend From VS Code
Install the 'Debugger for Chrome' extension for VS Code. Add the following to the target for the shortcut to open the Chrome browser:

 --remote-debugging-port=9222
 
 Run 'npm start' to start the server. Open up Google Chrome, navigate to the site: 
 
 http://localhost:4200/
 
 You can now hit F5 in VS code and it should hit your breakpoints in *.ts files.
