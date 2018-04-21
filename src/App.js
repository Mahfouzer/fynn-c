import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { XYFrame, OrdinalFrame,curveCardinal,colorHash,scaleTime } from 'semiotic';
import { curveBasis, curveMonotoneX  } from 'd3-shape';
import Axios from 'axios';



class App extends Component {

  constructor(props){
    super(props);
    this.CompaniesBringer=this.CompaniesBringer.bind(this);
  
    this.state= {
      hhh:true,
      data:[
        {
          title: "The Fate of the Furious",
          studio: "Uni.",
          firstWeek: "2017-15",
          maxRank: 1,
          maxGross: 225764765,
          coordinates: [
            {week: 1,grossWeekly: 124896220,theaterCount: 4310,theaterAvg: 28978,date: "2017-04-14",rank: 1},
            {week: 2,grossWeekly: 48435355,theaterCount: 4329,theaterAvg: 11189,date: "2017-04-21",rank: 1},
            {week: 3,grossWeekly: 25275955,theaterCount: 4077,theaterAvg: 6200,date: "2017-04-28",rank: 1},
            {week: 4,grossWeekly: 11126400,theaterCount: 3595,theaterAvg: 3095,date: "2017-05-05",rank: 2},
            {week: 5,grossWeekly: 6976370,theaterCount: 3067,theaterAvg: 2275,date: "2017-05-12",rank: 4},
            {week: 6,grossWeekly: 4340570,theaterCount: 2287,theaterAvg: 1898,date: "2017-05-19",rank: 8},
            {week: 7,grossWeekly: 2267065,theaterCount: 1358,theaterAvg: 1669,date: "2017-05-26",rank: 11},
            {week: 8,grossWeekly: 746930,theaterCount: 593,theaterAvg: 1260,date: "2017-06-02",rank: 15},
            {week: 9,grossWeekly: 661010,theaterCount: 389,theaterAvg: 1699,date: "2017-06-09",rank: 16},
            {week: 10,grossWeekly: 35527005,theaterCount: 175,theaterAvg: 1869,date: "2017-06-16",rank: 24},
            {week: 11,grossWeekly: 237990,theaterCount: 159,theaterAvg: 1497,date: "2017-06-23",rank: 26},
            {week: 12,grossWeekly: 296470,theaterCount: 144,theaterAvg: 2059,date: "2017-06-30",rank: 23},
            {week: 13,grossWeekly: 17748525,theaterCount: 115,theaterAvg: 1543,date: "2017-07-07",rank: 25}
          ],
          type: "landslide"
        },
        {
          title: "Straight Outta Compton",
          studio: "Uni.",
          firstWeek: "2015-33",
          maxRank: 1,
          maxGross: 161058685,
          coordinates: [
            {week: 1,grossWeekly: 84723470,theaterCount: 2757,theaterAvg: 30730,date: "2015-08-14",rank: 1},
            {week: 2,grossWeekly: 36162705,theaterCount: 3025,theaterAvg: 11955,date: "2015-08-21",rank: 1},
            {week: 3,grossWeekly: 18049530,theaterCount: 3142,theaterAvg: 5745,date: "2015-08-28",rank: 1},
            {week: 4,grossWeekly: 12686895,theaterCount: 3094,theaterAvg: 4100,date: "2015-09-04",rank: 3},
            {week: 5,grossWeekly: 5328660,theaterCount: 2812,theaterAvg: 1895,date: "2015-09-11",rank: 6},
            {week: 6,grossWeekly: 2596870,theaterCount: 1938,theaterAvg: 1340,date: "2015-09-18",rank: 9},
            {week: 7,grossWeekly: 880290,theaterCount: 609,theaterAvg: 1445,date: "2015-09-25",rank: 16},
            {week: 8,grossWeekly: 338540,theaterCount: 281,theaterAvg: 1205,date: "2015-10-02",rank: 22},
            {week: 9,grossWeekly: 191170,theaterCount: 170,theaterAvg: 1125,date: "2015-10-09",rank: 31},
            {week: 10,grossWeekly: 100555,theaterCount: 113,theaterAvg: 890,date: "2015-10-16",rank: 38}
          ],
          type: "landslide"
        }
      ]
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

  CompaniesBringer(){
    if(!this.state.companies){return null}
    const reg = new RegExp('^[0-9]+$');
    return this.state.companies.map(company => <div key={company.symbol}><img src={logo}></img><p>{company.name.split(" ")[0]+" "+company.name.split(" ")[1]+" "+company.name.split(" ")[2]}</p></div>);
  }

  


  render() {
    const movies = this.state.data;
    return (
      <div className="App">
      <section className="companies-data">
          <h1>Companies</h1>
          {this.CompaniesBringer()}
        </section>
         <XYFrame
            title={"Two Movies"}
            size={[700, 400]}
            lines={movies}
            xAccessor={"week"}
            yAccessor={"grossWeekly"}
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
          />
      </div>
    );
  }
}

export default App;
