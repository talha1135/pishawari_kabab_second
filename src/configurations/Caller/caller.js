export default class Caller{

  static callServer(route,requestType,params){
    serverPath="http://www.thecodetitan.com/api/";

    var body;

    
    var url;
    url=serverPath+route;
    if (requestType=="GET") {
      if(params!==null) url=url+'/'+params.join('/');
         //attach route and parameters as string with server url
    } else if (requestType=="POST") {
      console.log(url);
    } else if (requestType=="PUT") {
      console.log(url);
    } else {
      alert("Missing Request type or this request type is not allowed")
    }
    console.log("------------>",url);

    var myHeaders = new Headers();


    if(route === "LoginCustomer"){
      body = {
        email: params[0],
        password: params[1],
      };
    }
    if(route === "addCustomer"){
      body = {
        name: params[0],
        email: params[1],
        password: params[2],
        phone_number: params[3],
      };
    }
    if(route === "ChangeCustomerPassword"){
      body = {
        new_password: params[0],
        previous_password: params[1],
        id: params[2],
      };
    }



    if(
        route === "getAllBranches"||
        route === "getMenuItemList"||
        route === "getOfferedItems"||
        route === "detCategoriesList"||
        route === "ChangeCustomerPassword"||
        route === "addCustomer"||
        route === "getDeliveryPackages"||
        route === "LoginCustomer"
      )
    {
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append("Accept", "application/json");
    }
    
    

    console.log("Calling... " + url);
    if (requestType === "POST") {
      
      console.log(body);
      return fetch(url, {
        method: requestType,
        headers: myHeaders,

        body: JSON.stringify(body)
      })
      .then(response => {
        return response;
      })
      .catch(err => {
        console.log(err);
      });


    } else {
      console.log('calling',url);
      return fetch(url, {
        method: requestType,
        headers: myHeaders
      })
      .then(response => {
        return response;
      })
      .catch(err => {
        console.log(err);
      });  


    }

}}