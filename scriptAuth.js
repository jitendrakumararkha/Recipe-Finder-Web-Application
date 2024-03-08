const Registration = () => {
  const name = document.querySelector('.nameuser').value;
  const email = document.querySelector('.emailuser').value;
  const password = document.querySelector('.passwordUser').value;

  const Users =JSON.parse(localStorage.getItem('Users'))||{}; 

   if(Users.hasOwnProperty(email)){
     alert('User already exists');
     return ;
   }
   Users[email]={password:password,name:name};
  localStorage.setItem("Users",JSON.stringify(Users));
 // console.log(JSON.stringify(userData));
  alert("Registration Successfull");
  localStorage.setItem('currUser',name);
  window.location.href="/Ingredient.html";
}

const LoginCheck = () => {
  const email = document.querySelector('#emailuser').value;
  const password = document.querySelector('#passwordUser').value;
  let  Users = JSON.parse(localStorage.getItem('Users'));
 
  
 // console.log(JSON.parse(storedUserData));
 if(Users.hasOwnProperty(email)&& Users[email].password===password){
    
     alert('Login successfull!')
      localStorage.setItem('currUser',Users[email].name);
     window.location.href="/Ingredient.html";
    
 }else{
   alert('Invalid useremail or password')
   window.location.href="/Login.html";
 }
    
}







