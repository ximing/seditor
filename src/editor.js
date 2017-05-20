/**
 * Created by yeanzhi on 17/5/20.
 */
'use strict';

import { Editor, Raw } from 'slate'
import React from 'react'
import Header from './header'

import editor from './model/editor';

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
        editor.state =  Raw.deserialize(props.initialState||{}, { terse: true });
        this.state = {
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
     * On change, save the new state.
     *
     * @param {State} state
     */

    onChange = (state) => {
        console.log(Raw.serialize(state));
        editor.state = state;
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
                state={editor.state}
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
