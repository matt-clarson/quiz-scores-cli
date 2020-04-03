"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_hooks_1 = require("@testing-library/react-hooks");
var Pages_1 = require("../Pages");
var hooks = require("../hooks");
describe("Pages/hooks", function () {
    describe(".usePages()", function () {
        var wrapper = function (_a) {
            var children = _a.children;
            return <Pages_1["default"]>{children}</Pages_1["default"]>;
        };
        it("should expose page and page state", function () {
            var _a = react_hooks_1.renderHook(function () { return hooks.usePages(); }, { wrapper: wrapper }).current, page = _a[0], pageState = _a[1];
            expect(page).toBe("");
            expect(pageState).toBe(undefined);
        });
    });
});
