import React from 'react';
import './Rate.css';
import Calc from '../Calc/Calc'

class Rate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'date': '',
            'currencyRate': {}
        }
        this.currency = ['USD', 'PLN', 'CAD'];
        this.getRate();
    }
    getRate = () => {
        fetch('http://api.exchangeratesapi.io/v1/latest?access_key=92e3c5007d58c6b6191b18126cb78c4a&symbols=USD,AUD,CAD,PLN,MXN&format=1')
            .then(data => {
                return data.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ date: data.date });
                let result = {};
                for (let i = 0; i < this.currency.length; i++) {
                    result[this.currency[i]] = data.rates[this.currency[i]];
                }
                console.log(result);
                this.setState({ currencyRate: result });
            })
    }
    render() {
        return (
            <div className="rate">
                <h3>Курс валют на {this.state.date}</h3>
                <div className="flex-container">
                    {Object.keys(this.state.currencyRate).map((keyName, i) =>
                    (
                        <div className="block flex-item" key={keyName}>
                            <div className="currency-name">{keyName}</div>
                            <div className="currency-in">{this.state.currencyRate[keyName]}
                            </div>
                            <p>* Можно купить за 1EUR</p>
                        </div>
                    )
                    )}
                </div>
                <Calc rate={this.state.currencyRate} />
            </div>
        );
    }
}

export default Rate;
