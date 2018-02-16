import * as React from 'react';
import * as ReactDOM from 'react-dom';
//import eFormStore from '../stores/eFormStore';
//import eFormAction from '../actions/eFormAction';
//import EFormAppList from '../components/eFormAppList';
import {Formio} from "react-formio";

export default class eFormApp extends React.Component<{}, {}> {
    //********** React Component LifeCycle **********    

    constructor(props) {
        super(props);        
    }            

    componentDidMount() {        
        //eFormStore.addChangeListener(this.changeHandler.bind(this));                 
    }

    componentWillUnmount() {
        //eFormStore.removeChangeListener(this.changeHandler.bind(this));
        
    }

    //********** Features **********
    changeHandler() {
        //this.setState({ eForms: eFormStore.geteForms() });
    }

    public handleAddPet() {
        var neweForm = ReactDOM.findDOMNode<HTMLInputElement>(this.refs["txtT"]).value;
        //new eFormAction().createeForm(neweForm);
        ReactDOM.findDOMNode<HTMLInputElement>(this.refs["txtT"]).value = '';
    }

    //********** DOM **********
    render() {
        return (
            <div>            
                <div>Form Summary</div>
                <Formio src="https://uhg.medebridge2.com/testhidden" />                             
            </div>

        );
    }
}
