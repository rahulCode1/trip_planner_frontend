# Trip planner

A full-stack ai powered trip planner, where you can generate trip, save trip, update trip, delete trip & view trip details.
Build with React frontend, Express/Node backend, MongoDB database and JWT-based authentication(Google OAuth2.0)

---
## Demo Link

[Live Demo](https://trip-planner-frontend-xd1n.vercel.app)

---

## Login

 **Login with google**

 ---
 ## Quick Start

 ```
 git clone https://github.com/rahulCode1/trip_planner_frontend.git
 cd trip_planner_frontend
 npm i 
 npm run dev # or `npm start`

 ```

 ---

 # Techonologies 
 - React JS
 - React Router
 - Node Js
 - Express
 - Mongodb
 - JWT 

 ## Demo Video
 Watch a walkthrough (3-4 minutes) of all the major features of this app: 
 [Loom Video]( https://drive.google.com/file/d/1e9mBKuIxwE1MBlAHeywZiEwfZrMBrp0c/view?usp=sharing)

 --- 
 

 ## Features 
 **Home**
 - Plan a trip by entring travel destination, budget & duration

 **My Trips**
- All saved trips

**Trip Details**
- View full trip details (Trip destination & more.)
- Can update trip
- Compare original & updated trip
- Save updated trip
- Delete trip
- Mark as complet trip

**Authentication**
- User sign in with google
- Protected routes for save trip, view saved trips, view trip details, update & delete trip


---

## API Reference

### **POST /api/travel-planner**<br>
Generate trip <br>
Sample Response: <br>
```
{ destination, duration, budget }
```

### **POST /api/save-trip**<br>
Save trip <br>
Sample Response: <br>
```
{_id, destination, best_time, top_attractions...}
```


### **GET /api/saved-trip** <br>
Get all saved trips <br>
Sample Response:<br>
```
[{_id, destination, best_time, top_attractions...}, ...]
```


### **GET /api/tripId/trip-details**<br>
Trip details <br>
Sample Response<br>
```
{_id, destination, best_time, top_attractions...}
```


### **POST /api/update-trip/:tripId**<br>
Generate new trip based on changes<br>
Sample Response: <br>
```
{ destination, duration, budget }
```


### **PATCH /api/save-updated-trip/:tripId**<br>
Save updated trip<br>
Sample Response<br>
```
{_id, destination, best_time, top_attractions...}
```

### **DELETE /api/:tripId** <br>
Delete trip<br>

### **PATCH /api/:tripId/mark-complete** <br>
Mark trip as complete<br>


### **GET /auth/google**<br>
Call google OAuth2.0 <br>

### **GET /auth/google/callback**<br>
Save user <br>
Generate JWT token<br>

### **GET /user/me** <br>
Verify JWT token

---

## Contact
For bugs or feature request, please reach out to rahul7497678@gmail.com
