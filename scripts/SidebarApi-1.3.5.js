if (typeof $ == "undefined") throw "SidebarApi requires jQuery";

if (!("envoySend" in window.external))
{
    alert("Medical Director IHtmlMessenger interface for scripting not found. This widget requires Medical Director");
}

var Sidebar = {
    Publisher: function () {
        try {
            this.subscribers = [];
        } catch (e) {
            alert(e);
        }
    }
};

Sidebar.Publisher.prototype.deliver = function (data) {
    for (var i = 0; i < this.subscribers.length; i++)
        this.subscribers[i](data);
    return this;
};

Sidebar.Events = (function () {
    return {

        hcnOnly: {
            subscribers: [],
            subscribe: function (eventName, callback) {
                var exists = false;
                var matchingSubscribers = $.each(Sidebar.Events.hcnOnly.subscribers, function (sub) {
                    if (sub.callback === callback) {
                        exists = true;
                        return false;
                    }
                });

                if (!exists)
                    Sidebar.Events.hcnOnly.subscribers.push({ eventName: eventName, callback: callback });
                return callback;
            },
            deliver: function (eventName, data) {
                $.each(Sidebar.Events.hcnOnly.subscribers, function (i, subscription) {
                    if (subscription.eventName == eventName)
                        subscription.callback(data);
                });
            }
        },
        subscribe: function (publisher, subscriber) {
            var that = subscriber;
            var matchingSubscribers = $.each(publisher.subscribers,
            function (el) {
                if (el === that) {
                    return;
                }
            });
            if (matchingSubscribers.length == 0) {
                publisher.subscribers.push(subscriber);
            }
            return subscriber;
        },
        unsubscribe: function (publisher, subscriber) {
            var index = $.inArray(subscriber, publisher.subscribers);
            if (index != -1) {
                publisher.subscribers.splice(index, 1);
            }
            return subscriber;
        }
    };
})();

