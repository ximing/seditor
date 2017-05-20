/**
 * Created by yeanzhi on 17/5/20.
 */
'use strict';

import { Editor, Raw } from 'slate'
import React from 'react'
import Header from './header'
/**
 * Define the default node type.
 */

const DEFAULT_NODE = 'div';

/**
 * Define a schema.
 *
 * @type {Object}
 */

const schema = {
    nodes: {
        'block-quote': props => <blockquote {...props.attributes}>{props.children}</blockquote>,
        'bulleted-list': props => <ul {...props.attributes}>{props.children}</ul>,
        'heading-one': props => <h1 {...props.attributes}>{props.children}</h1>,
        'heading-two': props => <h2 {...props.attributes}>{props.children}</h2>,
        'list-item': props => <li {...props.attributes}>{props.children}</li>,
        'numbered-list': props => <ol {...props.attributes}>{props.children}</ol>,
    },
    marks: {
        bold: {
            fontWeight: 'bold'
        },
        code: {
            fontFamily: 'monospace',
            backgroundColor: '#eee',
            padding: '3px',
            borderRadius: '4px'
        },
        italic: {
            fontStyle: 'italic'
        },
        underlined: {
            textDecoration: 'underline'
        }
    }
};

/**
 * The rich text example.
 *
 * @type {Component}
 */

export default class SEditor extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            state: Raw.deserialize(props.initialState||{}, { terse: true }),
            left: window.innerWidth / 2 - 400,
            scrollTop: 0
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            left: nextProps.open ? window.innerWidth / 2 - 300 : window.innerWidth / 2 - 400
        });
    }

    /**
     * Check if the current selection has a mark with `type` in it.
     *
     * @param {String} type
     * @return {Boolean}
     */

    hasMark = (type) => {
        const { state } = this.state
        return state.marks.some(mark => mark.type == type)
    }

    /**
     * Check if the any of the currently selected blocks are of `type`.
     *
     * @param {String} type
     * @return {Boolean}
     */

    hasBlock = (type) => {
        const { state } = this.state
        return state.blocks.some(node => node.type == type)
    }

    /**
     * On change, save the new state.
     *
     * @param {State} state
     */

    onChange = (state) => {
        console.log(Raw.serialize(state));
        this.setState({ state })
    }

    /**
     * On key down, if it's a formatting command toggle a mark.
     *
     * @param {Event} e
     * @param {Object} data
     * @param {State} state
     * @return {State}
     */

    onKeyDown = (e, data, state) => {
        if (!data.isMod) return
        let mark

        switch (data.key) {
            case 'b':
                mark = 'bold'
                break
            case 'i':
                mark = 'italic'
                break
            case 'u':
                mark = 'underlined'
                break
            case '`':
                mark = 'code'
                break
            default:
                return
        }

        state = state
            .transform()
            .toggleMark(mark)
            .apply()

        e.preventDefault()
        return state
    }

    /**
     * When a mark button is clicked, toggle the current mark.
     *
     * @param {Event} e
     * @param {String} type
     */

    onClickMark = (e, type) => {
        e.preventDefault()
        let { state } = this.state

        state = state
            .transform()
            .toggleMark(type)
            .apply()

        this.setState({ state })
    }

    /**
     * When a block button is clicked, toggle the block type.
     *
     * @param {Event} e
     * @param {String} type
     */

    onClickBlock = (e, type) => {
        e.preventDefault()
        let { state } = this.state
        const transform = state.transform()
        const { document } = state

        // Handle everything but list buttons.
        if (type != 'bulleted-list' && type != 'numbered-list') {
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
        this.setState({ state })
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
     * Render the Slate editor.
     *
     * @return {Element}
     */

    renderEditor = () => {
        return (
        <div className="content-container"
             style={{left: this.state.left}}>
            <Editor
                className="se-container"
                spellCheck
                placeholder={'Enter some rich text...'}
                schema={schema}
                state={this.state.state}
                onChange={this.onChange}
                onKeyDown={this.onKeyDown}
            />
        </div>
        )
    }


    /**
     * Render.
     *
     * @return {Element}
     */

    render = () => {
        return (
            <div className="seditor-wrapper">
                <Header {...this.props}/>
                <div className="seditor-body">
                    {this.renderEditor()}
                </div>
            </div>
        )
    }

}
