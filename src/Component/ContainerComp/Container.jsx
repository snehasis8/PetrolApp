import React, { Component } from "react";
import Form from "../Form/Form";
import "./container.css";
import { ThemeProvider } from "@fluentui/react/lib/Theme";
import FuelSvg from "../../Assets/FuelSvg";
import MoneySvg from "../../Assets/MoneySvg.index";
import RefuelSvg from "../../Assets/RefuelStop.index";

export class Container extends Component {
  state = {
    totalCost: 0,
    show: false,
    petrolPrice:0,
    priceChange: "0.00",
    priceChangeSign: "-",
    productCurrency: "INR",
    productName: "Petrol",
    productPrice: "0.00",
    loading:false,
    error:false,
    resultObj : { 
      requiredFuel: 0,
      fullTankCost:0,
      numberOfRefuelingRequired:0
    },

  };

  componentDidMount() {
    this.fetchValue();
  }

  fetchValue = async () => { 
    this.setState({loading :true});
    let url2= "https://fuelprice-api-india.herokuapp.com/price/West-Bengal/HOOGHLY";
    try {
      let response = await fetch(url2);

      let data = await response.json();
  
    const {
      products = [
        {
          priceChange: "0.00",
          priceChangeSign: "-",
          productCurrency: "INR",
          productName: "Petrol",
          productPrice: "0.00",
        },
      ],
    } = data[0];
   
    const petrolInfo = products[0] || {};
    
    this.setState  (  {error:false , loading :false, ...petrolInfo});
    } catch (error) {
      console.log(error);
      this.setState({error:true , loading :false})
    }
  };
  handleCalculateValue = (result = 0 , resultObj ={}) => {
    // const {requiredFuel =0 ,fullTankCost =0, numberOfRefuelingRequired=0, } = resultObj
    const roundResult = parseFloat(result).toFixed(2);
    console.log(result , resultObj);
    this.setState({ totalCost: roundResult, show: true , resultObj : {...resultObj} });
  };

  render() {
    const {productPrice}=this.state;
    const darkTheme = {
      semanticColors: {
        bodyBackground: "black",
        bodyText: "white",
        inputBackground: "transparent",
        inputText: "white",
      },
    };
    const { show, totalCost ,error , loading , resultObj } = this.state;
    return (
      <ThemeProvider theme={darkTheme}>
        <div className="main-container">
          <div className="container-box slide-in-elliptic-top-fwd">
            <Form apiLoadError={error} productPrice={productPrice} handleCalculateValue={this.handleCalculateValue} />
          </div>
          <div className="main-mini-container">
            <div style={{animationDelay:'1s'}} className="container-box-mini slide-in-elliptic-top-fwd">
              <FuelSvg />
              <strong> {(!error && !loading ) && productPrice } </strong>
            </div>
            <div style={{animationDelay:'1.5s'}} className="container-box-mini slide-in-elliptic-top-fwd">
              <MoneySvg />
              <strong> {show && totalCost} </strong>
            </div>
            <div style={{animationDelay:'2s'}} className="container-box-mini slide-in-elliptic-top-fwd">
              <RefuelSvg />
               {show &&  
               <>
              <span> <strong> Full Tank Cost: </strong> {resultObj.fullTankCost} </span>
              <span> <strong> Number of Refueling Required: </strong> {resultObj.numberOfRefuelingRequired} </span>
              <span> <strong> Total Fuel required: </strong> {resultObj.requiredFuel} </span>
               </>
              } 
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default Container;

