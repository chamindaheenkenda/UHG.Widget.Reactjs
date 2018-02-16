var uhg = uhg || {};

uhg.logging = function(baseUrl, $, undefined) {
    var timeoutId;
    var errors = [];
    var isUndefined = function(object) {
        return (typeof object === 'undefined');
    };


    /// Add a logEntry to the errors collection and extend the timeout window
    /// The idea is to bundle several errors together to avoid exdessive POSTs to the server
    var logError = function(logEntry) {
        try {
            if (isUndefined(timeoutId)) {
                // stop any pending flush
                clearTimeout(timeoutId);
            }

            try {
                if (!isUndefined(global_practiceObj)) logEntry.PracticeId = global_practiceObj.Practiceid || 'Unavailable';
            }
            catch (err) {
                logEntry.PracticeId = 'Unavailable';
            }
            try {
                if (!isUndefined(global_doctorKey)) logEntry.DoctorId = global_doctorKey || 'Unavailable';
            }
            catch (err) {
                logEntry.DoctorId = 'Unavailable';
            }
            try {
                if (!isUndefined(global_mediRequest)) logEntry.CaseId = global_mediRequest.CaseId || 'Unavailable';
            }
            catch (err) {
                logEntry.CaseId = 'Unavailable';
            }
            try {
                if (!isUndefined(widgetVersionConfig)) logEntry.WidgetVersion = widgetVersionConfig || 'Unavailable';
            }
            catch (err) {
                logEntry.WidgetVersion = 'Unavailable - Older than 3.0.646';
            }
            try {
                if (!isUndefined(global_mdVersion)) logEntry.MdVersion = global_mdVersion || 'Unavailable';
            }
            catch (err) {
                logEntry.MdVersion = 'Unavailable';
            }

            errors.push(logEntry);
            console.log(toString(logEntry));

            // restart the timout window
            timeoutId = setTimeout(submitErrors, 500);
        } catch(e) {
            clearErrors();
        }
    };

    var toString = function(logEntry) {
        var result = '';
        for (var property in logEntry) {
            if (logEntry.hasOwnProperty(property)) {
                result += property + ':\t' + logEntry[property] + '\r\n';
            }
        }
        return result;
    };

    /// Flush errors to server
    /// This is called if there have been no further errors logged in the timeout window
    var submitErrors = function() {
        try {
            if (isUndefined(timeoutId)) {
                // stop any pending flush. 
                clearTimeout(timeoutId);
            }
            
            var headers = { 'Content-Type': 'application/json', 'digest': getDigest()  };

            $.ajax({
                url: baseUrl + 'Log',
                headers: headers,
                type: 'POST',
                dataType: 'json',
                crossdomain: true,
                traditional: true,
                data: JSON.stringify({ clientLogEntries: errors }),                
                error: function(data) { console.log('ajax post failed', data); }
            });

        } catch(e) {
        } finally {
            // empty the errors collection
            clearErrors();
        }
    };

    /// Handle errors. Create a logEntry and queue it.
    var handleError = function (error, file, lineNumber) {
        try {
            var logEntry = {
                Error: error,
                File: file,
                Line: lineNumber,
                Time: new Date(),
                UserAgent: navigator.userAgent,
                PracticeId: '',
                DoctorId: '',
                CaseId: '',
                WidgetVersion: '',
                MdVersion: '',
                LogLevel: 'Error'
            };

            logError(logEntry);

        } catch(e) {
            clearErrors();
            console.log('error on posting log', e);
        }

        return true;
    };

    /// Handle info messages. Create a logEntry and queue it.
    var handleInfo = function (error, file, lineNumber) {
        try {
            var logEntry = {
                Error: error,
                File: file,
                Line: lineNumber,
                Time: new Date(),
                UserAgent: navigator.userAgent,
                PracticeId: '',
                DoctorId: '',
                CaseId: '',
                WidgetVersion: '',
                MdVersion: '',
                LogLevel: 'Info'
            };

            logError(logEntry);

        } catch (e) {
            clearErrors();
            console.log('error on posting log', e);
        }

        return true;
    };
 
    /// Clear any pending errors and reset timeoutId
    var clearErrors = function() {
        try {
            if (isUndefined(timeoutId)) {
                clearTimeout(timeoutId);
                timeoutId = undefined;
            }
            errors.length = 0;
            errors = [];
        } catch(e) {
        }
    };

    var throwError = function() {
        throw 'test error';
    };

    return {
        onError: handleError,
        logInfo: handleInfo,
        throwError: throwError
    };
};
