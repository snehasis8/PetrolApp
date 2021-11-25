import React, { Component } from "react";
import { TextField, DefaultButton } from "@fluentui/react";
import "./Form.css";

export class Form extends Component {
  state = {
    result: "",
    bikeMileage: "",
    petrolPrice: "",
    tankCapacity: "",
    calculateHit: false,
  };

  render() {
    const { productPrice , apiLoadError } = this.props;
    const { bikeMileage, tankCapacity, totalKm, petrolPrice } = this.state;

    this.handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    };

    this.handleCalculate = () => {
      this.setState({calculateHit :true});
      let {
        petrolPrice=0 ,
        totalKm=0 ,
        bikeMileage=0 ,
        tankCapacity=0 ,
      } = this.state;
      if (!apiLoadError) {
        petrolPrice = productPrice
        
      }
      const result = parseFloat((totalKm / bikeMileage) * petrolPrice).toFixed(2);
      const fullTankCost = (tankCapacity * petrolPrice).toFixed(2);
      const requiredFuel = (result / petrolPrice).toFixed(2);
      const numberOfRefuelingRequired = (requiredFuel / tankCapacity).toFixed(0);
      const resultObj = {
        result: result,
        fullTankCost,
        numberOfRefuelingRequired,
        requiredFuel
      };
      debugger
      let errorObj={hasError: false};
     if(bikeMileage.length ===0){
        errorObj.bikeMileage ="Please enter BikeMilage";
        errorObj.hasError=true;
     }
     if(totalKm.length ===0){
      errorObj.totalKm ="Please enter Total Km"
      errorObj.hasError=true;
    }
    if (apiLoadError) {
      if(petrolPrice.length ===0){
        
        errorObj.petrolPrice ="Please enter Petrol Price"
        errorObj.hasError=true;
      }
    }
    
    if(tankCapacity.length===0){
      errorObj.tankCapacity="Please enter Tank Capacity"
      errorObj.hasError=true;
    }
   console.log(errorObj) ;
      this.setState({ result , errorObj });

if(errorObj.hasError ===false ) {





  this.props.handleCalculateValue(result, resultObj);
}
      

    };


    this.handleValidation = (value = "", name) => {
     
      let {errorObj ={}}=this.state;
     if(value !==""){
      
      errorObj[name]="";
      this.setState({ errorObj: {...errorObj}})
    
      return value<1 ? `Plesae enter correct ${name}` :"" ;
     }else{
       
      errorObj[name]="";
      this.setState({ errorObj: {...errorObj}})
     
      return ""
     }

    };
    return (
      <div>
        <div>
          {productPrice === "0.00" && (
            <TextField
              type="number"
              min="0"
              value={this.state.petrolPrice}
              name="petrolPrice"
              className="label-color"
              label="Petrol Price:"
              underlined
              borderless
              onChange={this.handleChange}
              required
              onGetErrorMessage={ ()=>this.handleValidation(petrolPrice , "petrolPrice")}
              invalid={!!this.state.errorObj?.petrolPrice}
              // description="Enter the Petrol Price for manual calculation"
            />
          )}
          <br />
          <TextField
            type="number"
            min="0"
            value={this.state.tankCapacity}
            name="tankCapacity"
            className="label-color"
            label="Tank Capacity:"
            underlined
            borderless
            onChange={this.handleChange}
            required
            onGetErrorMessage={ ()=>this.handleValidation(tankCapacity , "tankCapacity")}
            invalid={!!this.state.errorObj?.tankCapacity}
            // description="Total Distance want to cover"
          />
          <br />
          <TextField
            type="number"
            min="0"
            value={this.state.totalKm}
            name="totalKm"
            className="label-color"
            label="Total Kms:"
            underlined
            borderless
            onChange={this.handleChange}
            required
            onGetErrorMessage={ ()=>this.handleValidation(totalKm , "totalKm")}
            invalid={!!this.state.errorObj?.totalKm}
           
            // description="Total Distance want to cover"
          />
          <br />
          <TextField
            type="number"
            min="0"
            value={this.state.bikeMileage}
            name="bikeMileage"
            label="Bike Mileage:"
            underlined
            borderless
            className="label-color"
            onChange={this.handleChange}
            description="Enter your present Mileage Combination of City and Highway"
            required
            onGetErrorMessage={ ()=>this.handleValidation(bikeMileage , "bikeMileage")}
            invalid={!!this.state.errorObj?.bikeMileage}
          />
          <br />
        </div>
        <DefaultButton className="btn-position" onClick={this.handleCalculate}>
          Calculate
        </DefaultButton>
        <br />
      </div>
    );
  }
}

export default Form;
