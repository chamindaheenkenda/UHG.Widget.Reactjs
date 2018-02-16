import * as React from "react";
import * as ReactDOM from "react-dom";
import EFormApp from "./components/eFormApp";
declare var jquery: any;
declare var $: any;
declare var Sidebar: any;
declare var ko: any;
declare var patientName: any;

class Main extends React.Component<any,any>{

    constructor(props: any) {                
        super(props);        
        console.log("constructor");                  
        this.mdEventHandler = this.mdEventHandler.bind(this)
        this.demographicRequestHandler = this.demographicRequestHandler.bind(this)
        this.getCurrentPatientId = this.getCurrentPatientId.bind(this)
        this.state = {patientId:0, patientFirstName:'', patientSurname:''};              
    }        
    
    providerHandler()
    {

    }

    practiceResponse()
    {

    }

    errorHandler()
    {

    }

    demographicRequestHandler(data)
    {                
        //alert('demographicRequestHandler');        
        //this.setState({ patientFirstName: ('FirstName' in data.Demographics) ? data.Demographics.FirstName : "" });
        //this.setState({ patientSurname: ('Surname' in data.Demographics) ? data.Demographics.Surname : "" });
        //alert(this.state.patientFirstName);
    }

    mdEventHandler(t)
    {
        switch (t.Topic.Name) {
            case 'hcn.md3.clinicalwindow.closed':
                //alert('Patient closed');     
                this.getCurrentPatientId();           
                break;
            case 'hcn.md3.clinicalwindow.ready':
            case 'hcn.md3.currentpatient.changed':
                //alert('Patient Changed');       
                this.getCurrentPatientId();          
                break;
        }
    }

    patientOpen() {                     
        return this.getCurrentPatientId() != null;
    };

    getCurrentPatientId() {        
        debugger;
        try {            
            this.setState({ patientId: Sidebar.Settings.readPropertyBagValue('hcn.md3.openpatient.id') });
        } catch (error) {
            return 0;
        }        
        return this.state.patientId;
    }

    dispose() {
        Sidebar.Events.unsubscribe(Sidebar.Envoy.onDemographicsResponse, this.demographicRequestHandler);
        Sidebar.Events.unsubscribe(Sidebar.Esp.onMDEvent, this.mdEventHandler);        
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

        if (this.patientOpen()) {
            Sidebar.Settings.sendDemographicsRequest({
                'PatientID': this.getCurrentPatientId()             
            });
            console.log(this.getCurrentPatientId());   
        }
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
        this.dispose();
    }

    render(){
        return (   
            <div>
                <div>        
                    <h2>Testing MD sidebar API</h2>
                </div>                 
                <div> 
                    <EFormApp patientId={this.state.patientId} patientFirstName={this.state.patientFirstName}/>
                </div>                
            </div>
        );
    }
}
 
ReactDOM.render(<Main/>, document.getElementById("main"));


  


