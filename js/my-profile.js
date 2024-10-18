

const btnGuardar= document.getElementsByClassName("userbtn"); // boton guarda cambios definidos en el perfil del usuario.
const htmlProInfo= document.getElementById("htmlProInfo"); // agrege id en la etiqueta html del archivo de product-info.html
const htmlProfile= document.getElementById("htmlProfile");
let checkbox= document.getElementById("checkbox");
let modo;
let darkmode= localStorage.setItem("mode","darkmode")
const themeSwitch= document.getElementById("checkbox")
   
const enableDarkmode= () =>{
// document.body.classList.add("darkmode")
htmlProfile.classList.add("darkmode")
localStorage.setItem("darkmode","active")
}

const disableDarkmode= () => {
    htmlProfile.classList.remove("darkmode")
    localStorage.setItem("darkmode", null)
}
if(darkmode==="active") {
    enableDarkmode()
}
 themeSwitch.addEventListener("change", ()=>{    //NO OLVIDAR agregar addevent al btnGuardar
  darkmode=localStorage.getItem("darkmode")
  darkmode!=="active"? enableDarkmode() : disableDarkmode() //zzz? xxx : xxy same sintax if(zzz){xxx} else{xxy}
 });

/*Cargar la preferencia del usuario al iniciar
document.addEventListener("DOMContentLoaded", () => {
    const userPref = localStorage.getItem("userPref");
    if (userPref) {
        htmlProInfo.setAttribute("data-bs-theme", userPref);
        checkbox.checked = userPref === "dark"; // Sincronizar el estado del checkbox
    }
}); */

/*Escuchar el cambio en el checkbox
checkbox.addEventListener("change", () => {
    //alert("Entro");
   if (checkbox.checked) {
        htmlProfile.setAttribute("data-bs-theme","dark" );
    } else {
       htmlProfile.setAttribute("data-bs-theme","light" );
    }
   /* 
    // Cambiar el atributo del tema
    htmlProInfo.setAttribute("data-bs-theme", modo);
    
    // Guardar la preferencia en localStorage
    localStorage.setItem("userPref", modo);
    console.log(localStorage); 
});*/


