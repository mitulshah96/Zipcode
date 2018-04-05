import { Component } from "@stencil/core";

@Component({
  tag: "my-component",
  styleUrl: "my-component.css",
  shadow: true
})
export class MyComponent {
  value: number;

  componentWillLoad() {
    let latitude;
    let longitude;
    let value;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        s => {
          latitude = s.coords.latitude;
          longitude = s.coords.longitude;
          fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDZucXE8bBIXvevAwToslk8SjNiMaMspog`
          )
            .then(results => {
              return results.json();
            })
            .then(data => {
              console.log("GET API________________-");
              console.log("Zip data",data);
              if(data){
                console.log(data);
                value = data.results[0].address_components[8].long_name;
               console.log(value)
              }
               
            });
            
        },
        err => {
          // eslint-disable-next-line
          console.log("err--->", err);
        }
      );
    }
    
    
  }
  

  render() {
     
    return <input type="text" id="zip" placeholder="400077" />;
  }
}
