/* jshint esversion: 6 */ 
import React, { Component } from 'react';
import { } from 'react-bootstrap';
import './App.less';
import canvasData from './App_json';
import LineWidth from './components/lineWidth/index';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tools: canvasData.tool,
      backgroundSet: canvasData.backgroundSet,
      canvasWidth: '800',   
      canvasHeight: '500',
      toolType: 'freeForm',               // 默认工具 => 曲线
      lineWidth: 1,                       // 线宽
      lineColor: 'rgba(0,0,0,1)',         // 线条颜色
      backgroundColor: 'rgba(0,0,0,1)',    // 画布背景颜色
      backgroundSetType: 2,                // 画布背景设置 0:无背景  1:背景颜色 2:背景图
    };
  }
  render() {
    let { canvasWidth, canvasHeight, tools, lineWidth, lineColor, backgroundColor, backgroundSet,backgroundSetType } = this.state;
    if (!canvasData) return false;

    return (
      <div className="App">
        <aside className="toolBar">
          <p>工具栏</p>
          {
            tools.map((item,index)=> (
              <button 
                className={`tool ${item.type}_tool ${item.selected ? "active" : ''}`} 
                key={index}
                data-type={item.type}
                onClick={this.onClickToolBar.bind(this,item.type)}></button>
            ))
          }
         <LineWidth 
          lineWidth={lineWidth}
          setLineWidth={this.setLineWidth.bind(this)} />
          <div className="line-color">
              <label>线条颜色</label>
              <div className="line-preview-color" onClick={this.onCheckColor.bind(this)}></div>
          </div>
          
          <div className="control-background">
            画布背景
            <select name="canvasBackground" value={backgroundSetType} id="canvasBackground" onChange={this.onChangeCanvasBackground.bind(this)}>
              {
                backgroundSet.map((item,index) => (
                  <option value={item.type} key={index} >{item.name}</option>
                ))
              }
            </select>
          </div>

          {
            backgroundSetType === 1 
            ? <div className="background-color">
                <label>画布背景颜色</label>
                <div className="fill-preview-color" onClick={this.onCheckColor.bind(this)}></div>
            </div>
            : null
          }
          
          {
            backgroundSetType === 2 
            ? <div className="file-box">
                <label>选择画布背景图</label>
                <input className="file" type="file" name="imgurl" id="file" /> 
            </div>
            : null
          }
          <div className="btns">
              <button className="btn clear">清空画布</button>
              <button className="btn save">保存绘画</button>
          </div>
        </aside>
        <div className="canvasBox">
          <canvas id="myCanvas" width={canvasWidth} height={canvasHeight}></canvas>
        </div>
      </div>
    );
  }
  componentDidMount() {
    
  }
  // 更新lineWidth
  setLineWidth(lineWidth){
    this.setState({
      lineWidth
    })
  }
  // 选择工具
  onClickToolBar(type,e) {
    let {tools} = this.state;
    tools.forEach((item,index) => {
      tools[index].selected = false;
      if(item.type === type) {
        tools[index].selected = true;
      }
    }); 

    this.setState({
      tools,
    });
  }

  // 打开颜色选择器
  onCheckColor(){

  }

  // 选择画布背景
  onChangeCanvasBackground(e) {
    let newType = Number(e.target.value);
    this.setState({
      backgroundSetType:newType
    })
  }

  
}

export default App;