Sidebar.Settings = (function () {
    var sideBarSettingStore = window.external;

    return {
        //Public Methods
        sideBarSettingStore: sideBarSettingStore,
        getSetting: function (key) {
            return this.sideBarSettingStore.GetSettings(key);
        },
        getPracticeSetting: function (key) {
            return this.sideBarSettingStore.GetPracticeSettings(key);
        },
        saveSetting: function (key, value) {

            this.sideBarSettingStore.SaveSetting(key, value);
            var data = { key: key, value: value };

        },
        savePracticeSetting: function (key, value) {
            this.sideBarSettingStore.SavePracticeSetting(key, value);
            var data = { key: key, value: value };

        },
        updateSettings: function () {
            var data = null;
            this.onSettingsSaved.deliver(data);
        },
        canSaveAllSettings: function () {
            var eventArgs = { canProceed: true };
            Sidebar.Settings.onSettingsSaving.deliver(eventArgs);
            if (eventArgs.canProceed) {
                Sidebar.Settings.onSettingsSaved.deliver(eventArgs);
            }
            return eventArgs.canProceed;
        },
        sidebarError: function (e) {
            this.onSidebarError.deliver(e);
        },
        dataRequestPermissionDenied: function (e) {
            this.onDataRequestPermissionDenied.deliver(e);
        },
        envoySend: function (t, r, requestPrivateFields) {
            var j = JSON.stringify(r);
            try {
                this.sideBarSettingStore.EnvoySend(t, j, requestPrivateFields == true ? "true" : "false");
            }
            catch (e) { alert(e.message); }
        },
        addProgressNote: function (p, h, b, n, s) {
            this.sideBarSettingStore.AddProgressNote(p, h, b, n, s);
        },
        showNotification: function (title, message) {
            this.sideBarSettingStore.showNotification(title, message);
        },
        readPropertyBagValue: function (v) {
            return this.sideBarSettingStore.readPropertyBagValue(v);
        },
        writePropertyBagValue: function (v) {
            this.sideBarSettingStore.writePropertyBagValue(v);
        },
        sendAllergyRequest: function (r) {
            this.envoySend("GetAllergyRequest", r);
        },
        sendClinicalRequest: function (r) {
            this.envoySend("GetClinicalRequest", r);
        },
        sendConsultationRequest: function (r) {
            this.envoySend("GetConsultationRequest", r);
        },
        sendDemographicsRequest: function (r) {
            this.envoySend("GetDemographicsRequest", r);
        },
        sendDiagnosisRequest: function (r) {
            this.envoySend("GetDiagnosisRequest", r);
        },
        sendHistoryRequest: function (r) {
            this.envoySend("GetHistoryRequest", r);
        },
        sendImmunisationRequest: function (r) {
            this.envoySend("GetImmunisationRequest", r);
        },
        sendMeasurementRequest: function (r) {
            this.envoySend("GetMeasurementRequest", r);
        },
        sendPathologyRequest: function (r) {
            this.envoySend("GetPathologyRequest", r);
        },
        sendPathologyAtomRequest: function (r) {
            this.envoySend("GetPathologyAtomRequest", r);
        },
        sendPracticeRequest: function (r) {
            this.envoySend("GetPracticeRequest", r);
        },
        sendPrescriptionRequest: function (r) {
            this.envoySend("GetPrescriptionRequest", r);
        },
        sendTestRequestRequest: function (r) {
            this.envoySend("GetTestRequestRequest", r);
        },
        sendRXRequest: function (r) {
            this.envoySend("GetRXRequest", r);
        },
        sendPractitionerRequest: function (r, includeRestrictedFields) {
            this.envoySend("GetPractitionerRequest", r, includeRestrictedFields);
        },
        sendDocumentListRequest: function (r) {
            if (typeof this.sideBarSettingStore.GetDocumentList !== 'undefined') {
                this.sideBarSettingStore.GetDocumentList(JSON.stringify(r));
            }
        },
        sendDocumentBase64Request: function (r) {
            if (typeof this.sideBarSettingStore.GetDocumentBase64 !== 'undefined') {
                this.sideBarSettingStore.GetDocumentBase64(JSON.stringify(r));
            }
        },
        sendDocumentSizeRequest: function (r) {
            if (typeof this.sideBarSettingStore.GetDocumentSize !== 'undefined') {
                this.sideBarSettingStore.GetDocumentSize(JSON.stringify(r));
            }
        },
        sendSaveDocumentBase64Request: function (r) {
            if (typeof this.sideBarSettingStore.SaveDocumentBase64 !== 'undefined') {
                this.sideBarSettingStore.SaveDocumentBase64(JSON.stringify(r));
            }
        },
        sendGetNumberOfFilesInTheDocumentRequest: function (patientId, documentGuid) {
            if (typeof this.sideBarSettingStore.GetNumberOfFilesInTheDocument !== 'undefined') {
                this.sideBarSettingStore.GetNumberOfFilesInTheDocument(patientId, documentGuid);
            }
        },
        sendGetBase64EncodedCompressedFileInBlocksRequest: function (r) {
            if (typeof this.sideBarSettingStore.GetBase64EncodedCompressedFileInBlocks !== 'undefined') {
                this.sideBarSettingStore.GetBase64EncodedCompressedFileInBlocks(JSON.stringify(r));
            }
        },
        sendAddNotificationRequest: function () {
            if (typeof this.sideBarSettingStore.AddNotification !== 'undefined') {
                this.sideBarSettingStore.AddNotification();
            }
        },
        sendSubtractNotificationRequest: function () {
            if (typeof this.sideBarSettingStore.SubtractNotification !== 'undefined') {
                this.sideBarSettingStore.SubtractNotification();
            }
        },
        sendSetNotificationCountRequest: function (n) {
            if (typeof this.sideBarSettingStore.SetNotificationCount !== 'undefined') {
                this.sideBarSettingStore.SetNotificationCount(n);
            }
        },
        restartFileRetrieval: function (r) {
            if (typeof this.sideBarSettingStore.RestartFileRetrieval !== 'undefined') {
                this.sideBarSettingStore.RestartFileRetrieval(JSON.stringify(r));
            }
        },
        layoutWidget: function () {
            window.external.LayoutWidget()
        },
        ShowFlyout: function () {
            window.external.ShowFlyout();
        },
        getFlyoutObject: function () {
            return window.external.GetFlyoutModelObject();
        },
        setFlyoutObject: function (value) {
            window.external.SetFlyoutModelObject(JSON.stringify(value));
        },
        checkRequestPermission: function (requestPermissionId) {
            return this.sideBarSettingStore.CheckRequestPermission(requestPermissionId);
        },
        selectLetterTemplate: function () {
            return this.sideBarSettingStore.SelectLetterTemplate();
        },
        openLetterTemplate: function (r) {
            this.sideBarSettingStore.OpenLetterTemplate(JSON.stringify(r));
        },
        selectAndOpenLetterTemplate: function (r) {
            this.sideBarSettingStore.SelectAndOpenLetterTemplate(JSON.stringify(r));
        },
        getLetterTemplateList: function (templateType) {
            this.sideBarSettingStore.GetLetterTemplateList(templateType);
        },
        OpenUrlInDefaultBrowser: function (url) {
            this.sideBarSettingStore.OpenUrlInDefaultBrowser(url);
        },
        sendAddressBookRequest: function () {
            if (typeof this.sideBarSettingStore.GetAddressBook !== "undefined") {
                this.sideBarSettingStore.GetAddressBook();
            }
        },
        sendMBSClaimsStatusRequest: function (patientId, itemNumbers) {
            if (typeof this.sideBarSettingStore.GetMBSClaimsStatus != "undefined") {
                this.sideBarSettingStore.GetMBSClaimsStatus(patientId, itemNumbers);
            }
        },
        sendGetUserListRequest: function () {
            if (typeof this.sideBarSettingStore.GetUserList != "undefined") {
                this.sideBarSettingStore.GetUserList();
            }
        },
        sendSearchPatientsRequest: function (surname, first_name) {
            if (typeof this.sideBarSettingStore.SearchPatients != "undefined") {
                this.sideBarSettingStore.SearchPatients(surname, first_name);
            }
        },
        sendSetUserNameRequest: function (r) {
            if (typeof this.sideBarSettingStore.SetUserName != "undefined") {
                this.sideBarSettingStore.SetUserName(JSON.stringify(r));
            }
        }
    };
})();

