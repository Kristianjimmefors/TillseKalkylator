import React from 'react';
import ReactDOM from 'react-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
class PrisKalkylator extends React.Component {
  @observable fastigheter = 0;
  @observable users = 0;
  @observable userCost = 0;
  @observable fastighetCost = 0;
  @observable
  modules = [
    { title: 'Ärenden', value: false },
    { title: 'Uppgifter', value: false },
    { title: 'Projekt', value: false },
    { title: 'Leverantörer', value: false },
    { title: 'Dokument', value: false },
    { title: 'Inventering', value: false },
    { title: 'Meddelanden', value: false }
  ];

  CostUsers(userAmount) {
    this.users = userAmount;
    if (this.users > 0 && this.users <= 10) {
      this.userCost = this.users * 140;
    } else if (this.users > 10 && this.users <= 50) {
      this.userCost = 140 * 10 + (this.users - 10) * 80;
    } else if (this.users > 50 && this.users <= 100) {
      this.userCost = 140 * 10 + 80 * 40 + 40 * (this.users - 50);
    } else if (this.users > 100) {
      this.userCost = 140 * 10 + 80 * 40 + 40 * 50 + (this.users - 100) * 20;
    } else {
      this.userCost = 0;
    }
  }

  CostFastighet(fastighetAnt) {
    this.fastigheter = fastighetAnt;
    if (this.fastigheter > 0 && this.fastigheter <= 10) {
      this.fastighetCost = this.fastigheter * 80;
    } else if (this.fastigheter > 10 && this.fastigheter <= 50) {
      this.fastighetCost = 80 * 10 + (this.fastigheter - 10) * 40;
    } else if (this.fastigheter > 50 && this.fastigheter <= 100) {
      this.fastighetCost = 80 * 10 + 40 * 40 + 20 * (this.fastigheter - 50);
    } else if (this.fastigheter > 100) {
      this.fastighetCost =
        80 * 10 + 40 * 40 + 20 * 50 + (this.fastigheter - 100) * 10;
    } else {
      this.fastighetCost = 0;
    }
  }

  checkboxChange(index) {
    this.modules[index].value = !this.modules[index].value;
  }

  getCost() {
    let selectedModules = this.modules.filter(module => {
      return module.value;
    });

    
    if (selectedModules.length > 0) {
      let modulesCost = Math.pow(1.4, selectedModules.length - 1);
      return Math.floor((this.userCost + this.fastighetCost) * modulesCost);
    }else{
      return 0;
    }

    
  
  }

  render() {
    return (
      <div>
        <div>
          <p>Användare</p>
          <input
            type="range"
            min="0"
            max="200"
            value={this.users}
            id="users"
            onChange={e => this.CostUsers(e.target.value)}
          />
          <p>{this.users}</p>
        </div>
        <div>
          <p>Fastigheter</p>
          <input
            type="range"
            min="0"
            max="200"
            value={this.fastigheter}
            id="fastigheter"
            onChange={e => this.CostFastighet(e.target.value)}
          />
          <p>{this.fastigheter}</p>
        </div>
        {this.modules.map((module, index) => (
          <div className="modules" key={index}>
            <p>{module.title}</p>
            <input
              type="checkbox"
              onClick={e => this.checkboxChange(index)}
              value={module.value}
            />
          </div>
        ))}
        <p>Totala Kostnaden: {this.getCost()}</p>
      </div>
    );
  }
}

ReactDOM.render(<PrisKalkylator />, document.getElementById('app'));
