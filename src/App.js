import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import pinyin from 'pinyin';
import './App.css';

class App extends Component {
  state = {
    nowTexting: null,
    nowPinyin: Array(0)
  };

  hwaMap = (chr) => {
    if(chr[0].match(/^x/)){
      return [chr[0].replace('x','s')];
    }else{
      return chr;
    }
  }

  hwaConvert = (nowText) => {
    let hanyu = pinyin(nowText, {style: pinyin.STYLE_NORMAL});
    hanyu.forEach( (chr, index, thisArray) => {
      thisArray[index] = this.hwaMap(chr);
    });
    return hanyu;
  }
  
  handleText = event => {
    const nowTexting = event.target.value;
    const nowPinyin = this.hwaConvert(nowTexting);
    this.setState({ nowTexting, nowPinyin });
  }

  render() {
    const { nowTexting, nowPinyin } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          華語姓名羅馬化轉換器
        </header>
        <div className="App-Panel">
          <TextField style={{ marginBottom: "8px" }} value={ nowTexting } onChange={this.handleText}></TextField>
          <span>{ nowPinyin.join(" ") }</span>
        </div>
      </div>
    );
  }
}

export default App;
