# corporate-angular2-dotnet-spa
Corporate/Intranet SPA with Angular2 with ASP.NET Core 

The purpose of this repository is to document the steps involved in building a 'Single Page Application' using Angular2 and ASP.NET. This project uses the latest versions of Angular2 and ASP.NET Core.

It is designed to be deployed to an IIS Server running on a corporate network (with Active Directory).

#Debugging the Frontend From VS Code
Install the 'Debugger for Chrome' extension for VS Code.
Add the following to the target for the shortcut to open the Chrome browser:
 --remote-debugging-port=9222
 Run 'npm start' to start the server.
 Open up Google Chrome, navigate to the site: http://localhost:4200/
 You can now hit F5 in VS code and it should hit your breakpoints in *.ts files.
