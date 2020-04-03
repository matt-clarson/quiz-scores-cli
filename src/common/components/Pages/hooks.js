"use strict";
exports.__esModule = true;
var react_1 = require("react");
var context_1 = require("./context");
exports.usePages = function () {
    var _a = react_1.useContext(context_1["default"]), page = _a.page, setPage = _a.setPage, pageState = _a.pageState, setPageState = _a.setPageState;
    var setPageAndState = function (page, state) {
        setPage(page);
        setPageState(state);
    };
    return [page, pageState, setPageAndState];
};
