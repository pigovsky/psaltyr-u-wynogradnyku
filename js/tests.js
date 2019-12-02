const tests = [
    {
        code: "katyzmaNumberIsCorrectlyCountedOnNonPasltyrDay",
        func: function() {
            const viewStartDate = new Date("2019-11-28T12:00:00Z");
            const table = getCalendarTable(viewStartDate);
            const personRow = searchRow(table, r => r[0] == 'Піговський Юрій');
            const col = table[0].indexOf('29 листопада 2019 (ПТ)');
            assertEqual('13*', personRow[col]);
        }
    },
    {
        code: "katyzmaNumberIsCorrectlyCountedOnPasltyrDay",
        func: function() {
            const viewStartDate = new Date("2019-11-29T12:00:00Z");
            const table = getCalendarTable(viewStartDate);
            const personRow = searchRow(table, r => r[0] == 'Піговський Юрій');
            const col = table[0].indexOf('29 листопада 2019 (ПТ)');
            assertEqual('13*', personRow[col]);
        }
    },
    {
        code: "katyzmaNumberIsCorrectlyCountedOnPastPasltyrDay",
        func: function() {
            const viewStartDate = new Date("2019-11-04T12:00:00Z");
            const table = getCalendarTable(viewStartDate);
            const personRow = searchRow(table, r => r[0] == 'Піговський Юрій');
            const col = table[0].indexOf('15 листопада 2019 (ПТ)');
            assertEqual('7', personRow[col]);
        }
    },
    {
        code: "katyzmaNumberIsCorrectlyCountedOnPastNonPasltyrDay",
        func: function() {
            const viewStartDate = new Date("2019-11-05T12:00:00Z");
            const table = getCalendarTable(viewStartDate);
            const personRow = searchRow(table, r => r[0] == 'Піговський Юрій');
            const col = table[0].indexOf('15 листопада 2019 (ПТ)');
            assertEqual('7', personRow[col]);
        }
    },
    {
        code: "katyzmaNumberIsCorrectlyCycled",
        func: function() {
            const viewStartDate = new Date("2019-12-05T12:00:00Z");
            const table = getCalendarTable(viewStartDate);
            const personRow = searchRow(table, r => r[0] == 'Піговський Юрій');
            const col = table[0].indexOf('18 грудня 2019 (СР)');
            assertEqual('1', personRow[col]);
        }
    },
];

function searchRow(table, predicate) {
    for (var i=0; i<table.length; i++) {
        const row = table[i];
        if (predicate(row)) {
            return row;
        }
    }
}

function assertEqual(expected, actual) {
    if (expected != actual) {
        const message = "AssertError. Expected: " + expected 
            + ". Actual: " + actual;
        console.error(message);
        debugger;
        throw message;
    }
}

function test() {
    tests.forEach (test => {
        test.func()
        const msg = test.code + " +";
        logSuccess(msg);
    });
    logSuccess("All tests passed successfully")
}

function logSuccess(msg) {
    console.log('%c' + msg, 'color:green; font-weight:bold;');
}