"use strict";
exports.__esModule = true;
var react_1 = require("react");
var page = "";
var pageState = {};
var setPage = function (_) { };
var setPageState = function (_) { };
exports["default"] = react_1.createContext({
    page: page,
    pageState: pageState,
    setPage: setPage,
    setPageState: setPageState
});