Sidebar.LifeCycle = (function () {
    return {
        showSettings: function () {
            this.onShowSettings.deliver();
        },
        unload: function () {
            this.onUnload.deliver();
        },
        visibilityChanged: function (data) {
            this.onVisibilityChanged.deliver(data);
        }
    };
})();

Sidebar.Esp = (function () {
    return {
        processEspEvent: function (data) {
            this.onMDEvent.deliver(data);
        },
        processAddressBookResponse: function (data) {
            this.onAddressBookResponse.deliver(data);
        },
        processMBSClaimsStatusResponse: function (data) {
            this.onMBSClaimsStatusResponse.deliver(data);
        },
        processGetUserListResponse: function (data) {
            this.onGetUserListResponse.deliver(data);
        },
        processSearchPatientsResponse: function (data) {
            this.onSearchPatientsResponse.deliver(data);
        }
    };
})();

Sidebar.UI = (function () {
    return {
        processUIEvent: function (data) {
            this.onMDEvent.deliver(data);
        }
    };
})();

Sidebar.Envoy = (function () {
    return {
        processAllergyResponse: function (data) {
            this.onAllergyResponse.deliver(data);
        },
        processClinicalResponse: function (data) {
            this.onClinicalResponse.deliver(data);
        },
        processConsultationResponse: function (data) {
            this.onConsultationResponse.deliver(data);
        },
        processDemographicsResponse: function (data) {
            this.onDemographicsResponse.deliver(data);
        },
        processDiagnosisResponse: function (data) {
            this.onDiagnosisResponse.deliver(data);
        },
        processHistoryResponse: function (data) {
            this.onHistoryResponse.deliver(data);
        },
        processImmunisationResponse: function (data) {
            this.onImmunisationResponse.deliver(data);
        },
        processMeasurementResponse: function (data) {
            this.onMeasurementResponse.deliver(data);
        },
        processPathologyResponse: function (data) {
            this.onPathologyResponse.deliver(data);
        },
        processPathologyAtomResponse: function (data) {
            this.onPathologyAtomResponse.deliver(data);
        },
        processPracticeResponse: function (data) {
            this.onPracticeResponse.deliver(data);
        },
        processPrescriptionResponse: function (data) {
            this.onPrescriptionResponse.deliver(data);
        },
        processTestRequestResponse: function (data) {
            this.onTestRequestResponse.deliver(data);
        },
        processRXResponse: function (data) {
            this.onRXResponse.deliver(data);
        },
        processPractitionerResponse: function (data) {
            this.onPractitionerResponse.deliver(data);
        }
    };
})();

