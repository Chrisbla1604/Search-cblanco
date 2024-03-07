
//let render_json ="";
//let render_xml="";
//let render_final="";


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
     // render_json = Proccesing_data_json(body_json);
      //Load_plantilla_final(render_json);}
      Load_plantilla_final(Proccesing_data_json(body_json));
    })  
  }
  return response_json;
})

  /*if(response_json.ok)
  {
    console.log(`HTTP Json Request Exitoso: ${response_json.status}`);
  }
  return response_json.json();
 })*/

 /*.then(result_json => {
   
   render_json = Proccesing_data_json(result_json);

   Load_plantilla_final(render_json);

 })*/
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
      Load_plantilla_final(Proccesing_data_xml(body_xml));
    })
    return response_xml;
  }

 /* if(response_xml.ok)
  {
    console.log(`HTTP XML  Request Exitoso: ${response_xml.status}`);
  }
  return response_xml.text();
 })
 .then(result_text => {

   let result_xml = (new DOMParser()).parseFromString(result_text, 'application/xml');
 
   render_xml =  Proccesing_data_xml(result_xml); 
   Load_plantilla_final(render_xml);*/
   
 
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
   </div>`

    plantilla_json = plantilla_json + plantilla;
  }
    return plantilla_json;
}


let Proccesing_data_xml = (data_xml) =>{

  let plantilla_xml="";
  let arreglo_tagProduct = [];

  console.log("Listo para procesar el XML");

  let array_products= data_xml.getElementsByTagName("product");


  for(let i=0 ; i<array_products.length ; i++)
  {
    let num_product = array_products[i];
    let names = array_products[i].getElementsByTagName("name");
    let name= names[0].innerHTML;

    let sources = array_products[i].getElementsByTagName("src");
    let src= sources[0].innerHTML;

    let types = array_products[i].getElementsByTagName("type");
    let type= types[0].innerHTML;

    let prices = array_products[i].getElementsByTagName("price");
    let price= prices[0].innerHTML;

    /*console.log(name);
    console.log(src);
    console.log(type);
    console.log(price);*/

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

    plantilla_xml = plantilla_xml + plantilla;
  } 
  return plantilla_xml;
}


let Load_plantilla_final = (plantilla) =>{

  //render_final = render_final + plantilla;

  let class_rows = document.getElementsByClassName("row");
 
  let class_row = class_rows[3];

  class_row.innerHTML=  class_rows[3].innerHTML + plantilla;

  console.log("Cargando la plantilla para renderizar el HTML....");

  //console.log(render_final);

}

//Load_plantilla_final(innerHTML_json);

/*function renderizado() {
  
  let render = "";
  
  let promise = new Promise( (resolve) => {
    setTimeout(() => {

      render = render_json;
      
      resolve(render);

    }, 5000);
  })
  
  return promise;
}

renderizado()
.then(render_final => {console.log(render_final)});*/

