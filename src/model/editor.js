/**
 * Created by yeanzhi on 17/5/20.
 */
'use strict';
import {observable} from 'mobx';
class Editor {
    @observable state = {};
}
let editor = new Editor();
export default editor;
