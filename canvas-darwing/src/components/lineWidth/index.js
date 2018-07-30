/* jshint esversion: 6 */ 
import React, { Component } from 'react';
import './lineWidth.less';

class LineWidth extends Component {
  constructor(props) {
      super(props);
      this.setState = {};
  };

  render() {
    let {lineWidth} = this.props;
      return  <div className="line-width">
          <label>线条粗细 <i>{lineWidth}</i> px </label>
          <div className="control-width">
              <div className="line-width-bg"></div>
              <canvas id="widthControl" width="104" height="8" onClick={this.initLineCanvas.bind(this)}></canvas>
          </div>
      </div>
  }
  componentDidMount(){
    this.initLineCanvas();
  }
  // 初始化“线条粗细”画布
  initLineCanvas(e) {
    const widthControl = document.getElementById('widthControl'),     // 线宽度调节canvas
      widthPen = widthControl.getContext('2d');
      let { lineWidth } = this.props;
      if(e) {
        lineWidth = e.pageX - widthControl.offsetLeft-20;
        if(lineWidth > 100) lineWidth = 100;
      }
      widthPen.clearRect(0,0,widthControl.width,widthControl.height);
      widthPen.save();
      widthPen.beginPath();
      widthPen.lineWidth = 4;
      widthPen.strokeStyle = '#ff9e22';
      widthPen.moveTo(0,4);
      widthPen.lineTo(lineWidth, 4);
      widthPen.closePath();
      widthPen.stroke();
      this.drawLineWidthPint(widthPen,lineWidth);

      this.props.setLineWidth(lineWidth);
  }

  /**
   * 线条粗细
   * 画端点的圆
   */
  drawLineWidthPint(widthPen,x) {
    if(x < 4) {x = 4;} 
    widthPen.beginPath();
    widthPen.lineWidth = 1;
    widthPen.strokeStyle = '#ff9e22';
    widthPen.fillStyle = '#ff9e22';
    widthPen.arc(x,4,3,0,2*Math.PI);
    widthPen.fill();
    widthPen.stroke();
  }
    
}

export default LineWidth;