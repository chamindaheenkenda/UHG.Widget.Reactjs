// Class used to store the medical request data in memory (global variable object in the widget: global_mediRequest)

MedicalRequest = function () {
    var me = this;

    me.DoctorKey = global_doctorKey;
    me.ClinicKey = global_practiceObj ? global_practiceObj.Practiceid : '';
    me.DoctorFirstName = null;
    me.DoctorLastName = null;
    me.UniqueToken = null;
    me.PatientId = null;
    me.PatientFirstName = null;
    me.PatientSurname = null;
    me.PatientDob = null;
    me.PatientGender = null;
    me.ReResponse = null;
    me.CaseId = null;
    me.ReportNotSaved = false;

    // keep track of data with errors
    me.ErrorOnAllergies = false;
    me.ErrorOnClinicalDataList = false;
    me.ErrorOnConsultations = false;
    me.ErrorOnHistoryList = false;
    me.ErrorOnImmunisations = false;
    me.ErrorOnDiagnosisList = false;
    me.ErrorOnMeasurements = false;
    me.ErrorOnPathologyResults = false;
    me.ErrorOnPrescriptions = false;
    me.ErrorOnTestRequests = false;
    me.ErrorOnRxData = false;
    me.ErrorOnDocuments = false;

    // Using knockout observable arrays for simple UI binding for producing the FileCopyHtmlData property
        me.PatientDemographics = null;
        me.Allergies = ko.observableArray([]);
        me.ClinicalDataList = ko.observableArray([]);
        me.Consultations = ko.observableArray([]);
        me.HistoryList = ko.observableArray([]);
        me.Immunisations = ko.observableArray([]);
        me.DiagnosisList = ko.observableArray([]);
        me.Measurements = ko.observableArray([]);
        me.PathologyResults = ko.observableArray([]);
        me.Prescriptions = ko.observableArray([]);
        me.TestRequests = ko.observableArray([]);
        me.RxData = ko.observableArray([]);
        me.Documents = ko.observableArray([]);    

    me.PrepareAndFilter = function () {

        var pocoMedicalRequest = new MedicalRequest();
        pocoMedicalRequest.DoctorKey = me.DoctorKey;
        pocoMedicalRequest.ClinicKey = me.ClinicKey;
        pocoMedicalRequest.DoctorFirstName = me.DoctorFirstName;
        pocoMedicalRequest.DoctorLastName = me.DoctorLastName;
        pocoMedicalRequest.UniqueToken = me.UniqueToken;
        pocoMedicalRequest.PatientId = me.PatientId;
        pocoMedicalRequest.PatientFirstName = me.PatientFirstName;
        pocoMedicalRequest.PatientSurname = me.PatientSurname;
        pocoMedicalRequest.PatientDob = me.PatientDob;
        pocoMedicalRequest.PatientGender = me.PatientGender;
        pocoMedicalRequest.ReResponse = me.ReResponse;
        pocoMedicalRequest.PatientDemographics = me.PatientDemographics;
        pocoMedicalRequest.CaseId = me.CaseId;
        pocoMedicalRequest.ReportNotSaved = me.ReportNotSaved;

        pocoMedicalRequest.ErrorOnAllergies = me.ErrorOnAllergies;
        pocoMedicalRequest.ErrorOnClinicalDataList = me.ErrorOnClinicalDataList;
        pocoMedicalRequest.ErrorOnConsultations = me.ErrorOnConsultations;
        pocoMedicalRequest.ErrorOnHistoryList = me.ErrorOnHistoryList;
        pocoMedicalRequest.ErrorOnImmunisations = me.ErrorOnImmunisations;
        pocoMedicalRequest.ErrorOnDiagnosisList = me.ErrorOnDiagnosisList;
        pocoMedicalRequest.ErrorOnMeasurements = me.ErrorOnMeasurements;
        pocoMedicalRequest.ErrorOnPathologyResults = me.ErrorOnPathologyResults;
        pocoMedicalRequest.ErrorOnPrescriptions = me.ErrorOnPrescriptions;
        pocoMedicalRequest.ErrorOnTestRequests = me.ErrorOnTestRequests;
        pocoMedicalRequest.ErrorOnRxData = me.ErrorOnRxData;
        pocoMedicalRequest.ErrorOnDocuments = me.ErrorOnDocuments;

        // Filter out the selected items only
        pocoMedicalRequest.ClinicalDataList = filterSelectedItems(me.ClinicalDataList._latestValue);
        pocoMedicalRequest.Allergies = filterSelectedItems(me.Allergies._latestValue, "allergy_");
        pocoMedicalRequest.Consultations = filterSelectedItems(me.Consultations._latestValue, "consultation_");
        pocoMedicalRequest.HistoryList = filterSelectedItems(me.HistoryList._latestValue, "history_");
        pocoMedicalRequest.Immunisations = filterSelectedItems(me.Immunisations._latestValue, "immunisation_");
        pocoMedicalRequest.DiagnosisList = filterSelectedItems(me.DiagnosisList._latestValue, "diagnosis_");
        pocoMedicalRequest.Measurements = filterSelectedItems(me.Measurements._latestValue, "measurement_");
        pocoMedicalRequest.PathologyResults = filterSelectedItems(me.PathologyResults._latestValue, "pathology_");
        pocoMedicalRequest.Prescriptions = filterSelectedItems(me.Prescriptions._latestValue, "prescription_");
        pocoMedicalRequest.TestRequests = filterSelectedItems(me.TestRequests._latestValue, 'testrequest_');
        pocoMedicalRequest.RxData = filterSelectedItems(me.RxData._latestValue, "rx_");
        pocoMedicalRequest.Documents = filterSelectedItems(me.Documents._latestValue, "document_");

        return pocoMedicalRequest;
    };

    var filterSelectedItems = function (data, prefix) {
        // Perform similar loop to the loading of data so that scripts error does not show
        var output = [];
        var i = 0;

        // Self calling ...
        (function () {
            for (; i < data.length; i++) {
                if (prefix !== undefined) {
                    // Convention - use prefix with the index to determine the element in the Dom
                    var selected = document.getElementById(prefix + i).checked;
                    if (selected) {
                        data[i].Selected = true;
                        output.push(data[i]);
                    }
                } else {
                    // If you come in here it means there is no UI Component (i.e. Clinical Data)
                    output.push(data[i]);
                }

                // Recursively call itself to trick the browser that it does not have too much to process
                if (i % 10 == 0) {
                    i++;
                    arguments.callee();
                    break;
                }
            }
        })();
        return output;
    };
};