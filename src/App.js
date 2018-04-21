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
      companiesSelection:false,
      data:[
        {
          title: "The Fate of the Furious",
          studio: "Uni.",
          firstWeek: "2017-15",
          maxRank: 1,
          maxGross: 225764765,
          coordinates: [
            {
              "date": "2017-04-18",
              "open": 139.2076,
              "high": 139.8278,
              "low": 138.9123,
              "close": 139.0009,
              "volume": 14697544,
              "unadjustedVolume": 14697544,
              "change": -0.620189,
              "changePercent": -0.444,
              "vwap": 139.2654,
              "label": "Apr 18, 17",
              "changeOverTime": 0
            },
            {
              "date": "2017-04-19",
              "open": 139.6703,
              "high": 139.7885,
              "low": 138.2626,
              "close": 138.489,
              "volume": 17328375,
              "unadjustedVolume": 17328375,
              "change": -0.511901,
              "changePercent": -0.368,
              "vwap": 139.0106,
              "label": "Apr 19, 17",
              "changeOverTime": -0.0036827099680649344
            },
            {
              "date": "2017-04-20",
              "open": 139.0206,
              "high": 140.6941,
              "low": 138.9615,
              "close": 140.2216,
              "volume": 23319562,
              "unadjustedVolume": 23319562,
              "change": 1.7326,
              "changePercent": 1.251,
              "vwap": 140.0774,
              "label": "Apr 20, 17",
              "changeOverTime": 0.008781957526893666
            },
            {
              "date": "2017-04-21",
              "open": 140.2216,
              "high": 140.4579,
              "low": 139.6408,
              "close": 140.0542,
              "volume": 17320928,
              "unadjustedVolume": 17320928,
              "change": -0.167351,
              "changePercent": -0.119,
              "vwap": 140.044,
              "label": "Apr 21, 17",
              "changeOverTime": 0.007577648777813721
            },
            {
              "date": "2017-04-24",
              "open": 141.2651,
              "high": 141.7081,
              "low": 140.9501,
              "close": 141.4029,
              "volume": 17134333,
              "unadjustedVolume": 17134333,
              "change": 1.3487,
              "changePercent": 0.963,
              "vwap": 141.4296,
              "label": "Apr 24, 17",
              "changeOverTime": 0.017280463651674103
            },
            {
              "date": "2017-04-25",
              "open": 141.6687,
              "high": 142.6433,
              "low": 141.6293,
              "close": 142.279,
              "volume": 18871501,
              "unadjustedVolume": 18871501,
              "change": 0.87614,
              "changePercent": 0.62,
              "vwap": 142.2544,
              "label": "Apr 25, 17",
              "changeOverTime": 0.023583300539780642
            },
            {
              "date": "2017-04-26",
              "open": 142.22,
              "high": 142.348,
              "low": 141.1432,
              "close": 141.4423,
              "volume": 20041241,
              "unadjustedVolume": 20041241,
              "change": -0.836761,
              "changePercent": -0.588,
              "vwap": 141.7939,
              "label": "Apr 26, 17",
              "changeOverTime": 0.01756391505378733
            },
            {
              "date": "2017-04-27",
              "open": 141.681,
              "high": 141.9148,
              "low": 141.078,
              "close": 141.5506,
              "volume": 14246347,
              "unadjustedVolume": 14246347,
              "change": 0.108285,
              "changePercent": 0.077,
              "vwap": 141.4404,
              "label": "Apr 27, 17",
              "changeOverTime": 0.01834304669969764
            },
            {
              "date": "2017-04-28",
              "open": 141.8459,
              "high": 142.0526,
              "low": 141.0387,
              "close": 141.4128,
              "volume": 20860358,
              "unadjustedVolume": 20860358,
              "change": -0.137819,
              "changePercent": -0.097,
              "vwap": 141.4889,
              "label": "Apr 28, 17",
              "changeOverTime": 0.017351686212103683
            },
            {
              "date": "2017-05-01",
              "open": 142.8402,
              "high": 144.9075,
              "low": 142.7024,
              "close": 144.2971,
              "volume": 33602943,
              "unadjustedVolume": 33602943,
              "change": 2.8844,
              "changePercent": 2.04,
              "vwap": 143.9926,
              "label": "May 1, 17",
              "changeOverTime": 0.03810191157035673
            },
            {
              "date": "2017-05-02",
              "open": 145.2422,
              "high": 145.7836,
              "low": 144.5531,
              "close": 145.2126,
              "volume": 45352194,
              "unadjustedVolume": 45352194,
              "change": 0.915516,
              "changePercent": 0.634,
              "vwap": 145.1549,
              "label": "May 2, 17",
              "changeOverTime": 0.0446881998605765
            },
            {
              "date": "2017-05-03",
              "open": 143.3225,
              "high": 145.1929,
              "low": 142.0231,
              "close": 144.7696,
              "volume": 45697034,
              "unadjustedVolume": 45697034,
              "change": -0.442992,
              "changePercent": -0.305,
              "vwap": 143.9223,
              "label": "May 3, 17",
              "changeOverTime": 0.041501170136308434
            },
            {
              "date": "2017-05-04",
              "open": 144.2381,
              "high": 144.8484,
              "low": 143.5391,
              "close": 144.2479,
              "volume": 23371872,
              "unadjustedVolume": 23371872,
              "change": -0.521745,
              "changePercent": -0.36,
              "vwap": 144.0523,
              "label": "May 4, 17",
              "changeOverTime": 0.03774795702761626
            },
            {
              "date": "2017-05-05",
              "open": 144.4743,
              "high": 146.6597,
              "low": 144.4743,
              "close": 146.6401,
              "volume": 27327725,
              "unadjustedVolume": 27327725,
              "change": 2.3922,
              "changePercent": 1.658,
              "vwap": 145.9122,
              "label": "May 5, 17",
              "changeOverTime": 0.05495791753866333
            },
            {
              "date": "2017-05-08",
              "open": 146.709,
              "high": 151.3062,
              "low": 146.709,
              "close": 150.627,
              "volume": 48752413,
              "unadjustedVolume": 48752413,
              "change": 3.9869,
              "changePercent": 2.719,
              "vwap": 149.6241,
              "label": "May 8, 17",
              "changeOverTime": 0.08364046563727291
            },
            {
              "date": "2017-05-09",
              "open": 151.4736,
              "high": 152.4679,
              "low": 151.0601,
              "close": 151.5917,
              "volume": 39130363,
              "unadjustedVolume": 39130363,
              "change": 0.964736,
              "changePercent": 0.64,
              "vwap": 151.7182,
              "label": "May 9, 17",
              "changeOverTime": 0.09058070847023293
            },
            {
              "date": "2017-05-10",
              "open": 151.2373,
              "high": 151.5425,
              "low": 149.741,
              "close": 150.8731,
              "volume": 25805692,
              "unadjustedVolume": 25805692,
              "change": -0.718631,
              "changePercent": -0.474,
              "vwap": 150.6942,
              "label": "May 10, 17",
              "changeOverTime": 0.08541095777077697
            },
            {
              "date": "2017-05-11",
              "open": 150.6952,
              "high": 152.2966,
              "low": 150.5568,
              "close": 152.1779,
              "volume": 27255058,
              "unadjustedVolume": 27255058,
              "change": 1.3049,
              "changePercent": 0.865,
              "vwap": 151.4272,
              "label": "May 11, 17",
              "changeOverTime": 0.09479794735141997
            },
            {
              "date": "2017-05-12",
              "open": 152.9193,
              "high": 154.6195,
              "low": 152.8897,
              "close": 154.3032,
              "volume": 32527017,
              "unadjustedVolume": 32527017,
              "change": 2.1253,
              "changePercent": 1.397,
              "vwap": 154.0508,
              "label": "May 12, 17",
              "changeOverTime": 0.11008777641008081
            },
            {
              "date": "2017-05-15",
              "open": 154.2142,
              "high": 154.8469,
              "low": 153.2653,
              "close": 153.9078,
              "volume": 26009719,
              "unadjustedVolume": 26009719,
              "change": -0.395396,
              "changePercent": -0.256,
              "vwap": 153.7979,
              "label": "May 15, 17",
              "changeOverTime": 0.10724319051171616
            },
            {
              "date": "2017-05-16",
              "open": 154.145,
              "high": 154.2637,
              "low": 152.9391,
              "close": 153.6804,
              "volume": 20048478,
              "unadjustedVolume": 20048478,
              "change": -0.227353,
              "changePercent": -0.148,
              "vwap": 153.5201,
              "label": "May 16, 17",
              "changeOverTime": 0.1056072298812453
            },
          ],
          type: "landslide"
        },
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

  
  choosingCompany(company){
    console.log(company);
    this.setState({choosen:company.symbol})
  }
  


  render() {
    const movies = this.state.data;
    return (
      <div className="App">
          <header>
            <h1>Fynn-C</h1>
            <nav>
              <ul>
                <li>n</li>
                <li>n</li>
                <li>n</li>
              </ul>
              </nav>
          </header>
         { this.state.companiesSelection && <Companies
          companies={this.state.companies}
          companyChooser={this.choosingCompany}
          />}
         <XYFrame
            title={"Two Movies"}
            size={[900, 600]}
            lines={movies}
            xAccessor={"vwap"}
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
          />
      </div>
    );
  }
}

export default App;
