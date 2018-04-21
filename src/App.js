import React, { Component } from 'react';
import './App.css';
import { XYFrame, curveCardinal } from 'semiotic';
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
    // let CompaniesRedunduntArray = [];

    const companies = await Axios.get('https://api.iextrading.com/1.0/ref-data/symbols');
    const CompaniesNameFiltered = await companies.data.filter(
      company => company.name
      //eleminate companies with no names
    )
    
  //   let prev ='';
  //   for ( let [index, company] of CompaniesNameFiltered.entries()){
  //     //collecting redundunt companies
  //     if(prev.split(' ')[0] === company.name.split(' ')[0]){
  //       CompaniesRedunduntArray.push(index);
  //     }
  //    prev = company.name;
  // }

  // for(let index of CompaniesRedunduntArray){
  //   CompaniesNameFiltered.splice(CompaniesRedunduntArray[index]-index,1);
  // }


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
    .then(company=>company.data).catch(err=> console.log(err));
    const chosenQuarter = await Axios.get(`https://api.iextrading.com/1.0/stock/${company.symbol}/earnings`)
    .then(company=>company.data.earnings).catch(err=> console.log(err));


    for(let [index,stock] of chosenStocks.entries()){
      stock.week=index+1;
    }
    for(let [index,stock] of chosenQuarter.entries()){
      stock.week=index+1;
    }


    const FrameDataStockes=[{
      Name:"Stocks",
      coordinates:chosenStocks
    }];

    const FrameDataEPS = [{
      Name:"Stocks",
      coordinates:chosenQuarter
    }];
    
    if(this.state.FrameDataStockes){
      const two = [
        this.state.FrameDataStockes[0],
        {Name:"Stocks",
        coordinates:chosenStocks}
      ]
      console.log(two);
    this.setState({FrameDataStockes:two});
    }
    else{
      this.setState({FrameDataStockes});
    }

    if(!chosenQuarter[0].actualEPS){
      this.setState({FrameDataEPS});
    }
    if(companiesSelection){
      this.setState({companiesSelection:false});
    }
  }
  
work(){
  this.setState({ FrameDataStockes:undefined});
  this.setState({companiesSelection:true});

}

  render() {
    const {FrameDataStockes,FrameDataEPS} = this.state;
    
    return (
      <div className="App">
          <header>
            <h1>Fynn-C</h1>
            <nav>
              <ul>
                <li onClick={()=>this.setState({companiesSelection:true})}>Choose a company to view stocks</li>
                {this.state.company && <li onClick={()=>this.work()}>reset</li> }
                {this.state.company && <li onClick={()=>this.setState({companiesSelection:true})} >{`compare with  >`}</li>}
              </ul>
              </nav>
          </header>
         { this.state.companiesSelection && <Companies
          companies={this.state.companies}
          companyChooser={this.choosingCompany}
          />}
          {!this.state.companiesSelection && <div className="info">
            <img src={this.state.company.logo} alt="company logo"></img>
            <h3>{this.state.company.name}</h3>
          </div>}
         { !this.state.companiesSelection&& <XYFrame
            title={`closing in the past 3 weeks`}
            size={[900, 600]}
            lines={FrameDataStockes}
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
            title={`EPS in the last year`}
            size={[900, 600]}
            lines={FrameDataEPS}
            xAccessor={"week"}
            yAccessor={"actualEPS"}
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

          { !this.state.companiesSelection && <XYFrame
            title={`opening in the last 3 weeks`}
            size={[900, 600]}
            lines={FrameDataStockes}
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