Sidebar.Dms = (function () {
    return {
        processDocumentListResponse: function (data) {
            this.onDocumentListResponse.deliver(data);
        },
        processDocumentSizeResponse: function (data) {
            this.onDocumentSizeResponse.deliver(data);
        },
        processDocumentBase64Response: function (data) {
            this.onDocumentBase64Response.deliver(data);
        },
        processSaveDocumentBase64Response: function (data) {
            this.onSaveDocumentBase64Response.deliver(data);
        },
        processGetNumberOfFilesInTheDocumentResponse: function (data) {
            this.onGetNumberOfFilesInTheDocumentResponse.deliver(data);
        },
        processGetBase64EncodedCompressedFileInBlocksResponse: function (data) {
            this.onGetBase64EncodedCompressedFileInBlocksResponse.deliver(data);
        }
    };
})();

Sidebar.Settings.onSettingsSaving = new Sidebar.Publisher();
Sidebar.Settings.onSettingsSaved = new Sidebar.Publisher();

Sidebar.Settings.onSidebarError = new Sidebar.Publisher();
Sidebar.Settings.onDataRequestPermissionDenied = new Sidebar.Publisher();

Sidebar.LifeCycle.onShowSettings = new Sidebar.Publisher();
Sidebar.LifeCycle.onUnload = new Sidebar.Publisher();
Sidebar.LifeCycle.onVisibilityChanged = new Sidebar.Publisher();

Sidebar.Esp.onMDEvent = new Sidebar.Publisher();
Sidebar.Esp.onAddressBookResponse = new Sidebar.Publisher();
Sidebar.Esp.onMBSClaimsStatusResponse = new Sidebar.Publisher();
Sidebar.Esp.onGetUserListResponse = new Sidebar.Publisher();
Sidebar.Esp.onSearchPatientsResponse = new Sidebar.Publisher();

Sidebar.UI.onMDEvent = new Sidebar.Publisher();

Sidebar.Envoy.onAllergyResponse = new Sidebar.Publisher();
Sidebar.Envoy.onClinicalResponse = new Sidebar.Publisher();
Sidebar.Envoy.onConsultationResponse = new Sidebar.Publisher();
Sidebar.Envoy.onDemographicsResponse = new Sidebar.Publisher();
Sidebar.Envoy.onDiagnosisResponse = new Sidebar.Publisher();
Sidebar.Envoy.onHistoryResponse = new Sidebar.Publisher();
Sidebar.Envoy.onImmunisationResponse = new Sidebar.Publisher();
Sidebar.Envoy.onMeasurementResponse = new Sidebar.Publisher();
Sidebar.Envoy.onPathologyResponse = new Sidebar.Publisher();
Sidebar.Envoy.onPathologyAtomResponse = new Sidebar.Publisher();
Sidebar.Envoy.onPracticeResponse = new Sidebar.Publisher();
Sidebar.Envoy.onPrescriptionResponse = new Sidebar.Publisher();
Sidebar.Envoy.onTestRequestResponse = new Sidebar.Publisher();
Sidebar.Envoy.onRXResponse = new Sidebar.Publisher();
Sidebar.Envoy.onPractitionerResponse = new Sidebar.Publisher();

Sidebar.Dms.onDocumentListResponse = new Sidebar.Publisher();
Sidebar.Dms.onDocumentBase64Response = new Sidebar.Publisher();
Sidebar.Dms.onSaveDocumentBase64Response = new Sidebar.Publisher();
Sidebar.Dms.onDocumentSizeResponse = new Sidebar.Publisher();
Sidebar.Dms.onGetNumberOfFilesInTheDocumentResponse = new Sidebar.Publisher();
Sidebar.Dms.onGetBase64EncodedCompressedFileInBlocksResponse = new Sidebar.Publisher();

function hookAlert() {
    var proxied = window.alert;
    window.alert = function () {
        Sidebar.Settings.showNotification(arguments[1], arguments[0]);
    };
}

function hookWindowOpen() {
    var windowOpen = window.open;
    window.open = function (url, name, features) {
        if (url !== undefined && url !== "") {
            Sidebar.Settings.OpenUrlInDefaultBrowser(url);
        }
        else {
            windowOpen();
        }
    };
}

hookAlert();
hookWindowOpen();

$(document).ready(function () {
    $("body").on("click", "*[target='_blank']", function () {
        var url = $(this).attr("href");
        if (url !== undefined && url !== "") {
            Sidebar.Settings.OpenUrlInDefaultBrowser(url);
            return false;
        }
        return true;
    });
});