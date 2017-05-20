/**
 * Created by yeanzhi on 17/3/26.
 */
'use strict';
import React, {Component} from 'react';
import SEeditor from '../src/index';
export default class EditContainer extends Component {
    componentDidMount() {

    }
// <MenuItem key="1">报告问题(@ximing)</MenuItem>
// <Divider />
// <MenuItem key="3">上报日志</MenuItem>
    render() {
        return(
            <div>
                <SEeditor
                doc = {{name:'test.doc',status:'fjdisoaifasdof'}}
                ref={(e)=>{this.seditor = e;}}
                coCursors = {[{name:'yeanzhi',range:{length:1,index:50},id:'123'}]}
                options={{
                    uploadUrl:'http://mind.xm.test.sankuai.com/api/upload',
                    helpOptions:[
                        {key:'nihao',content:'nihaoa',onClick:(key)=>{console.log(key);}}
                    ]
                }}
                initialState={{
                    "nodes": [
                        {
                            "kind": "block",
                            "type": "paragraph",
                            "nodes": [
                                {
                                    "kind": "text",
                                    "ranges": [
                                        {
                                            "text": "This is editable "
                                        },
                                        {
                                            "text": "rich",
                                            "marks": [
                                                {
                                                    "type": "bold"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " text, "
                                        },
                                        {
                                            "text": "much",
                                            "marks": [
                                                {
                                                    "type": "italic"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " better than a1 "
                                        },
                                        {
                                            "text": "<textarea>",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": "!"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "kind": "block",
                            "type": "paragraph",
                            "nodes": [
                                {
                                    "kind": "text",
                                    "ranges": [
                                        {
                                            "text": "Since it's rich text, you can do things like turn a selection of text "
                                        },
                                        {
                                            "text": "bold",
                                            "marks": [
                                                {
                                                    "type": "bold"
                                                }
                                            ]
                                        },{
                                            "text": ", or add a semantically rendered block quote in the middle of the page, like this:"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "kind": "block",
                            "type": "block-quote",
                            "nodes": [
                                {
                                    "kind": "text",
                                    "text": "A wise quote."
                                }
                            ]
                        },
                        {
                            "kind": "block",
                            "type": "paragraph",
                            "nodes": [
                                {
                                    "kind": "text",
                                    "text": "Try it out for yourself  fdsafds!"
                                }
                            ]
                        }
                    ]
                }}
                />
            </div>
        );
    }
}
