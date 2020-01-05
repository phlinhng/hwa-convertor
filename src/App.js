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
    let newPinyin = chr[0];

    if(newPinyin.match(/^[nl]/)){
      newPinyin = newPinyin.replace('v','yu');
    }else if(newPinyin.match(/^[jqx]/)){
      newPinyin = newPinyin.replace('q','c').replace('x','s');
      if(!newPinyin.match(/iu$/)){
        newPinyin = newPinyin.replace('u','yu');
      }
    }else if(newPinyin.match(/^c[aeou]/)){
      newPinyin = newPinyin.replace('c','ts');
    }

    if(newPinyin.match(/^[zcs]hi$/)){
      return [newPinyin.replace('i','j')];
    }else if(newPinyin.match(/^ri$/)){
      return [newPinyin.replace('i','hj')];
    }else if(newPinyin.match(/^zi$/)){
      return [newPinyin.replace('i','j')];
    }else if(chr[0].match(/^[cs]i$/)){
      return [newPinyin.replace('i','ze').replace('cze','tze')];
    }else if(newPinyin.match(/^[dtnlgkhzs]e$/) || newPinyin.match(/^[zcst].e$/)){
      return [newPinyin.replace('e','er')];
    }else if(newPinyin.match(/ei$/)){
      return [newPinyin.replace('ei','ey')];
    }else if(newPinyin.match(/iu$/)){
      return [newPinyin.replace('iu','iou')];
    }else if(newPinyin === 'you'){
      return [newPinyin.replace('ou','oo')];
    }else if(newPinyin.match(/ian$/) || newPinyin.match(/^yan$/)){
      return [newPinyin.replace('an','en')];
    }else if(newPinyin.match(/un$/) && newPinyin.match(/^[jcs]/)){
      return [newPinyin.replace('un','eun').replace('yeun','eun')];
    }else{
      return [newPinyin];
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
          華語羅馬化轉換器
        </header>
        <div className="App-Panel">
          <div style={{display: "inline-block", verticalAlign:"top" ,marginRight: "16px", width: "45vw"}}>
            <TextField multiline maxRows="20" style={{ width: "100%" }} value={ nowTexting } onChange={this.handleText}></TextField>
          </div>
          <div className="Pinyin">
            { nowPinyin.join(" ") }
          </div>
        </div>
        <footer className="App-footer">
          Designed by phlinhng
        </footer>
      </div>
    );
  }
}

export default App;
