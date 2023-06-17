### allok-app
#"Mobile app. Way easier!"
This is free to use opensource app.

# Client - React Native
This app using WEB interface to interact with user

# Server - Django (GeoDjango)
This app using Python GeoDjango to process requests from Database and User

# DataSource - Python Script
This app using Python script to process data

# How To Use:
Open app, and program will search free parking lots around you in range, that you can choose.
Programm will automatically count free spaces and inform you about number of free lots. 

#Requirements
+ Python 3.9 or newer
+ Django
+ Requests
+ Django rest framework
+ JDK + SDK in Android Studio
+ XCode - if you want to build IOS version
  
#Client - build App.
  open project 'user-browser' in Android Studio / X code and build it.
  install app to your mobile device
  run the app
  
#Server - manage.py
  open project 'server' in your IDE and in file settings.py change:
  + DataBase settings to your PostGres DB.
  + ALLOWED_HOSTS to your IPv4 Address if you want to run locally or your site domain
  + CORS_WHITELIST to hosts that you want to allow
  then open terminal and run command to create tables in your db 
  `python manage.py makemigrations`
  and this to apply migrations
  `python manage.py migrate`
  if all operation OK - you can run server using command:
  `python manage.py runserver`
  or
  `python manage.py 192.168.0.0:8000 # your port / domain`
  now you get the server
  
#DataSource - RunAndGo.
  open Python script in your IDE or Command prompt
  Specify variavle PORT to yours
  `PORT = '122.122.0.122'`
  install requirements:
  `pip install -r requirements.txt`
  run script
  `python scriptname.py`

