import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';




class App extends Component {

  constructor(props){
    super(props);
    this.CompaniesBringer=this.CompaniesBringer.bind(this);
  
    this.state= {
      test:true,
    }

  }

  choosingCompany(company){
    console.log(company);
    this.props.companyChooser(company);
  }

  CompaniesBringer(){
    if(!this.props.companies){return null}
    return this.props.companies.map(company => <div onClick={()=>this.choosingCompany(company)} key={company.symbol}><img onError={(e)=>{e.target.src={logo}}} alt="company logo" src={logo}></img><p>{company.name.split(" ")[0]+" "+company.name.split(" ")[1]}</p></div>);
  }


  render() {
    return (
      <section className="companies-data">
          <h1 className="companies-data__heading"> <i className="far fa-building"></i>  Companies</h1>
          <div className="companies-data__container">
          {this.CompaniesBringer()}
          </div>
        </section>
    );
  }
}

export default App;
