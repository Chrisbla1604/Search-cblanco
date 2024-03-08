
let Json_procesado=[];

let Xml_procesado;

let coincidencia_json = 0;

let coincidencia_xml = 0;



let loadProduct = () => {

    let url_json = "https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.json";

    let url_xml= "https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.xml";

 let response_json =  fetch(url_json)

 .then(response_json =>{
   
  if(response_json.ok)
  {
    console.log(`HTTP Json Request Exitoso: ${response_json.status}`);
    let result_json = response_json.json()
    .then(body_json => {
      Json_procesado = body_json;
      Load_plantilla_final(Proccesing_data_json(body_json));
    })  
  }
  return response_json;
})

  
 .catch(error => {

  console.log("hola error");
  console.log( error );

 }); 


 
 let response_xml =  fetch(url_xml)

 .then(response_xml => {

  if(response_xml.ok){
    console.log(`HTTP XML  Request Exitoso: ${response_xml.status}`);
     let xml_text = response_xml.text()
    .then(result_xml => {
      let body_xml =(new DOMParser()).parseFromString(result_xml, 'application/xml');
      Xml_procesado = body_xml;
      Load_plantilla_final(Proccesing_data_xml(body_xml));
    })
    return response_xml;
  }

 })
 .catch(error => {
   
   console.log( error );

 });

}


loadProduct();



let Proccesing_data_json = (data_json) =>{

  let plantilla_json="";

  console.log("Listo para procesar el Json");


  for(let product of data_json)
  {

     let{name,price,src,type}=product; 

     let plantilla =`<div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
     <div class="card card-blog card-plain">
       <div class="card-header p-0 mt-n4 mx-3">
         <a class="d-block shadow-xl border-radius-xl">
           <img src="${src}" alt="${name}" class="img-fluid shadow border-radius-xl">
         </a>
       </div>
       <div class="card-body p-3">
         <p class="mb-0 text-sm">${type}</p>
         <a href="javascript:;">
           <h5>
             ${name}
           </h5>
         </a>
         <p class="mb-4 text-sm">
           <b>Price: </b> $ ${price}
         </p>
       </div>
     </div>
   </div>`;

    plantilla_json = plantilla_json + plantilla;
  }
    return plantilla_json;
}



let Proccesing_data_xml = (data_xml) =>{

  let plantilla_xml="";

  console.log("Listo para procesar el XML");

  let array_products= data_xml.getElementsByTagName("product");


  for(let i=0 ; i<array_products.length ; i++)
  {
    let names = array_products[i].getElementsByTagName("name");
    let name= names[0].innerHTML;

    let sources = array_products[i].getElementsByTagName("src");
    let src= sources[0].innerHTML;

    let types = array_products[i].getElementsByTagName("type");
    let type= types[0].innerHTML;

    let prices = array_products[i].getElementsByTagName("price");
    let price= prices[0].innerHTML;

    let plantilla =`<div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
     <div class="card card-blog card-plain">
       <div class="card-header p-0 mt-n4 mx-3">
         <a class="d-block shadow-xl border-radius-xl">
           <img src="${src}" alt="${name}" class="img-fluid shadow border-radius-xl">
         </a>
       </div>
       <div class="card-body p-3">
         <p class="mb-0 text-sm">${type}</p>
         <a href="javascript:;">
           <h5>
             ${name}
           </h5>
         </a>
         <p class="mb-4 text-sm">
           <b>Price: </b> $ ${price}
         </p>
       </div>
     </div>
   </div>`;

    plantilla_xml = plantilla_xml + plantilla;
  } 
  return plantilla_xml;
}



let Load_plantilla_final = (plantilla) =>{


  let class_rows = document.getElementsByClassName("row");
 
  let class_row = class_rows[3];

  class_row.innerHTML=  class_rows[3].innerHTML + plantilla;

  console.log("Cargando la plantilla para renderizar el HTML....");

}


let search_button = document.getElementById("filter");
let input_text = document.getElementById("text");

search_button.addEventListener('click', (event) => {

  coincidencia_json=0;
  coincidencia_xml=0;

  Filtrado_Json(input_text.value.trim(),Json_procesado);

  Filtrado_Render_Xml(input_text.value.trim(),Xml_procesado);

  if (coincidencia_json==0) 
  {
    if(coincidencia_xml==0) {
      console.log("No hubo coincidencia");

      let rows_index = document.getElementsByClassName("row");
      let row_index= rows_index[3];
      row_index.innerHTML =`<h4 style="text-align: center ; padding-bottom: 30px"> NO HUBO COINCIDENCIAS </h4>`;
    } 
  }
    
});



let Filtrado_Json = (input_text,Json_Format) =>{

  let dato_json_filter = Json_Format.filter(data_searched => (data_searched.name == input_text) || (data_searched.type == input_text));
  
  for(let element of dato_json_filter)
  {
     if ((element.name==input_text) || (element.type==input_text))
     {
        coincidencia_json = 1;
     }

  }
  console.log("Haciendo Filtrado Json...");

  Clean_Product_Area();

  Load_plantilla_final(Proccesing_data_json(dato_json_filter));
}



let Filtrado_Render_Xml = (input_text,Xml_Format) =>{


  let Xml_products = Xml_Format.getElementsByTagName("product");
  let plantilla_final="";

  console.log("Haciendo Filtrado Xml ...");

   for(let i=0 ; i<Xml_products.length ; i++)
  {
    let names = Xml_products[i].getElementsByTagName("name");
    let name = names[0].innerHTML;

    let sources = Xml_products[i].getElementsByTagName("src");
    let src= sources[0].innerHTML;

    let types = Xml_products[i].getElementsByTagName("type");
    let type= types[0].innerHTML;

    let prices = Xml_products[i].getElementsByTagName("price");
    let price= prices[0].innerHTML;
    
    if((input_text == name) || (input_text == type ) )
    { 
      
     let plantilla =`<div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
      <div class="card card-blog card-plain">
        <div class="card-header p-0 mt-n4 mx-3">
          <a class="d-block shadow-xl border-radius-xl">
            <img src="${src}" alt="${name}" class="img-fluid shadow border-radius-xl">
          </a>
        </div>
        <div class="card-body p-3">
          <p class="mb-0 text-sm">${type}</p>
          <a href="javascript:;">
            <h5>
              ${name}
            </h5>
          </a>
          <p class="mb-4 text-sm">
            <b>Price: </b> $ ${price}
          </p>
        </div>
      </div>
    </div>`

    plantilla_final = plantilla_final + plantilla;

    coincidencia_xml=1;
    }
}

Load_plantilla_final(plantilla_final); 

} 



let Clean_Product_Area = () =>{
 
  let class_rows = document.getElementsByClassName("row");
 
  let class_row = class_rows[3];

  class_row.innerHTML="";
}
  