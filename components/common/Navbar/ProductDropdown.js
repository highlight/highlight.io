"use strict";
exports.__esModule = true;
var react_1 = require("@headlessui/react");
var Typography_1 = require("../Typography/Typography");
var react_2 = require("react");
var fa_1 = require("react-icons/fa");
var products_1 = require("../../Products/products");
var ProductDropdown_module_scss_1 = require("./ProductDropdown.module.scss");
var classnames_1 = require("classnames");
var link_1 = require("next/link");
var ProductDropdown = function (_a) {
    var isOpen = _a.isOpen;
    var _b = (0, react_2.useState)(false), isShowing = _b[0], setIsShowing = _b[1];
    var frontendLinks = Object.values(products_1.PRODUCTS).filter(function (product) { return !product.isBackend; });
    var backendLinks = Object.values(products_1.PRODUCTS).filter(function (product) { return product.isBackend; });
    return (<react_1.Popover>
      {function (_a) {
            var _b;
            var open = _a.open;
            return (<>
          <react_1.Popover.Button onMouseEnter={function () { return setIsShowing(true); }} onMouseLeave={function () { return setIsShowing(true); }} className={ProductDropdown_module_scss_1["default"].popoverButton}>
            <a className={(0, classnames_1["default"])(ProductDropdown_module_scss_1["default"].headerButton, (_b = {},
                    _b[ProductDropdown_module_scss_1["default"].white] = isShowing,
                    _b))}>
              <div className="flex gap-[6.5px] items-center">
                <Typography_1.Typography type="copy2">
                  Product
                </Typography_1.Typography>
                <fa_1.FaChevronDown className="w-[10px]"/>
              </div>
            </a>
          </react_1.Popover.Button>
          <react_1.Transition show={isShowing} onMouseEnter={function () { return setIsShowing(true); }} onMouseLeave={function () { return setIsShowing(true); }} enter="transition ease-out duration-200" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0" leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1">
            {!isOpen && <react_1.Popover.Panel className={ProductDropdown_module_scss_1["default"].popover}>
              <div className={ProductDropdown_module_scss_1["default"].popoverPanel}>
                <div className={ProductDropdown_module_scss_1["default"].gridContainer}>
                  <div className={ProductDropdown_module_scss_1["default"].innerContainer}>
                    <div className={ProductDropdown_module_scss_1["default"].innerGridLeft}>
                      <div className={ProductDropdown_module_scss_1["default"].}>
                        Frontend
                      </div>
                      <div>
                        Backend
                      </div>
                      <div>
                        Fullstack
                      </div>
                    </div>
                  </div>
                  <div className={ProductDropdown_module_scss_1["default"].innerContainer}>
                    <div>
                      <Typography_1.Typography type="copy4" className="pl-2 text-color-copy-on-light">
                        Backend
                      </Typography_1.Typography>
                    </div>
                    <div className={ProductDropdown_module_scss_1["default"].innerGridRight}>
                      {backendLinks.map(function (item, index) { return (<link_1["default"] key={index} href={"/for/" + item.slug} className={ProductDropdown_module_scss_1["default"].link}>
                          <Typography_1.Typography type="copy3">
                            {item.title}
                          </Typography_1.Typography>
                        </link_1["default"]>); })}
                    </div>
                  </div>
                </div>
              </div>
            </react_1.Popover.Panel>}
          </react_1.Transition>
        </>);
        }}
    </react_1.Popover>);
};
exports["default"] = ProductDropdown;
