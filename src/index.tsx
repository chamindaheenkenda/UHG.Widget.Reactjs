import * as React from "react";
import * as ReactDOM from "react-dom";
import EFormApp from "./components/eFormApp";
declare var jquery: any;
declare var $: any;
declare var Sidebar: any;
declare var ko: any;

class Main extends React.Component<any,any>{

    providerHandler()
    {

    }

    practiceResponse()
    {

    }

    errorHandler()
    {

    }

    demographicRequestHandler()
    {

    }

    mdEventHandler()
    {

    }

    saveDocumentBase64ResponseHandler()
    {

    }

    patientOpen() {
        return this.getCurrentPatientId() != null;
    };

    getCurrentPatientId() {
        var patientId;
        debugger;
        try {
            patientId = Sidebar.Settings.readPropertyBagValue('hcn.md3.openpatient.id');
        } catch (error) {
            return 0;
        }        

        if (patientId === '""') {
            return null;
        }
        if (patientId === "") {
            return null;
        }
        //if (patientId.toString().indexOf(',') >= 0) {
        //    patientId = substring(patientId.toString().lastIndexOf(',') + 1, patientId.length - 1);
        //}
        return $.trim(patientId);
    }

    dispose() {
        Sidebar.Events.unsubscribe(Sidebar.Envoy.onDemographicsResponse, this.demographicRequestHandler);
        Sidebar.Events.unsubscribe(Sidebar.Esp.onMDEvent, this.mdEventHandler);
        Sidebar.Events.unsubscribe(Sidebar.Dms.onSaveDocumentBase64Response, this.saveDocumentBase64ResponseHandler);
        ko.cleanNode(document.body);
    };

    initialize()
    {        
        debugger;    
        console.log("initialize");        
        $.support.cors = true;
        debugger;
        Sidebar.Events.subscribe(Sidebar.Envoy.onPractitionerResponse, this.providerHandler);
        Sidebar.Events.subscribe(Sidebar.Envoy.onPracticeResponse, this.practiceResponse);
        Sidebar.Events.subscribe(Sidebar.Settings.onSidebarError, this.errorHandler);
        Sidebar.Events.subscribe(Sidebar.Settings.onDataRequestPermissionDenied,        
        function () {
            console.log("Permission Denied"); 
        });

        Sidebar.Events.subscribe(Sidebar.Envoy.onDemographicsResponse, this.demographicRequestHandler);
        Sidebar.Events.subscribe(Sidebar.Esp.onMDEvent, this.mdEventHandler);
        Sidebar.Events.subscribe(Sidebar.Dms.onSaveDocumentBase64Response, this.saveDocumentBase64ResponseHandler);

        if (this.patientOpen()) {
            Sidebar.Settings.sendDemographicsRequest({
                'PatientID': this.getCurrentPatientId()             
            });
            console.log(this.getCurrentPatientId());   
        }
    }

    constructor(props: any) {                
        super(props);        
        console.log("constructor");                
    }        

    componentWillMount(){
        console.log("componentWillMount");
        if (("envoySend" in window.external)) {           
        }        
        this.initialize();
    }

    componentDidMount(){
        console.log("componentDidMount");
    }

    componentWillUpdate(){
        console.log("componentWillUpdate");
    }    
    
    componentDidUpdate(){
        console.log("componentDidUpdate");
    }   
    
    componentWillUnmount(){
        console.log("componentWillUnmount");
    }

    render(){
        return (   
            <div>
                <div>        
                    <h2>Testing MD sidebar API</h2>
                </div>                 
                <div> 
                    <EFormApp/>
                </div>                
            </div>
        );
    }
}
 
ReactDOM.render(<Main/>, document.getElementById("main"));


  


