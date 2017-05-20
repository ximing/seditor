/**
 * Created by yeanzhi on 17/5/20.
 */
'use strict';
import React, {Component} from 'react';
import SizeDropDown from './components/sizeDropDown/index';
import HeaderDropDown from './components/headerDropDown/index';
import ColorPicker from './components/color-picker';
import ToolTip from './components/tooltip';
import {inject, observer} from 'mobx-react';
import Icon from './components/icon';
import HightLight from './components/hightLight';

import editor from './model/editor';

export default class EditorToolbar extends Component {
    constructor() {
        super();
    }

    setColor = (color) => {
    }
    setBackgroundColor = (color) => {
    }
    align = (align) => {
        return () => {
        };
    }


    /**
     * Check if the current selection has a mark with `type` in it.
     *
     * @param {String} type
     * @return {Boolean}
     */

    hasMark = (type) => {
        return editor.state.marks.some(mark => mark.type === type)
    }

    /**
     * Check if the any of the currently selected blocks are of `type`.
     *
     * @param {String} type
     * @return {Boolean}
     */

    hasBlock = (type) => {
        return editor.state.blocks.some(node => node.type === type)
    }


    /**
     * Render the toolbar.
     *
     * @return {Element}
     */

    renderToolbar = () => {
        return (
            <div className="menu toolbar-menu">
                {this.renderMarkButton('bold', 'format_bold')}
                {this.renderMarkButton('italic', 'format_italic')}
                {this.renderMarkButton('underlined', 'format_underlined')}
                {this.renderMarkButton('code', 'code')}
                {this.renderBlockButton('heading-one', 'looks_one')}
                {this.renderBlockButton('heading-two', 'looks_two')}
                {this.renderBlockButton('block-quote', 'format_quote')}
                {this.renderBlockButton('numbered-list', 'format_list_numbered')}
                {this.renderBlockButton('bulleted-list', 'format_list_bulleted')}
            </div>
        )
    }

    /**
     * Render a mark-toggling toolbar button.
     *
     * @param {String} type
     * @param {String} icon
     * @return {Element}
     */

    renderMarkButton = (type, icon) => {
        const isActive = this.hasMark(type)
        const onMouseDown = e => this.onClickMark(e, type)

        return (
            <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
                <span className="material-icons">{icon}</span>
            </span>
        )
    }

    /**
     * Render a block-toggling toolbar button.
     *
     * @param {String} type
     * @param {String} icon
     * @return {Element}
     */

    renderBlockButton = (type, icon) => {
        const isActive = this.hasBlock(type)
        const onMouseDown = e => this.onClickBlock(e, type)

        return (
            <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
                <span className="material-icons">{icon}</span>
            </span>
        )
    }

    /**
     * When a mark button is clicked, toggle the current mark.
     *
     * @param {Event} e
     * @param {String} type
     */

    onClickMark = (e, type) => {
        e.preventDefault()
        let {state} = this.state

        state = state
            .transform()
            .toggleMark(type)
            .apply()

        this.setState({state})
    }

    /**
     * When a block button is clicked, toggle the block type.
     *
     * @param {Event} e
     * @param {String} type
     */

    onClickBlock = (e, type) => {
        e.preventDefault()
        let {state} = this.state
        const transform = state.transform()
        const {document} = state

        // Handle everything but list buttons.
        if (type !== 'bulleted-list' && type !== 'numbered-list') {
            const isActive = this.hasBlock(type)
            const isList = this.hasBlock('list-item')

            if (isList) {
                transform
                    .setBlock(isActive ? DEFAULT_NODE : type)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list')
            }

            else {
                transform
                    .setBlock(isActive ? DEFAULT_NODE : type)
            }
        }

        // Handle the extra wrapping required for list buttons.
        else {
            const isList = this.hasBlock('list-item')
            const isType = state.blocks.some((block) => {
                return !!document.getClosest(block.key, parent => parent.type == type)
            })

            if (isList && isType) {
                transform
                    .setBlock(DEFAULT_NODE)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list')
            } else if (isList) {
                transform
                    .unwrapBlock(type == 'bulleted-list' ? 'numbered-list' : 'bulleted-list')
                    .wrapBlock(type)
            } else {
                transform
                    .setBlock('list-item')
                    .wrapBlock(type)
            }
        }

        state = transform.apply()
        editor.state = state;
    }


    render() {
        let color = '#000000';
        return (
            <div className="toolbar-opver" id="toolbarOpver">
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
                <HeaderDropDown val={'正文'}/>
                <SizeDropDown size={12}/>
                <ToolTip
                    placement="bottom"
                    mouseEnterDelay={0}
                    mouseLeaveDelay={0}
                    overlay={<div>加粗 ctrl+b</div>}
                >
                    <button className="ql-bold">
                        <Icon type="bold"/>
                    </button>
                </ToolTip>
                <ToolTip
                    placement="bottom"
                    mouseEnterDelay={0}
                    mouseLeaveDelay={0}
                    overlay={<div>斜体 ctrl+i</div>}
                >
                    <button className="ql-italic">
                        <Icon type="italic"/>
                    </button>
                </ToolTip>
                <ToolTip
                    placement="bottom"
                    mouseEnterDelay={0}
                    mouseLeaveDelay={0}
                    overlay={<div>删除线 ctrl+shift+s</div>}
                >
                    <button className="ql-strike">
                        <Icon type="strike"/>
                    </button>
                </ToolTip>
                <ToolTip
                    placement="bottom"
                    mouseEnterDelay={0}
                    mouseLeaveDelay={0}
                    overlay={<div>下划线 ctrl+u</div>}
                >
                    <button className="ql-underline">
                        <Icon type="underline"/>
                    </button>
                </ToolTip>
                <HightLight />
                <ToolTip
                    placement="bottom"
                    mouseEnterDelay={0}
                    mouseLeaveDelay={0}
                    overlay={<div>字体颜色</div>}
                >
                    <ColorPicker onChangeComplete={this.setColor} defaultColor={color} icon={(
                        <Icon type="color"/>
                    )}/>
                </ToolTip>
                <Icon type="vertical"/>
                <ToolTip
                    placement="bottom"
                    mouseEnterDelay={0}
                    mouseLeaveDelay={0}
                    overlay={<div>有序列表 ctrl+Option+L</div>}
                >
                    <button className="ql-list" value="ordered">
                        <Icon type="ol"/>
                    </button>
                </ToolTip>
                <ToolTip
                    placement="bottom"
                    mouseEnterDelay={0}
                    mouseLeaveDelay={0}
                    overlay={<div>无序列表 ctrl+Option+U</div>}
                >
                    <button className="ql-list" value="bullet">
                        <Icon type="ul"/>
                    </button>
                </ToolTip>
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
                    <Icon type="justify-align" onClick={this.align('justify')}/>
                </ToolTip>
                <ToolTip
                    placement="bottom"
                    mouseEnterDelay={0}
                    mouseLeaveDelay={0}
                    overlay={<div>减少缩进</div>}
                >
                    <button className="ql-indent" value="-1">
                        <Icon type="left-indent"/>
                    </button>
                </ToolTip>
                <ToolTip
                    placement="bottom"
                    mouseEnterDelay={0}
                    mouseLeaveDelay={0}
                    overlay={<div>增加缩进</div>}
                >
                    <button className="ql-indent" value="+1">
                        <Icon type="right-indent"/>
                    </button>
                </ToolTip>
                <Icon type="vertical"/>
            </div>
        );

    }
}
