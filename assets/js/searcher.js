

let loadProduct = () => {

    let url_json = "https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.json";

    let url_xml= "https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.xml";


 let response_json =  fetch(url_json)

 .then(response_json =>{
  if(response_json.ok)
  {
    console.log(`HTTP Json Request Exitoso: ${response_json.status}`);
  }
  return response_json.json();
 })

 .then(result_json => {
   
   console.log( result_json );
 
 })
 .catch(error => {

   console.log( error );

 });

     
 let response_xml =  fetch(url_xml)

 .then(response_xml => {

  if(response_xml.ok)
  {
    console.log(`HTTP XML  Request Exitoso: ${response_xml.status}`);
  }
  return response_xml.text();
 })
 .then(result_text => {

   let result_xml = (new DOMParser()).parseFromString(result_text, 'application/xml');
   
   console.log( result_xml );
 
 })
 .catch(error => {
   
   console.log( error );

 });

}

loadProduct();



