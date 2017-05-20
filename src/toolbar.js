/**
 * Created by yeanzhi on 17/5/20.
 */
'use strict';
import React, {Component} from 'react';
import SizeDropDown from './components/sizeDropDown/index';
import HeaderDropDown from './components/headerDropDown/index';
import ColorPicker from './components/color-picker';
import ToolTip from './components/tooltip';
import {inject,observer} from 'mobx-react';
import Icon from './components/icon';
import HightLight from './components/hightLight';

export default class EditorToolbar extends Component {
    constructor() {
        super();
    }

    setColor = (color) => {
    }
    setBackgroundColor = (color) => {
    }
    align = (align)=>{
        return ()=>{
        };
    }

    render() {
        let color = '#000000';
        return (
            <div className="toolbar-opver" id="toolbarOpver">
                <span className="ql-formats common-header">
                <ToolTip
                    placement="bottom"
                    mouseEnterDelay={0}
                    mouseLeaveDelay={0}
                    overlay={<div>撤销(ctrl+Z)</div>}
                >
                    <button className="ql-undo" onClick={this.undo}>
                        <Icon type="undo"/>
                    </button>
                </ToolTip>
                <ToolTip
                    placement="bottom"
                    mouseEnterDelay={0}
                    mouseLeaveDelay={0}
                    overlay={<div>重做(ctrl+Y)</div>}
                >
                    <button className="ql-redo" onClick={this.redo}>
                        <Icon type="redo"/>
                    </button>
                </ToolTip>
                <ToolTip
                    placement="bottom"
                    mouseEnterDelay={0}
                    mouseLeaveDelay={0}
                    overlay={<div>格式刷</div>}
                >
                    <button className="ql-format" onClick={this.format}>
                        <Icon type="format"/>
                    </button>
                </ToolTip>
                <ToolTip
                    placement="bottom"
                    mouseEnterDelay={0}
                    mouseLeaveDelay={0}
                    overlay={<div>清除格式 Ctrl+Shift+C</div>}
                >
                    <button className="ql-clear-format" onClick={this.clearFormat}>
                        <Icon type="clear"/>
                    </button>
                </ToolTip>
                <Icon type="vertical"/>
            </span>
                <span className="ql-formats start-header">
                <span className="ql-formats">
                    <HeaderDropDown val={'正文'}/>
                </span>
                <span className="ql-formats">
                    <SizeDropDown size={12}/>
                </span>
                <span className="ql-formats">
                    <ToolTip
                        placement="bottom"
                        mouseEnterDelay={0}
                        mouseLeaveDelay={0}
                        overlay={<div>加粗 ctrl+b</div>}
                    >
                        <button className="ql-bold"></button>
                    </ToolTip>
                    <ToolTip
                        placement="bottom"
                        mouseEnterDelay={0}
                        mouseLeaveDelay={0}
                        overlay={<div>斜体 ctrl+i</div>}
                    >
                        <button className="ql-italic"></button>
                    </ToolTip>
                    <ToolTip
                        placement="bottom"
                        mouseEnterDelay={0}
                        mouseLeaveDelay={0}
                        overlay={<div>删除线 ctrl+shift+s</div>}
                    >
                        <button className="ql-strike"></button>
                    </ToolTip>
                    <ToolTip
                        placement="bottom"
                        mouseEnterDelay={0}
                        mouseLeaveDelay={0}
                        overlay={<div>下划线 ctrl+u</div>}
                    >
                        <button className="ql-underline"></button>
                    </ToolTip>
                </span>
                <span className="ql-formats">
                    <HightLight />
                    <ToolTip
                        placement="bottom"
                        mouseEnterDelay={0}
                        mouseLeaveDelay={0}
                        overlay={<div>字体颜色</div>}
                    >
                        <ColorPicker onChangeComplete={this.setColor} defaultColor={color} icon={(
                            <span className="ql-defalut-color">
                                <svg viewBox="0 0 18 18">
                                    <line className="ql-color-label ql-stroke" x1="3" x2="15" y1="15" y2="15"
                                          style={{stroke: color}}></line>
                                    <polyline className="ql-stroke" points="5.5 11 9 3 12.5 11"
                                              style={{stroke: color === '#FFFFFF' ? '#000000' : color}}></polyline>
                                    <line className="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"
                                          style={{stroke: color === '#FFFFFF' ? '#000000' : color}}></line>
                                </svg>
                            </span>
                        )}/>
                    </ToolTip>
                    <Icon type="vertical"/>
                </span>
                <span className="ql-formats">
                    <ToolTip
                        placement="bottom"
                        mouseEnterDelay={0}
                        mouseLeaveDelay={0}
                        overlay={<div>有序列表 ctrl+Option+L</div>}
                    >
                        <button className="ql-list" value="ordered"></button>
                    </ToolTip>
                    <ToolTip
                        placement="bottom"
                        mouseEnterDelay={0}
                        mouseLeaveDelay={0}
                        overlay={<div>无序列表 ctrl+Option+U</div>}
                    >
                        <button className="ql-list" value="bullet"></button>
                    </ToolTip>
                </span>
                <span className="ql-formats">
                    <ToolTip
                        placement="bottom"
                        mouseEnterDelay={0}
                        mouseLeaveDelay={0}
                        overlay={<div>左对齐 Ctrl+Shift+L</div>}
                    >
                        <Icon type="left-align" onClick={this.align('left')}/>
                    </ToolTip>
                    <ToolTip
                        placement="bottom"
                        mouseEnterDelay={0}
                        mouseLeaveDelay={0}
                        overlay={<div>居中对齐 Ctrl+Shift+E</div>}
                    >
                        <Icon type="center-align" onClick={this.align('center')}/>
                    </ToolTip>
                    <ToolTip
                        placement="bottom"
                        mouseEnterDelay={0}
                        mouseLeaveDelay={0}
                        overlay={<div>右对齐 Ctrl+Shift+R</div>}
                    >
                        <Icon type="right-align" onClick={this.align('right')}/>
                    </ToolTip>
                    <ToolTip
                        placement="bottom"
                        mouseEnterDelay={0}
                        mouseLeaveDelay={0}
                        overlay={<div>两端对齐 Ctrl+Shift+J</div>}
                    >
                        <Icon type="justify-align" onClick={this.align('justify')} />
                    </ToolTip>
                </span>
                <span className="ql-formats">
                    <ToolTip
                        placement="bottom"
                        mouseEnterDelay={0}
                        mouseLeaveDelay={0}
                        overlay={<div>减少缩进</div>}
                    >
                        <button className="ql-indent" value="-1"></button>
                    </ToolTip>
                    <ToolTip
                        placement="bottom"
                        mouseEnterDelay={0}
                        mouseLeaveDelay={0}
                        overlay={<div>增加缩进</div>}
                    >
                        <button className="ql-indent" value="+1"></button>
                    </ToolTip>
                    <Icon type="vertical"/>
                </span>
            </span>
            </div>
        );

    }
}
