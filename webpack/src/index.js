import _ from "lodash";
import { add } from "./calc.js";

function component() {
  var element = document.createElement("div");

  /* lodash is required for the next line to work */
  element.innerHTML = _.join(["Hello", "webpack", add(2, 3)], " ");

  return element;
}

document.body.appendChild(component());