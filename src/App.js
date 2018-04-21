import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { XYFrame, OrdinalFrame,curveCardinal,colorHash,scaleTime } from 'semiotic';
import { curveBasis, curveMonotoneX  } from 'd3-shape';
import Axios from 'axios';
import Companies from './Companies';



class App extends Component {
  

  constructor(props){
    super(props);  
    this.choosingCompany= this.choosingCompany.bind(this);
    this.state= {
      companiesSelection:true,
      
    }

  }
  async componentWillMount(){
    let CompaniesRedunduntArray = [];

    const companies = await Axios.get('https://api.iextrading.com/1.0/ref-data/symbols');
    const CompaniesNameFiltered = await companies.data.filter(
      company => company.name
      //eleminate companies with no names
    )
    
    let prev ='';
    for ( let [index, company] of CompaniesNameFiltered.entries()){
      //collecting redundunt companies
      if(prev.split(' ')[0] === company.name.split(' ')[0]){
        CompaniesRedunduntArray.push(index);
      }
     prev = company.name;
  }

  for(let index of CompaniesRedunduntArray){
    CompaniesNameFiltered.splice(CompaniesRedunduntArray[index]-index,1);
  }


      console.log(CompaniesNameFiltered);
    const CompaniesData = CompaniesNameFiltered.map(
      company => Object.assign({}, {name:company.name, symbol:company.symbol,
         logo:`https://storage.googleapis.com/iex/api/logos/${company.symbol}.png`})
    )
    this.setState({companies:CompaniesData});
    
  }

  
  async choosingCompany(company){
    const {companiesSelection}=this.state;
    this.setState({company});
    const chosenStocks = await Axios.get(`https://api.iextrading.com/1.0/stock/${company.symbol}/chart/1m`)
    .then(company=>company.data);
    for(let [index,stock] of chosenStocks.entries()){
      stock.week=index+1;
    }
    const FrameData=[{
      Name:"Stocks",
      coordinates:chosenStocks
    }]
      
    this.setState({FrameData})
    if(companiesSelection){
      this.setState({companiesSelection:false});
    }
  }
  


  render() {
    const FrameData = this.state.FrameData;
    return (
      <div className="App">
          <header>
            <h1>Fynn-C</h1>
            <nav>
              <ul>
                <li>Company stocks</li>
                <li>two companies comparision</li>
                <li>world wide stocks</li>
              </ul>
              </nav>
          </header>
         { this.state.companiesSelection && <Companies
          companies={this.state.companies}
          companyChooser={this.choosingCompany}
          />}
          {!this.state.companiesSelection && <div className="info">
            <img src={this.state.company.logo}></img>
            <h3>{this.state.company.name}</h3>
          </div>}
         { !this.state.companiesSelection&& <XYFrame
            title={`closing in the past 3 weeks`}
            size={[900, 600]}
            lines={FrameData}
            xAccessor={"week"}
            yAccessor={"close"}
            lineStyle={{ stroke: "#00f2ce" }}
            lineType={{ type: "line", interpolator: curveCardinal }}
            lineRenderMode={"sketchy"}
            showLinePoints={true}
            pointStyle={{ fill: "red" }}
            hoverAnnotation={true}
            margin={{ left: 280, bottom: 50, right: 10, top: 40 }}
            axes={[
              {
                orient: "left"
              },
              {
                orient: "bottom"
              }
            ]}
          />}

          { !this.state.companiesSelection&& <XYFrame
            title={`opening in the last 3 weeks`}
            size={[900, 600]}
            lines={FrameData}
            xAccessor={"week"}
            yAccessor={"open"}
            lineStyle={{ stroke: "#00f2ce" }}
            lineType={{ type: "line", interpolator: curveCardinal }}
            lineRenderMode={"sketchy"}
            showLinePoints={true}
            pointStyle={{ fill: "red" }}
            hoverAnnotation={true}
            margin={{ left: 280, bottom: 50, right: 10, top: 40 }}
            axes={[
              {
                orient: "left"
              },
              {
                orient: "bottom"
              }
            ]}
          />}
      </div>
    );
  }
}

export default App;
