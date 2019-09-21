"use strict";

exports.__esModule = true;
exports["default"] = Ajax;

function Ajax() {
  if (process.env.NODE_ENV === 'development') {
    console.log('Welcome to development');
  }

  console.log('ajax123456777');
}