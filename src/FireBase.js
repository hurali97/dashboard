import firebase from 'firebase';


var config = {
    apiKey: "AIzaSyCLEtHY-5nBLvuRnjYqPuYfdA-R55KHNuQ",
    authDomain: "fir-practice-2935f.firebaseapp.com",
    databaseURL: "https://fir-practice-2935f.firebaseio.com",
    projectId: "fir-practice-2935f",
    storageBucket: "fir-practice-2935f.appspot.com",
    messagingSenderId: "976888751003"
  };
  firebase.initializeApp(config);
  
  var database =firebase.database();
  var ref;

 export  async function dataget(url){
 
 ref=database.ref(url);
 const resp=await ref.once('value')
    .then(function(snapshot){
      if(snapshot.val()){
        
 return (snapshot.val());
      }
     
    })
    .catch(err => err);
 const data=await resp;
 
return data;
 
 }


 export const firebasePostRequest=(name,url,text)=>{

 
  ref=database.ref(name);
      
  var data={
    paragraph:text.trim(),
  url:url.trim()
  }

  ref.set(data);

}

export const firebasePostAdminRequest=(name,email,password)=>{

 
  ref=database.ref(name);
      
  var data={
    email:email.trim(),
  password:password.trim()
  }

  ref.set(data);

}

