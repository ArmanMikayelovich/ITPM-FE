import {promptValue} from "../App";
import {checkComfirm} from "./confirm";

export function onLinkClickAction(event) {
    checkComfirm(promptValue, event);
}