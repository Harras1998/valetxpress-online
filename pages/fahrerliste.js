import { useState, useEffect } from "react";

// /* __JQM_SCOPE_HELPER__ */
import React, { useRef } from "react";
const JQM_CSS = `/*!
 * jQuery Mobile v1.0a3
 * http://jquerymobile.com/
 *
 * Copyright 2010, jQuery Project
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
/*!
 * jQuery Mobile v1.0a3
 * http://jquerymobile.com/
 *
 * Copyright 2010, jQuery Project
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */.ui-bar-a{border:1px solid #2a2a2a;background:#111;color:#fff;font-weight:bold;text-shadow:0 -1px 1px #000;background-image:-moz-linear-gradient(top,#3c3c3c,#111);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#3c3c3c),color-stop(1,#111));-msfilter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#3c3c3c', EndColorStr='#111111')"}.ui-bar-a,.ui-bar-a input,.ui-bar-a select,.ui-bar-a textarea,.ui-bar-a button{font-family:Helvetica,Arial,sans-serif}.ui-bar-a .ui-link-inherit{color:#fff}.ui-bar-a .ui-link{color:#7cc4e7;font-weight:bold}.ui-body-a{border:1px solid #2a2a2a;background:#222;color:#fff;text-shadow:0 1px 0 #000;font-weight:normal;background-image:-moz-linear-gradient(top,#666,#222);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#666),color-stop(1,#222));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#666666', EndColorStr='#222222)')"}.ui-body-a,.ui-body-a input,.ui-body-a select,.ui-body-a textarea,.ui-body-a button{font-family:Helvetica,Arial,sans-serif}.ui-body-a .ui-link-inherit{color:#fff}.ui-body-a .ui-link{color:#2489ce;font-weight:bold}.ui-br{border-bottom:1px solid rgba(130,130,130,.3)}.ui-btn-up-a{border:1px solid #222;background:#333;font-weight:bold;color:#fff;cursor:pointer;text-shadow:0 -1px 1px #000;text-decoration:none;background-image:-moz-linear-gradient(top,#555,#333);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#555),color-stop(1,#333));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#555555', EndColorStr='#333333')"}.ui-btn-up-a a.ui-link-inherit{color:#fff}.ui-btn-hover-a{border:1px solid #000;background:#444;font-weight:bold;color:#fff;text-shadow:0 -1px 1px #000;text-decoration:none;background-image:-moz-linear-gradient(top,#666,#444);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#666),color-stop(1,#444));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#666666', EndColorStr='#444444')"}.ui-btn-hover-a a.ui-link-inherit{color:#fff}.ui-btn-down-a{border:1px solid #000;background:#3d3d3d;font-weight:bold;color:#fff;text-shadow:0 -1px 1px #000;background-image:-moz-linear-gradient(top,#333,#5a5a5a);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#333),color-stop(1,#5a5a5a));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#333333', EndColorStr='#5a5a5a')"}.ui-btn-down-a a.ui-link-inherit{color:#fff}.ui-btn-up-a,.ui-btn-hover-a,.ui-btn-down-a{font-family:Helvetica,Arial,sans-serif}.ui-bar-b{border:1px solid #456f9a;background:#5e87b0;color:#fff;font-weight:bold;text-shadow:0 -1px 1px #254f7a;background-image:-moz-linear-gradient(top,#81a8ce,#5e87b0);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#81a8ce),color-stop(1,#5e87b0));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#81a8ce', EndColorStr='#5e87b0')"}.ui-bar-b,.ui-bar-b input,.ui-bar-b select,.ui-bar-b textarea,.ui-bar-b button{font-family:Helvetica,Arial,sans-serif}.ui-bar-b .ui-link-inherit{color:#fff}.ui-bar-b .ui-link{color:#7cc4e7;font-weight:bold}.ui-body-b{border:1px solid #c6c6c6;background:#ccc;color:#333;text-shadow:0 1px 0 #fff;font-weight:normal;background-image:-moz-linear-gradient(top,#e6e6e6,#ccc);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#e6e6e6),color-stop(1,#ccc));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#e6e6e6', EndColorStr='#cccccc')"}.ui-body-b,.ui-body-b input,.ui-body-b select,.ui-body-b textarea,.ui-body-b button{font-family:Helvetica,Arial,sans-serif}.ui-body-b .ui-link-inherit{color:#333}
 .ui-body-b .ui-link{color:#2489ce;font-weight:bold}.ui-btn-up-b{border:1px solid #145072;background:#2567ab;font-weight:bold;color:#fff;cursor:pointer;text-shadow:0 -1px 1px #145072;text-decoration:none;background-image:-moz-linear-gradient(top,#4e89c5,#2567ab);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#5f9cc5),color-stop(1,#396b9e));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#4e89c5', EndColorStr='#2567ab')"}.ui-btn-up-b a.ui-link-inherit{color:#fff}.ui-btn-hover-b{border:1px solid #00516e;background:#4b88b6;font-weight:bold;color:#fff;text-shadow:0 -1px 1px #014d68;background-image:-moz-linear-gradient(top,#72b0d4,#4b88b6);text-decoration:none;background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#72b0d4),color-stop(1,#4b88b6));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#72b0d4', EndColorStr='#4b88b6')"}.ui-btn-hover-b a.ui-link-inherit{color:#fff}.ui-btn-down-b{border:1px solid #225377;background:#4e89c5;font-weight:bold;color:#fff;text-shadow:0 -1px 1px #225377;background-image:-moz-linear-gradient(top,#396b9e,#4e89c5);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#396b9e),color-stop(1,#4e89c5));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#396b9e', EndColorStr='#4e89c5')"}.ui-btn-down-b a.ui-link-inherit{color:#fff}.ui-btn-up-b,.ui-btn-hover-b,.ui-btn-down-b{font-family:Helvetica,Arial,sans-serif}.ui-bar-c{border:1px solid #b3b3b3;background:#e9eaeb;color:#3e3e3e;font-weight:bold;text-shadow:0 1px 1px #fff;background-image:-moz-linear-gradient(top,#f0f0f0,#e9eaeb);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#f0f0f0),color-stop(1,#e9eaeb));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#f0f0f0', EndColorStr='#e9eaeb')"}.ui-bar-c,.ui-bar-c input,.ui-bar-c select,.ui-bar-c textarea,.ui-bar-c button{font-family:Helvetica,Arial,sans-serif}.ui-body-c{border:1px solid #b3b3b3;color:#333;text-shadow:0 1px 0 #fff;background:#f0f0f0;background-image:-moz-linear-gradient(top,#eee,#ddd);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#eee),color-stop(1,#ddd));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#eeeeee', EndColorStr='#dddddd')"}.ui-body-c,.ui-body-c input,.ui-body-c select,.ui-body-c textarea,.ui-body-c button{font-family:Helvetica,Arial,sans-serif}.ui-body-c .ui-link-inherit{color:#333}.ui-body-c .ui-link{color:#2489ce;font-weight:bold}.ui-btn-up-c{border:1px solid #ccc;background:#eee;font-weight:bold;color:#444;cursor:pointer;text-shadow:0 1px 1px #f6f6f6;text-decoration:none;background-image:-moz-linear-gradient(top,#fefefe,#eee);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#fdfdfd),color-stop(1,#eee));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#fdfdfd', EndColorStr='#eeeeee')"}.ui-btn-up-c a.ui-link-inherit{color:#2f3e46}.ui-btn-hover-c{border:1px solid #bbb;background:#dadada;font-weight:bold;color:#101010;text-decoration:none;text-shadow:0 1px 1px #fff;background-image:-moz-linear-gradient(top,#ededed,#dadada);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#ededed),color-stop(1,#dadada));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#ededed', EndColorStr='#dadada')"}.ui-btn-hover-c a.ui-link-inherit{color:#2f3e46}.ui-btn-down-c{border:1px solid #808080;background:#fdfdfd;font-weight:bold;color:#111;text-shadow:0 1px 1px #fff;background-image:-moz-linear-gradient(top,#eee,#fdfdfd);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#eee),color-stop(1,#fdfdfd));-msfilter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#eeeeee', EndColorStr='#fdfdfd')"}.ui-btn-down-c a.ui-link-inherit{color:#2f3e46}
 .ui-btn-up-c,.ui-btn-hover-c,.ui-btn-down-c{font-family:Helvetica,Arial,sans-serif}.ui-bar-d{border:1px solid #ccc;background:#bbb;color:#333;text-shadow:0 1px 0 #eee;background-image:-moz-linear-gradient(top,#ddd,#bbb);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#ddd),color-stop(1,#bbb));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#dddddd', EndColorStr='#bbbbbb')"}.ui-bar-d,.ui-bar-d input,.ui-bar-d select,.ui-bar-d textarea,.ui-bar-d button{font-family:Helvetica,Arial,sans-serif}.ui-bar-d .ui-link-inherit{color:#333}.ui-bar-d .ui-link{color:#2489ce;font-weight:bold}.ui-body-d{border:1px solid #ccc;color:#333;text-shadow:0 1px 0 #fff;background:#fff}.ui-body-d,.ui-body-d input,.ui-body-d select,.ui-body-d textarea,.ui-body-d button{font-family:Helvetica,Arial,sans-serif}.ui-body-d .ui-link-inherit{color:#333}.ui-body-d .ui-link{color:#2489ce;font-weight:bold}.ui-btn-up-d{border:1px solid #ccc;background:#fff;font-weight:bold;color:#444;text-decoration:none;text-shadow:0 1px 1px #fff}.ui-btn-up-d a.ui-link-inherit{color:#333}.ui-btn-hover-d{border:1px solid #aaa;background:#eee;font-weight:bold;color:#222;cursor:pointer;text-shadow:0 1px 1px #fff;text-decoration:none;background-image:-moz-linear-gradient(top,#fdfdfd,#eee);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#fdfdfd),color-stop(1,#eee));-msfilter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#fdfdfd', EndColorStr='#eeeeee')"}.ui-btn-hover-d a.ui-link-inherit{color:#222}.ui-btn-down-d{border:1px solid #aaa;background:#fff;font-weight:bold;color:#111;text-shadow:0 1px 1px #fff;background-image:-moz-linear-gradient(top,#eee,#fff);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#eee),color-stop(1,#fff));-msfilter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#eeeeee', EndColorStr='#ffffff')"}.ui-btn-down-d a.ui-link-inherit{border:1px solid #808080;background:#ced0d2;font-weight:bold;color:#111;text-shadow:none;background-image:-moz-linear-gradient(top,#ccc,#eee);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#ccc),color-stop(1,#eee));-msfilter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#cccccc', EndColorStr='#eeeeee')"}.ui-btn-up-d,.ui-btn-hover-d,.ui-btn-down-d{font-family:Helvetica,Arial,sans-serif}.ui-bar-e{border:1px solid #f7c942;background:#fadb4e;color:#333;text-shadow:0 1px 0 #fff;background-image:-moz-linear-gradient(top,#fceda7,#fadb4e);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#fceda7),color-stop(1,#fadb4e));-msfilter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#fceda7', EndColorStr='#fadb4e')"}.ui-bar-e,.ui-bar-e input,.ui-bar-e select,.ui-bar-e textarea,.ui-bar-d button{font-family:Helvetica,Arial,sans-serif}.ui-bar-e .ui-link-inherit{color:#333}.ui-bar-e .ui-link{color:#2489ce;font-weight:bold}.ui-body-e{border:1px solid #f7c942;color:#333;text-shadow:0 1px 0 #fff;background:#faeb9e;background-image:-moz-linear-gradient(top,#fff,#faeb9e);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#fff),color-stop(1,#faeb9e));-msfilter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#ffffff', EndColorStr='#faeb9e')"}.ui-body-e,.ui-body-e input,.ui-body-e select,.ui-body-e textarea,.ui-body-e button{font-family:Helvetica,Arial,sans-serif}.ui-body-e .ui-link-inherit{color:#333}.ui-body-e .ui-link{color:#2489ce;font-weight:bold}.ui-btn-up-e{border:1px solid #f7c942;background:#fadb4e;font-weight:bold;color:#333;cursor:pointer;text-shadow:0 1px 1px #fe3;text-decoration:none;text-shadow:0 1px 0 #fff;background-image:-moz-linear-gradient(top,#fceda7,#fadb4e);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#fceda7),color-stop(1,#fadb4e));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#fceda7', EndColorStr='#fadb4e')"}
 .ui-btn-up-e a.ui-link-inherit{color:#333}.ui-btn-hover-e{border:1px solid #e79952;background:#fbe26f;font-weight:bold;color:#111;text-decoration:none;text-shadow:0 1px 1px #fff;background-image:-moz-linear-gradient(top,#fcf0b5,#fbe26f);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#fcf0b5),color-stop(1,#fbe26f));-msfilter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#fcf0b5', EndColorStr='#fbe26f')"}.ui-btn-hover-e a.ui-link-inherit{color:#333}.ui-btn-down-e{border:1px solid #f7c942;background:#fceda7;font-weight:bold;color:#111;text-shadow:0 1px 1px #fff;background-image:-moz-linear-gradient(top,#fadb4e,#fceda7);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#fadb4e),color-stop(1,#fceda7));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#fadb4e', EndColorStr='#fceda7')"}.ui-btn-down-e a.ui-link-inherit{color:#333}.ui-btn-up-e,.ui-btn-hover-e,.ui-btn-down-e{font-family:Helvetica,Arial,sans-serif}a.ui-link-inherit{text-decoration:none!important}.ui-btn-active{border:1px solid #155678;background:#4596ce;font-weight:bold;color:#fff;cursor:pointer;text-shadow:0 -1px 1px #145072;text-decoration:none;background-image:-moz-linear-gradient(top,#85bae4,#5393c5);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#85bae4),color-stop(1,#5393c5));-msfilter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#85bae4', EndColorStr='#5393c5')";outline:0}.ui-btn-active a.ui-link-inherit{color:#fff}.ui-btn-inner{border-top:1px solid #fff;border-color:rgba(255,255,255,.3)}.ui-corner-tl{-moz-border-radius-topleft:.6em;-webkit-border-top-left-radius:.6em;border-top-left-radius:.6em}.ui-corner-tr{-moz-border-radius-topright:.6em;-webkit-border-top-right-radius:.6em;border-top-right-radius:.6em}.ui-corner-bl{-moz-border-radius-bottomleft:.6em;-webkit-border-bottom-left-radius:.6em;border-bottom-left-radius:.6em}.ui-corner-br{-moz-border-radius-bottomright:.6em;-webkit-border-bottom-right-radius:.6em;border-bottom-right-radius:.6em}.ui-corner-top{-moz-border-radius-topleft:.6em;-webkit-border-top-left-radius:.6em;border-top-left-radius:.6em;-moz-border-radius-topright:.6em;-webkit-border-top-right-radius:.6em;border-top-right-radius:.6em}.ui-corner-bottom{-moz-border-radius-bottomleft:.6em;-webkit-border-bottom-left-radius:.6em;border-bottom-left-radius:.6em;-moz-border-radius-bottomright:.6em;-webkit-border-bottom-right-radius:.6em;border-bottom-right-radius:.6em}.ui-corner-right{-moz-border-radius-topright:.6em;-webkit-border-top-right-radius:.6em;border-top-right-radius:.6em;-moz-border-radius-bottomright:.6em;-webkit-border-bottom-right-radius:.6em;border-bottom-right-radius:.6em}.ui-corner-left{-moz-border-radius-topleft:.6em;-webkit-border-top-left-radius:.6em;border-top-left-radius:.6em;-moz-border-radius-bottomleft:.6em;-webkit-border-bottom-left-radius:.6em;border-bottom-left-radius:.6em}.ui-corner-all{-moz-border-radius:.6em;-webkit-border-radius:.6em;border-radius:.6em}.ui-disabled{opacity:.3}.ui-disabled,.ui-disabled a{cursor:default!important}.ui-icon{background-image:url(images/icons-18-white.png);background-repeat:no-repeat;background-color:#666;background-color:rgba(0,0,0,.4);-moz-border-radius:9px;-webkit-border-radius:9px;border-radius:9px}.ui-icon-disc{background-color:#666;background-color:rgba(0,0,0,.3);-moz-border-radius:9px;-webkit-border-radius:9px;border-radius:9px}.ui-icon-black{background-image:url(images/icons-18-black.png)}.ui-icon-black-disc{background-color:#fff;background-color:rgba(255,255,255,.3);-moz-border-radius:9px;-webkit-border-radius:9px;border-radius:9px}@media screen and (-webkit-min-device-pixel-ratio:2),screen and (max--moz-device-pixel-ratio:2){.ui-icon{background-image:url(images/icons-36-white.png);background-size:630px 18px}.ui-icon-black{background-image:url(images/icons-36-black.png)}}.ui-icon-plus{background-position:-0 0}
 .ui-icon-minus{background-position:-36px 0}.ui-icon-delete{background-position:-72px 0}.ui-icon-arrow-r{background-position:-108px 0}.ui-icon-arrow-l{background-position:-144px 0}.ui-icon-arrow-u{background-position:-180px 0}.ui-icon-arrow-d{background-position:-216px 0}.ui-icon-check{background-position:-252px 0}.ui-icon-gear{background-position:-288px 0}.ui-icon-refresh{background-position:-324px 0}.ui-icon-forward{background-position:-360px 0}.ui-icon-back{background-position:-396px 0}.ui-icon-grid{background-position:-432px 0}.ui-icon-star{background-position:-468px 0}.ui-icon-alert{background-position:-504px 0}.ui-icon-info{background-position:-540px 0}.ui-icon-home{background-position:-576px 0}.ui-icon-search{background-position:-612px 0}.ui-icon-checkbox-off,.ui-icon-checkbox-on,.ui-icon-radio-off,.ui-icon-radio-on{background-color:transparent;-moz-border-radius:0;-webkit-border-radius:0;border-radius:0;background-size:20px 20px}.ui-icon-checkbox-off{background-image:url(images/form-check-off.png)}.ui-icon-checkbox-on{background-image:url(images/form-check-on.png)}.ui-icon-radio-off{background-image:url(images/form-radio-off.png)}.ui-icon-radio-on{background-image:url(images/form-radio-on.png)}.ui-icon-searchfield{background-image:url(images/icon-search-black.png);background-size:16px 16px}.ui-icon-loading{background-image:url(images/ajax-loader.png);width:40px;height:40px;-moz-border-radius:20px;-webkit-border-radius:20px;border-radius:20px;background-size:35px 35px}.ui-btn-corner-tl{-moz-border-radius-topleft:1em;-webkit-border-top-left-radius:1em;border-top-left-radius:1em}.ui-btn-corner-tr{-moz-border-radius-topright:1em;-webkit-border-top-right-radius:1em;border-top-right-radius:1em}.ui-btn-corner-bl{-moz-border-radius-bottomleft:1em;-webkit-border-bottom-left-radius:1em;border-bottom-left-radius:1em}.ui-btn-corner-br{-moz-border-radius-bottomright:1em;-webkit-border-bottom-right-radius:1em;border-bottom-right-radius:1em}.ui-btn-corner-top{-moz-border-radius-topleft:1em;-webkit-border-top-left-radius:1em;border-top-left-radius:1em;-moz-border-radius-topright:1em;-webkit-border-top-right-radius:1em;border-top-right-radius:1em}.ui-btn-corner-bottom{-moz-border-radius-bottomleft:1em;-webkit-border-bottom-left-radius:1em;border-bottom-left-radius:1em;-moz-border-radius-bottomright:1em;-webkit-border-bottom-right-radius:1em;border-bottom-right-radius:1em}.ui-btn-corner-right{-moz-border-radius-topright:1em;-webkit-border-top-right-radius:1em;border-top-right-radius:1em;-moz-border-radius-bottomright:1em;-webkit-border-bottom-right-radius:1em;border-bottom-right-radius:1em}.ui-btn-corner-left{-moz-border-radius-topleft:1em;-webkit-border-top-left-radius:1em;border-top-left-radius:1em;-moz-border-radius-bottomleft:1em;-webkit-border-bottom-left-radius:1em;border-bottom-left-radius:1em}.ui-btn-corner-all{-moz-border-radius:1em;-webkit-border-radius:1em;border-radius:1em}.ui-corner-tl,.ui-corner-tr,.ui-corner-bl,.ui-corner-br,.ui-corner-top,.ui-corner-bottom,.ui-corner-right,.ui-corner-left,.ui-corner-all,.ui-btn-corner-tl,.ui-btn-corner-tr,.ui-btn-corner-bl,.ui-btn-corner-br,.ui-btn-corner-top,.ui-btn-corner-bottom,.ui-btn-corner-right,.ui-btn-corner-left,.ui-btn-corner-all{-webkit-background-clip:padding-box;-moz-background-clip:padding-box;background-clip:padding-box}.ui-overlay{background:#666;opacity:.5;filter:Alpha(Opacity=50);position:absolute;width:100%;height:100%}.ui-overlay-shadow{-moz-box-shadow:0 0 12px rgba(0,0,0,.6);-webkit-box-shadow:0 0 12px rgba(0,0,0,.6);box-shadow:0 0 12px rgba(0,0,0,.6)}.ui-shadow{-moz-box-shadow:0 1px 4px rgba(0,0,0,.3);-webkit-box-shadow:0 1px 4px rgba(0,0,0,.3);box-shadow:0 1px 4px rgba(0,0,0,.3)}.ui-bar-a .ui-shadow,.ui-bar-b .ui-shadow,.ui-bar-c .ui-shadow{-moz-box-shadow:0 1px 0 rgba(255,255,255,.3);-webkit-box-shadow:0 1px 0 rgba(255,255,255,.3);box-shadow:0 1px 0 rgba(255,255,255,.3)}
 .ui-shadow-inset{-moz-box-shadow:inset 0 1px 4px rgba(0,0,0,.2);-webkit-box-shadow:inset 0 1px 4px rgba(0,0,0,.2);box-shadow:inset 0 1px 4px rgba(0,0,0,.2)}.ui-icon-shadow{-moz-box-shadow:0 1px 0 rgba(255,255,255,.4);-webkit-box-shadow:0 1px 0 rgba(255,255,255,.4);box-shadow:0 1px 0 rgba(255,255,255,.4)}.ui-focus{-moz-box-shadow:0 0 12px #387bbe;-webkit-box-shadow:0 0 12px #387bbe;box-shadow:0 0 12px #387bbe}.ui-mobile-nosupport-boxshadow *{-moz-box-shadow:none!important;-webkit-box-shadow:none!important;box-shadow:none!important}.ui-mobile-nosupport-boxshadow .ui-focus{outline-width:2px}.ui-mobile fieldset,.ui-page{padding:0;margin:0}.ui-mobile a img,.ui-mobile fieldset{border:0}.ui-mobile-viewport{margin:0;overflow-x:hidden;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}[data-role=page],[data-role=dialog],.ui-page{top:0;left:0;width:100%;min-height:100%;position:absolute;display:none;border:0}.ui-page-active{display:block;overflow:visible}.portrait,.portrait .ui-page{min-height:480px}.landscape,.landscape .ui-page{min-height:320px}.ui-loading .ui-mobile-viewport{overflow:hidden!important}.ui-loading .ui-loader{display:block}.ui-loading .ui-page{overflow:hidden}.ui-loader{display:none;position:absolute;opacity:.85;z-index:10;left:50%;width:200px;margin-left:-130px;margin-top:-35px;padding:10px 30px}.ui-loader h1{font-size:15px;text-align:center}.ui-loader .ui-icon{position:static;display:block;opacity:.9;margin:0 auto;width:35px;height:35px;background-color:transparent}.ui-mobile-rendering>*{visibility:hidden}.ui-bar,.ui-body{position:relative;padding:.4em 15px;overflow:hidden;display:block;}.ui-bar{font-size:16px;margin:0}.ui-bar h1,.ui-bar h2,.ui-bar h3,.ui-bar h4,.ui-bar h5,.ui-bar h6{margin:0;padding:0;font-size:16px;display:inline-block}.ui-header,.ui-footer{display:block}.ui-page .ui-header,.ui-page .ui-footer{position:relative}.ui-header .ui-btn-left{position:absolute;left:10px;top:.4em}.ui-header .ui-title,.ui-footer .ui-title{text-align:center;font-size:20px;display:block;margin:.6em 90px .8em;padding:0;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;outline:0!important}.ui-header .ui-btn-right{position:absolute;right:10px;top:.4em}.ui-content{border-width:0;overflow:visible;overflow-x:hidden;padding:15px}.ui-page-fullscreen .ui-content{padding:0}.ui-icon{width:18px;height:18px}.ui-fullscreen img{max-width:100%}.ui-nojs{position:absolute;left:-9999px}.spin{-webkit-transform:rotate(360deg);-webkit-animation-name:spin;-webkit-animation-duration:1s;-webkit-animation-iteration-count:infinite}@-webkit-keyframes spin{from{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(360deg)}}.in,.out{-webkit-animation-timing-function:ease-in-out;-webkit-animation-duration:350ms}.slide.in{-webkit-transform:translateX(0);-webkit-animation-name:slideinfromright}.slide.out{-webkit-transform:translateX(-100%);-webkit-animation-name:slideouttoleft}.slide.in.reverse{-webkit-transform:translateX(0);-webkit-animation-name:slideinfromleft}.slide.out.reverse{-webkit-transform:translateX(100%);-webkit-animation-name:slideouttoright}.slideup.in{-webkit-transform:translateY(0);-webkit-animation-name:slideinfrombottom;z-index:10}.slideup.out{-webkit-animation-name:dontmove;z-index:0}.slideup.out.reverse{-webkit-transform:translateY(100%);z-index:10;-webkit-animation-name:slideouttobottom}.slideup.in.reverse{z-index:0;-webkit-animation-name:dontmove}.slidedown.in{-webkit-transform:translateY(0);-webkit-animation-name:slideinfromtop;z-index:10}.slidedown.out{-webkit-animation-name:dontmove;z-index:0}.slidedown.out.reverse{-webkit-transform:translateY(-100%);z-index:10;-webkit-animation-name:slideouttotop}
 .slidedown.in.reverse{z-index:0;-webkit-animation-name:dontmove}@-webkit-keyframes slideinfromright{from{-webkit-transform:translateX(100%)}to{-webkit-transform:translateX(0)}}@-webkit-keyframes slideinfromleft{from{-webkit-transform:translateX(-100%)}to{-webkit-transform:translateX(0)}}@-webkit-keyframes slideouttoleft{from{-webkit-transform:translateX(0)}to{-webkit-transform:translateX(-100%)}}@-webkit-keyframes slideouttoright{from{-webkit-transform:translateX(0)}to{-webkit-transform:translateX(100%)}}@-webkit-keyframes slideinfromtop{from{-webkit-transform:translateY(-100%)}to{-webkit-transform:translateY(0)}}@-webkit-keyframes slideinfrombottom{from{-webkit-transform:translateY(100%)}to{-webkit-transform:translateY(0)}}@-webkit-keyframes slideouttobottom{from{-webkit-transform:translateY(0)}to{-webkit-transform:translateY(100%)}}@-webkit-keyframes slideouttotop{from{-webkit-transform:translateY(0)}to{-webkit-transform:translateY(-100%)}}@-webkit-keyframes fadein{from{opacity:0}to{opacity:1}}@-webkit-keyframes fadeout{from{opacity:1}to{opacity:0}}.fade.in{opacity:1;z-index:10;-webkit-animation-name:fadein}.fade.out{z-index:0;-webkit-animation-name:fadeout}.ui-mobile-viewport-perspective{-webkit-perspective:1000;position:absolute}.ui-mobile-viewport-transitioning,.ui-mobile-viewport-transitioning .ui-page{width:100%;height:100%;overflow:hidden}.flip{-webkit-animation-duration:.65s;-webkit-backface-visibility:hidden;-webkit-transform:translateX(0)}.flip.in{-webkit-transform:rotateY(0) scale(1);-webkit-animation-name:flipinfromleft}.flip.out{-webkit-transform:rotateY(-180deg) scale(.8);-webkit-animation-name:flipouttoleft}.flip.in.reverse{-webkit-transform:rotateY(0) scale(1);-webkit-animation-name:flipinfromright}.flip.out.reverse{-webkit-transform:rotateY(180deg) scale(.8);-webkit-animation-name:flipouttoright}@-webkit-keyframes flipinfromright{from{-webkit-transform:rotateY(-180deg) scale(.8)}to{-webkit-transform:rotateY(0) scale(1)}}@-webkit-keyframes flipinfromleft{from{-webkit-transform:rotateY(180deg) scale(.8)}to{-webkit-transform:rotateY(0) scale(1)}}@-webkit-keyframes flipouttoleft{from{-webkit-transform:rotateY(0) scale(1)}to{-webkit-transform:rotateY(-180deg) scale(.8)}}@-webkit-keyframes flipouttoright{from{-webkit-transform:rotateY(0) scale(1)}to{-webkit-transform:rotateY(180deg) scale(.8)}}@-webkit-keyframes dontmove{from{opacity:1}to{opacity:1}}.pop{-webkit-transform-origin:50% 50%}.pop.in{-webkit-transform:scale(1);opacity:1;-webkit-animation-name:popin;z-index:10}.pop.out.reverse{-webkit-transform:scale(.2);opacity:0;-webkit-animation-name:popout;z-index:10}.pop.in.reverse{z-index:0;-webkit-animation-name:dontmove}@-webkit-keyframes popin{from{-webkit-transform:scale(.2);opacity:0}to{-webkit-transform:scale(1);opacity:1}}@-webkit-keyframes popout{from{-webkit-transform:scale(1);opacity:1}to{-webkit-transform:scale(.2);opacity:0}}.ui-grid-a,.ui-grid-b,.ui-grid-c,.ui-grid-d{overflow:hidden}.ui-block-a,.ui-block-b,.ui-block-c,.ui-block-d,.ui-block-e{margin:0;padding:0;border:0;float:left}.ui-grid-a .ui-block-a,.ui-grid-a .ui-block-b{width:50%}.ui-grid-a .ui-block-a{clear:left}.ui-grid-b .ui-block-a,.ui-grid-b .ui-block-b,.ui-grid-b .ui-block-c{width:33.333%}.ui-grid-b .ui-block-a{clear:left}.ui-grid-c .ui-block-a,.ui-grid-c .ui-block-b,.ui-grid-c .ui-block-c,.ui-grid-c .ui-block-d{width:25%}.ui-grid-c .ui-block-a{clear:left}.ui-grid-d .ui-block-a,.ui-grid-d .ui-block-b,.ui-grid-d .ui-block-c,.ui-grid-d .ui-block-d,.ui-grid-d .ui-block-e{width:20%}.ui-grid-d .ui-block-a{clear:left}.ui-header,.ui-footer,.ui-page-fullscreen .ui-header,.ui-page-fullscreen .ui-footer{position:absolute;overflow:hidden;width:100%;border-left-width:0;border-right-width:0}.ui-header-fixed,.ui-footer-fixed{z-index:1000;-webkit-transform:translateZ(0)}.ui-footer-duplicate,.ui-page-fullscreen .ui-fixed-inline{display:none}.ui-page-fullscreen .ui-header,.ui-page-fullscreen .ui-footer{opacity:.9}
 .ui-navbar{overflow:hidden}.ui-navbar ul,.ui-navbar-expanded ul{list-style:none;padding:0;margin:0;position:relative;display:block;border:0}.ui-navbar-collapsed ul{float:left;width:75%;margin-right:-2px}.ui-navbar-collapsed .ui-navbar-toggle{float:left;width:25%}.ui-navbar li.ui-navbar-truncate{position:absolute;left:-9999px;top:-9999px}.ui-navbar li .ui-btn,.ui-navbar .ui-navbar-toggle .ui-btn{display:block;font-size:12px;text-align:center;margin:0;border-right-width:0}.ui-navbar li .ui-btn{margin-right:-1px}.ui-navbar li .ui-btn:last-child{margin-right:0}.ui-header .ui-navbar li .ui-btn,.ui-header .ui-navbar .ui-navbar-toggle .ui-btn,.ui-footer .ui-navbar li .ui-btn,.ui-footer .ui-navbar .ui-navbar-toggle .ui-btn{border-top-width:0;border-bottom-width:0}.ui-navbar .ui-btn-inner{padding-left:2px;padding-right:2px}.ui-navbar-noicons li .ui-btn .ui-btn-inner,.ui-navbar-noicons .ui-navbar-toggle .ui-btn-inner{padding-top:.8em;padding-bottom:.9em}.ui-navbar-expanded .ui-btn{margin:0;font-size:14px}.ui-navbar-expanded .ui-btn-inner{padding-left:5px;padding-right:5px}.ui-navbar-expanded .ui-btn-icon-top .ui-btn-inner{padding:45px 5px 15px;text-align:center}.ui-navbar-expanded .ui-btn-icon-top .ui-icon{top:15px}.ui-navbar-expanded .ui-btn-icon-bottom .ui-btn-inner{padding:15px 5px 45px;text-align:center}.ui-navbar-expanded .ui-btn-icon-bottom .ui-icon{bottom:15px}.ui-navbar-expanded li .ui-btn .ui-btn-inner{min-height:2.5em}.ui-navbar-expanded .ui-navbar-noicons .ui-btn .ui-btn-inner{padding-top:1.8em;padding-bottom:1.9em}.ui-btn{display:block;text-align:center;cursor:pointer;position:relative;margin:.5em 5px;padding:0}.ui-btn:focus,.ui-btn:active{outline:0}.ui-header .ui-btn,.ui-footer .ui-btn,.ui-bar .ui-btn{display:inline-block;font-size:13px;margin:0}.ui-btn-inline{display:inline-block}.ui-btn-inner{padding:.6em 25px;display:block;height:100%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;position:relative}.ui-header .ui-btn-inner,.ui-footer .ui-btn-inner,.ui-bar .ui-btn-inner{padding:.4em 8px .5em}.ui-btn-icon-notext{display:inline-block;width:20px;height:20px;padding:2px 1px 2px 3px;text-indent:-9999px}.ui-btn-icon-notext .ui-btn-inner{padding:0}.ui-btn-icon-notext .ui-btn-text{position:absolute;left:-999px}.ui-btn-icon-left .ui-btn-inner{padding-left:33px}.ui-header .ui-btn-icon-left .ui-btn-inner,.ui-footer .ui-btn-icon-left .ui-btn-inner,.ui-bar .ui-btn-icon-left .ui-btn-inner{padding-left:27px}.ui-btn-icon-right .ui-btn-inner{padding-right:33px}.ui-header .ui-btn-icon-right .ui-btn-inner,.ui-footer .ui-btn-icon-right .ui-btn-inner,.ui-bar .ui-btn-icon-right .ui-btn-inner{padding-right:27px}.ui-btn-icon-top .ui-btn-inner{padding-top:33px}.ui-header .ui-btn-icon-top .ui-btn-inner,.ui-footer .ui-btn-icon-top .ui-btn-inner,.ui-bar .ui-btn-icon-top .ui-btn-inner{padding-top:27px}.ui-btn-icon-bottom .ui-btn-inner{padding-bottom:33px}.ui-header .ui-btn-icon-bottom .ui-btn-inner,.ui-footer .ui-btn-icon-bottom .ui-btn-inner,.ui-bar .ui-btn-icon-bottom .ui-btn-inner{padding-bottom:27px}.ui-btn-icon-notext .ui-icon{display:block}.ui-btn-icon-left .ui-icon,.ui-btn-icon-right .ui-icon{position:absolute;top:50%;margin-top:-9px}.ui-btn-icon-top .ui-icon,.ui-btn-icon-bottom .ui-icon{position:absolute;left:50%;margin-left:-9px}.ui-btn-icon-left .ui-icon{left:10px}.ui-btn-icon-right .ui-icon{right:10px}.ui-header .ui-btn-icon-left .ui-icon,.ui-footer .ui-btn-icon-left .ui-icon,.ui-bar .ui-btn-icon-left .ui-icon{left:4px}.ui-header .ui-btn-icon-right .ui-icon,.ui-footer .ui-btn-icon-right .ui-icon,.ui-bar .ui-btn-icon-right .ui-icon{right:4px}.ui-header .ui-btn-icon-top .ui-icon,.ui-footer .ui-btn-icon-top .ui-icon,.ui-bar .ui-btn-icon-top .ui-icon{top:4px}.ui-header .ui-btn-icon-bottom .ui-icon,.ui-footer .ui-btn-icon-bottom .ui-icon,.ui-bar .ui-btn-icon-bottom .ui-icon{bottom:4px}.ui-btn-icon-top .ui-icon{top:5px}.ui-btn-icon-bottom .ui-icon{bottom:5px}
 .ui-btn-hidden{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-appearance:button;opacity:0;cursor:pointer}.ui-collapsible-contain{margin:.5em 0}.ui-collapsible-heading{font-size:16px;display:block;margin:0 -8px;padding:0;border-width:0 0 1px 0;position:relative}.ui-collapsible-heading a{text-align:left;margin:0}.ui-collapsible-heading a .ui-btn-inner{padding-left:40px}.ui-collapsible-heading a span.ui-btn{position:absolute;left:6px;top:50%;margin:-12px 0 0 0;width:20px;height:20px;padding:1px 0 1px 2px;text-indent:-9999px}.ui-collapsible-heading a span.ui-btn .ui-btn-inner{padding:0}.ui-collapsible-heading a span.ui-btn .ui-icon{left:0;margin-top:-10px}.ui-collapsible-heading-status{position:absolute;left:-9999px}.ui-collapsible-content{display:block;padding:10px 0 10px 8px}.ui-collapsible-content-collapsed{display:none}.ui-collapsible-set{margin:.5em 0}.ui-collapsible-set .ui-collapsible-contain{margin:-1px 0 0}.ui-controlgroup,fieldset.ui-controlgroup{padding:0;margin:.5em 0 1em}.ui-bar .ui-controlgroup{margin:0 .3em}.ui-controlgroup-label{font-size:16px;line-height:1.4;font-weight:normal;margin:0 0 .3em}.ui-controlgroup-controls{display:block;width:95%}.ui-controlgroup li{list-style:none}.ui-controlgroup-vertical .ui-btn,.ui-controlgroup-vertical .ui-checkbox,.ui-controlgroup-vertical .ui-radio{margin:0;border-bottom-width:0}.ui-controlgroup-vertical .ui-controlgroup-last{border-bottom-width:1px}.ui-controlgroup-horizontal{padding:0}.ui-controlgroup-horizontal .ui-btn,.ui-controlgroup-horizontal .ui-checkbox,.ui-controlgroup-horizontal .ui-radio{margin:0 -5px 0 0;display:inline-block}.ui-controlgroup-horizontal .ui-checkbox .ui-btn,.ui-controlgroup-horizontal .ui-radio .ui-btn,.ui-controlgroup-horizontal .ui-checkbox:last-child,.ui-controlgroup-horizontal .ui-radio:last-child{margin-right:0}.ui-controlgroup-horizontal .ui-controlgroup-last{margin-right:0}.ui-controlgroup .ui-checkbox label,.ui-controlgroup .ui-radio label{font-size:20px}.min-width-480px .ui-controlgroup-label{vertical-align:top;display:inline-block;width:20%;margin:0 2% 0 0}.min-width-480px .ui-controlgroup-controls{width:60%;display:inline-block}.ui-dialog{min-height:480px}.ui-dialog .ui-header,.ui-dialog .ui-content,.ui-dialog .ui-footer{margin:15px;position:relative}.ui-dialog .ui-header,.ui-dialog .ui-footer{z-index:10;width:auto}.ui-dialog .ui-content,.ui-dialog .ui-footer{margin-top:-15px}.ui-checkbox,.ui-radio{position:relative;margin:.2em 0 .5em;z-index:1}.ui-checkbox .ui-btn,.ui-radio .ui-btn{margin:0;text-align:left;z-index:2}.ui-checkbox .ui-btn-icon-left .ui-btn-inner,.ui-radio .ui-btn-icon-left .ui-btn-inner{padding-left:45px}.ui-checkbox .ui-btn-icon-right .ui-btn-inner,.ui-radio .ui-btn-icon-right .ui-btn-inner{padding-right:45px}.ui-checkbox .ui-btn-icon-left .ui-icon,.ui-radio .ui-btn-icon-left .ui-icon{left:15px}.ui-checkbox .ui-btn-icon-right .ui-icon,.ui-radio .ui-btn-icon-right .ui-icon{right:15px}.ui-checkbox input,.ui-radio input{position:absolute;left:20px;top:50%;width:10px;height:10px;margin:-5px 0 0 0;outline:0!important;z-index:1}.ui-field-contain{background:0;padding:0.6em 0 0 1em;margin:0;border-bottom-width:1px;overflow:visible}.ui-field-contain:first-child{border-top-width:0}.min-width-480px .ui-field-contain{border-width:0;padding:0;margin:1em 0}.ui-select{display:block;position:relative}.ui-select select{position:absolute;left:-9999px;top:-9999px}.ui-select .ui-btn select{cursor:pointer;-webkit-appearance:button;left:0;top:0;width:100%;height:100%;opacity:.001}.ui-select .ui-btn select.ui-select-nativeonly{opacity:1}.ui-select .ui-btn-icon-right .ui-btn-inner{padding-right:45px}.ui-select .ui-btn-icon-right .ui-icon{right:15px}label.ui-select{font-size:16px;line-height:1.4;font-weight:normal;margin:0 0 .3em;display:block}.ui-select .ui-btn-text,.ui-selectmenu .ui-btn-text{display:inline-block;min-height:1em}.ui-select .ui-btn-text{text-overflow:ellipsis;overflow:hidden;width:85%}
 .ui-selectmenu{position:absolute;padding:0;z-index:100!important;width:80%;max-width:350px;padding:6px}.ui-selectmenu .ui-listview{margin:0}.ui-selectmenu .ui-btn.ui-li-divider{cursor:default}.ui-selectmenu-hidden{top:-9999px;left:-9999px}.ui-selectmenu-screen{position:absolute;top:0;left:0;width:100%;height:100%;z-index:99}.ui-screen-hidden,.ui-selectmenu-list .ui-li .ui-icon{display:none}.ui-selectmenu-list .ui-li .ui-icon{display:block}.ui-li.ui-selectmenu-placeholder{display:none}.min-width-480px label.ui-select{display:inline-block;width:20%;margin:0 2% 0 0}.min-width-480px .ui-select{width:60%;display:inline-block}.ui-selectmenu .ui-header h1:after{content:'.';visibility:hidden}label.ui-input-text{font-size:16px;line-height:1.4;display:block;font-weight:normal;margin:0 0 .3em}input.ui-input-text,textarea.ui-input-text{background-image:none;padding:.4em;line-height:1.4;font-size:16px;display:block;width:90%}input.ui-input-text{-webkit-appearance:none}textarea.ui-input-text{height:50px;-webkit-transition:height 200ms linear;-moz-transition:height 200ms linear;-o-transition:height 200ms linear;transition:height 200ms linear}.ui-input-search{padding:0 30px;width:77%;background-position:8px 50%;background-repeat:no-repeat;position:relative}.ui-input-search input.ui-input-text{border:0;width:98%;padding:.4em 0;margin:0;display:block;background:transparent none;outline:0!important}.ui-input-search .ui-input-clear{position:absolute;right:0;top:50%;margin-top:-14px}.ui-input-search .ui-input-clear-hidden{display:none}.min-width-480px label.ui-input-text{vertical-align:top}.min-width-480px label.ui-input-text{display:inline-block;width:20%;margin:0 2% 0 0}.min-width-480px input.ui-input-text,.min-width-480px textarea.ui-input-text,.min-width-480px .ui-input-search{width:60%;display:inline-block}.min-width-480px .ui-input-search{width:50%}.ui-listview{margin:0;counter-reset:listnumbering}.ui-content .ui-listview{margin:-15px}.ui-content .ui-listview-inset{margin:1em 0}.ui-listview,.ui-li{list-style:none;padding:0;zoom:1}.ui-li{display:block;margin:0;font-size: 13px;position:relative;overflow:hidden;text-align:left;border-width:0;border-top-width:1px}.ui-li .ui-btn-text{text-overflow:ellipsis;overflow:hidden;white-space:nowrap; display:block}.ui-li-divider,.ui-li-static{padding:.5em 15px;font-size:14px;font-weight:bold;counter-reset:listnumbering}ol.ui-listview .ui-link-inherit:before,.ui-li-dec{font-size:.8em;display:inline-block;padding-right:.3em;font-weight:normal;counter-increment:listnumbering;content:counter(listnumbering) ". "}ol.ui-listview .ui-li-jsnumbering:before{content:""!important}.ui-listview-inset .ui-li{border-right-width:0px;border-left-width:0px}.ui-li:last-child{border-bottom-width:1px}.ui-li .ui-btn-inner{display:block;position:relative;padding:.7em 75px .7em 15px}.ui-li-has-thumb .ui-btn-inner{min-height:60px;padding-left:100px}.ui-li-has-icon .ui-btn-inner{min-height:20px;padding-left:40px}.ui-li-heading{font-size:16px;font-weight:bold;display:block;margin:.6em 0;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.ui-li-desc{font-size:12px;font-weight:normal;display:block;margin:-.5em 0 .6em;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.ui-li-thumb,.ui-li-icon{position:absolute;left:1px;top:0;max-height:80px;max-width:80px}.ui-li-icon{max-height:40px;max-width:40px;left:10px;top:.9em}.ui-li-thumb,.ui-li-icon,.ui-li-content{float:left;margin-right:10px}.ui-li-aside{float:right;width:50%;text-align:right;margin:.3em 0}.min-width-480px .ui-li-aside{width:45%}.ui-li-has-alt .ui-btn-inner{padding-right:95px}.ui-li-count{position:absolute;font-size:11px;font-weight:bold;padding:.2em .5em;top:50%;margin-top:-.9em;right:38px}.ui-li-divider .ui-li-count{right:10px}.ui-li-has-alt .ui-li-count{right:55px}.ui-li-link-alt{position:absolute;width:40px;height:100%;border-width:0;border-left-width:1px;top:0;right:0;margin:0;padding:0}
 .bluebg {background:#4596ce !important; color:#fff;cursor:pointer;text-shadow:0 -1px 1px #145072;text-decoration:none;background-image:-moz-linear-gradient(top,#85bae4,#5393c5) !important;background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#85bae4),color-stop(1,#5393c5)) !important;-msfilter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#85bae4', EndColorStr='#5393c5') !important";outline:0}.ui-li-link-alt .ui-btn{overflow:hidden;position:absolute;right:8px;top:50%;margin:-11px 0 0 0;border-bottom-width:1px}.ui-li-link-alt .ui-btn-inner{padding:0;position:static}.ui-li-link-alt .ui-btn .ui-icon{right:50%;margin-right:-9px}.ui-listview-filter{border-width:0;overflow:hidden;margin:-15px -15px 15px -15px}.ui-listview-filter .ui-input-search{margin:5px;width:auto;display:block}@media only screen and (min-device-width:768px) and (max-device-width:1024px){.ui-li .ui-btn-text{overflow:visible}}label.ui-slider{display:block}input.ui-slider-input,.min-width-480px input.ui-slider-input{display:inline-block;width:50px}select.ui-slider-switch{display:none}div.ui-slider{position:relative;display:inline-block;overflow:visible;height:15px;padding:0;margin:0 2% 0 20px;top:4px;width:66%}a.ui-slider-handle{position:absolute;z-index:10;top:50%;width:28px;height:28px;margin-top:-15px;margin-left:-15px}a.ui-slider-handle .ui-btn-inner{padding-left:0;padding-right:0}.min-width-480px label.ui-slider{display:inline-block;width:20%;margin:0 2% 0 0}.min-width-480px div.ui-slider{width:45%}div.ui-slider-switch{height:32px;overflow:hidden;margin-left:0}div.ui-slider-inneroffset{margin-left:50%;position:absolute;top:1px;height:100%;width:50%}div.ui-slider-handle-snapping{-webkit-transition:left 100ms linear}div.ui-slider-labelbg{position:absolute;top:0;margin:0;border-width:0}div.ui-slider-switch div.ui-slider-labelbg-a{width:60%;height:100%;left:0}div.ui-slider-switch div.ui-slider-labelbg-b{width:60%;height:100%;right:0}.ui-slider-switch-a div.ui-slider-labelbg-a,.ui-slider-switch-b div.ui-slider-labelbg-b{z-index:1}.ui-slider-switch-a div.ui-slider-labelbg-b,.ui-slider-switch-b div.ui-slider-labelbg-a{z-index:10}div.ui-slider-switch a.ui-slider-handle{z-index:20;width:101%;height:32px;margin-top:-18px;margin-left:-101%}span.ui-slider-label{width:100%;position:absolute;height:32px;font-size:16px;text-align:center;line-height:2;background:0;border-color:transparent}span.ui-slider-label-a{left:-23%;margin-right:-1px;color:#999}span.ui-slider-label-b{right:-23%;margin-left:-1px}.anreise{font-size: 16px; color: #444444; display: inline-block;}.abreise{font-size: 16px; color:#008000}.clock, .clock2{float: right; font-size: 30px; right: -49px; position: relative; display:block; height: 1px; bottom: 84px;}.phone, .reactivate, .phone2 {bottom: 84px; display: block; float: right; height: 1px; margin: 0; position: relative; right: -40px;} .reactivate, .phone3{right: -5px} .grey, .grey a{background: #666 !important; color: #fff !important} .lightyellow {background: #D1D1D1} .label{padding: 5px; float: left; font-size: 12px; min-width: 70px;} #msg {color: #F00} *{padding: 0; margin: 0} .pxplogo{cursor: pointer;display:block; width: 210px; margin: 5px; height: 35px; top: -5%; right: 96px; position:absolute}.first-row{font-size: 21px}.preis{color: #F00; display: inline-block} .bewertung, .quittung {cursor:pointer; display: block; float: right; right: 20px; position: relative; bottom: 33px; height: 1px; margin-right: 60px} .logout{bottom: 40px; float: right; height: 1px; position: relative; width: 35px;cursor:pointer} .key{top: 4px; position:relative} .adm {position:absolute; top:19px; right: 43px; color:#a9a9a9; cursor: pointer} .atable td {min-width: 250px; max-width: 250px; display:inline-block} .totalprice{float:right; display:block; margin: 5px; font-size:16px } .priceright {text-align: right} .editbtn {bottom: 50px; display: block; float: right; height: 35px; position: relative; right: 130px; width: 35px; background: url('images/edit.png')}
 #sort {float: right; position: absolute; right: 330px; top: 35px; font-size: 20px} .stat {height: 57px; background: #A0F791} #hour, #terminal {width: 250px; left: 9%; top: 30%; height: 28px; display: inline-block; position: fixed; z-index: 2147483647; background: #EEEEEE; padding: 10px; border: 1px solid #B2B2B2;} #hour input, #terminal option, #terminal select {font-size: 16px; width: 100px; height: 20px} .shad {-moz-box-shadow:0 0 12px rgba(0,0,0,.6);-webkit-box-shadow:0 0 12px rgba(0,0,0,.6);box-shadow:0 0 12px rgba(0,0,0,.6)}.ui-btn table {font-size: 19px} .ui-li {height: 120px} .logged {position: absolute; top: 15px; left: 20px; color: white; text-shadow: none; font-weight: bold; font-size: 20px} #radiolist { height: 75px } .formsub { background-color: #FF0000 } .greyout {color: #999 !important} .edit-lower { bottom: 30px !important } .greenbg {background:#006633 !important; color:#fff;cursor:pointer;text-shadow:0 -1px 1px #145072;text-decoration:none;background-image:-moz-linear-gradient(top,#507551, #7CD200) !important;background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#507551),color-stop(1,#7CD200)) !important;-msfilter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#507551', EndColorStr='#7CD200') !important";outline:0}`;
function JQMScope({ children }) {
  const hostRef = useRef(null);
  const [shadow, setShadow] = React.useState(null);
  React.useEffect(() => {
    if (!hostRef.current || shadow) return;
    const root = hostRef.current.attachShadow({ mode: "open" });
    // Inject jQM CSS + a couple of small fixes like Parkxpress
    const style = document.createElement("style");
    const container = document.createElement('div');
    container.setAttribute('class', 'jqm-shadow-root');
    style.textContent = `
      html,body { font-family: Helvetica, Arial, sans-serif; }
      .ui-mobile-viewport { margin:0; overflow-x:hidden; }
      .ui-page { margin:0; padding:0; }
      /*!
 * jQuery Mobile v1.0a3
 * http://jquerymobile.com/
 *
 * Copyright 2010, jQuery Project
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
/*!
 * jQuery Mobile v1.0a3
 * http://jquerymobile.com/
 *
 * Copyright 2010, jQuery Project
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */.ui-bar-a{border:1px solid #2a2a2a;background:#111;color:#fff;font-weight:bold;text-shadow:0 -1px 1px #000;background-image:-moz-linear-gradient(top,#3c3c3c,#111);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#3c3c3c),color-stop(1,#111));-msfilter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#3c3c3c', EndColorStr='#111111')"}.ui-bar-a,.ui-bar-a input,.ui-bar-a select,.ui-bar-a textarea,.ui-bar-a button{font-family:Helvetica,Arial,sans-serif}.ui-bar-a .ui-link-inherit{color:#fff}.ui-bar-a .ui-link{color:#7cc4e7;font-weight:bold}.ui-body-a{border:1px solid #2a2a2a;background:#222;color:#fff;text-shadow:0 1px 0 #000;font-weight:normal;background-image:-moz-linear-gradient(top,#666,#222);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#666),color-stop(1,#222));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#666666', EndColorStr='#222222)')"}.ui-body-a,.ui-body-a input,.ui-body-a select,.ui-body-a textarea,.ui-body-a button{font-family:Helvetica,Arial,sans-serif}.ui-body-a .ui-link-inherit{color:#fff}.ui-body-a .ui-link{color:#2489ce;font-weight:bold}.ui-br{border-bottom:1px solid rgba(130,130,130,.3)}.ui-btn-up-a{border:1px solid #222;background:#333;font-weight:bold;color:#fff;cursor:pointer;text-shadow:0 -1px 1px #000;text-decoration:none;background-image:-moz-linear-gradient(top,#555,#333);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#555),color-stop(1,#333));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#555555', EndColorStr='#333333')"}.ui-btn-up-a a.ui-link-inherit{color:#fff}.ui-btn-hover-a{border:1px solid #000;background:#444;font-weight:bold;color:#fff;text-shadow:0 -1px 1px #000;text-decoration:none;background-image:-moz-linear-gradient(top,#666,#444);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#666),color-stop(1,#444));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#666666', EndColorStr='#444444')"}.ui-btn-hover-a a.ui-link-inherit{color:#fff}.ui-btn-down-a{border:1px solid #000;background:#3d3d3d;font-weight:bold;color:#fff;text-shadow:0 -1px 1px #000;background-image:-moz-linear-gradient(top,#333,#5a5a5a);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#333),color-stop(1,#5a5a5a));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#333333', EndColorStr='#5a5a5a')"}.ui-btn-down-a a.ui-link-inherit{color:#fff}.ui-btn-up-a,.ui-btn-hover-a,.ui-btn-down-a{font-family:Helvetica,Arial,sans-serif}.ui-bar-b{border:1px solid #456f9a;background:#5e87b0;color:#fff;font-weight:bold;text-shadow:0 -1px 1px #254f7a;background-image:-moz-linear-gradient(top,#81a8ce,#5e87b0);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#81a8ce),color-stop(1,#5e87b0));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#81a8ce', EndColorStr='#5e87b0')"}.ui-bar-b,.ui-bar-b input,.ui-bar-b select,.ui-bar-b textarea,.ui-bar-b button{font-family:Helvetica,Arial,sans-serif}.ui-bar-b .ui-link-inherit{color:#fff}.ui-bar-b .ui-link{color:#7cc4e7;font-weight:bold}.ui-body-b{border:1px solid #c6c6c6;background:#ccc;color:#333;text-shadow:0 1px 0 #fff;font-weight:normal;background-image:-moz-linear-gradient(top,#e6e6e6,#ccc);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#e6e6e6),color-stop(1,#ccc));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#e6e6e6', EndColorStr='#cccccc')"}.ui-body-b,.ui-body-b input,.ui-body-b select,.ui-body-b textarea,.ui-body-b button{font-family:Helvetica,Arial,sans-serif}.ui-body-b .ui-link-inherit{color:#333}
 .ui-body-b .ui-link{color:#2489ce;font-weight:bold}.ui-btn-up-b{border:1px solid #145072;background:#2567ab;font-weight:bold;color:#fff;cursor:pointer;text-shadow:0 -1px 1px #145072;text-decoration:none;background-image:-moz-linear-gradient(top,#4e89c5,#2567ab);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#5f9cc5),color-stop(1,#396b9e));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#4e89c5', EndColorStr='#2567ab')"}.ui-btn-up-b a.ui-link-inherit{color:#fff}.ui-btn-hover-b{border:1px solid #00516e;background:#4b88b6;font-weight:bold;color:#fff;text-shadow:0 -1px 1px #014d68;background-image:-moz-linear-gradient(top,#72b0d4,#4b88b6);text-decoration:none;background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#72b0d4),color-stop(1,#4b88b6));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#72b0d4', EndColorStr='#4b88b6')"}.ui-btn-hover-b a.ui-link-inherit{color:#fff}.ui-btn-down-b{border:1px solid #225377;background:#4e89c5;font-weight:bold;color:#fff;text-shadow:0 -1px 1px #225377;background-image:-moz-linear-gradient(top,#396b9e,#4e89c5);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#396b9e),color-stop(1,#4e89c5));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#396b9e', EndColorStr='#4e89c5')"}.ui-btn-down-b a.ui-link-inherit{color:#fff}.ui-btn-up-b,.ui-btn-hover-b,.ui-btn-down-b{font-family:Helvetica,Arial,sans-serif}.ui-bar-c{border:1px solid #b3b3b3;background:#e9eaeb;color:#3e3e3e;font-weight:bold;text-shadow:0 1px 1px #fff;background-image:-moz-linear-gradient(top,#f0f0f0,#e9eaeb);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#f0f0f0),color-stop(1,#e9eaeb));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#f0f0f0', EndColorStr='#e9eaeb')"}.ui-bar-c,.ui-bar-c input,.ui-bar-c select,.ui-bar-c textarea,.ui-bar-c button{font-family:Helvetica,Arial,sans-serif}.ui-body-c{border:1px solid #b3b3b3;color:#333;text-shadow:0 1px 0 #fff;background:#f0f0f0;background-image:-moz-linear-gradient(top,#eee,#ddd);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#eee),color-stop(1,#ddd));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#eeeeee', EndColorStr='#dddddd')"}.ui-body-c,.ui-body-c input,.ui-body-c select,.ui-body-c textarea,.ui-body-c button{font-family:Helvetica,Arial,sans-serif}.ui-body-c .ui-link-inherit{color:#333}.ui-body-c .ui-link{color:#2489ce;font-weight:bold}.ui-btn-up-c{border:1px solid #ccc;background:#eee;font-weight:bold;color:#444;cursor:pointer;text-shadow:0 1px 1px #f6f6f6;text-decoration:none;background-image:-moz-linear-gradient(top,#fefefe,#eee);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#fdfdfd),color-stop(1,#eee));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#fdfdfd', EndColorStr='#eeeeee')"}.ui-btn-up-c a.ui-link-inherit{color:#2f3e46}.ui-btn-hover-c{border:1px solid #bbb;background:#dadada;font-weight:bold;color:#101010;text-decoration:none;text-shadow:0 1px 1px #fff;background-image:-moz-linear-gradient(top,#ededed,#dadada);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#ededed),color-stop(1,#dadada));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#ededed', EndColorStr='#dadada')"}.ui-btn-hover-c a.ui-link-inherit{color:#2f3e46}.ui-btn-down-c{border:1px solid #808080;background:#fdfdfd;font-weight:bold;color:#111;text-shadow:0 1px 1px #fff;background-image:-moz-linear-gradient(top,#eee,#fdfdfd);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#eee),color-stop(1,#fdfdfd));-msfilter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#eeeeee', EndColorStr='#fdfdfd')"}.ui-btn-down-c a.ui-link-inherit{color:#2f3e46}
 .ui-btn-up-c,.ui-btn-hover-c,.ui-btn-down-c{font-family:Helvetica,Arial,sans-serif}.ui-bar-d{border:1px solid #ccc;background:#bbb;color:#333;text-shadow:0 1px 0 #eee;background-image:-moz-linear-gradient(top,#ddd,#bbb);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#ddd),color-stop(1,#bbb));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#dddddd', EndColorStr='#bbbbbb')"}.ui-bar-d,.ui-bar-d input,.ui-bar-d select,.ui-bar-d textarea,.ui-bar-d button{font-family:Helvetica,Arial,sans-serif}.ui-bar-d .ui-link-inherit{color:#333}.ui-bar-d .ui-link{color:#2489ce;font-weight:bold}.ui-body-d{border:1px solid #ccc;color:#333;text-shadow:0 1px 0 #fff;background:#fff}.ui-body-d,.ui-body-d input,.ui-body-d select,.ui-body-d textarea,.ui-body-d button{font-family:Helvetica,Arial,sans-serif}.ui-body-d .ui-link-inherit{color:#333}.ui-body-d .ui-link{color:#2489ce;font-weight:bold}.ui-btn-up-d{border:1px solid #ccc;background:#fff;font-weight:bold;color:#444;text-decoration:none;text-shadow:0 1px 1px #fff}.ui-btn-up-d a.ui-link-inherit{color:#333}.ui-btn-hover-d{border:1px solid #aaa;background:#eee;font-weight:bold;color:#222;cursor:pointer;text-shadow:0 1px 1px #fff;text-decoration:none;background-image:-moz-linear-gradient(top,#fdfdfd,#eee);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#fdfdfd),color-stop(1,#eee));-msfilter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#fdfdfd', EndColorStr='#eeeeee')"}.ui-btn-hover-d a.ui-link-inherit{color:#222}.ui-btn-down-d{border:1px solid #aaa;background:#fff;font-weight:bold;color:#111;text-shadow:0 1px 1px #fff;background-image:-moz-linear-gradient(top,#eee,#fff);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#eee),color-stop(1,#fff));-msfilter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#eeeeee', EndColorStr='#ffffff')"}.ui-btn-down-d a.ui-link-inherit{border:1px solid #808080;background:#ced0d2;font-weight:bold;color:#111;text-shadow:none;background-image:-moz-linear-gradient(top,#ccc,#eee);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#ccc),color-stop(1,#eee));-msfilter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#cccccc', EndColorStr='#eeeeee')"}.ui-btn-up-d,.ui-btn-hover-d,.ui-btn-down-d{font-family:Helvetica,Arial,sans-serif}.ui-bar-e{border:1px solid #f7c942;background:#fadb4e;color:#333;text-shadow:0 1px 0 #fff;background-image:-moz-linear-gradient(top,#fceda7,#fadb4e);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#fceda7),color-stop(1,#fadb4e));-msfilter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#fceda7', EndColorStr='#fadb4e')"}.ui-bar-e,.ui-bar-e input,.ui-bar-e select,.ui-bar-e textarea,.ui-bar-d button{font-family:Helvetica,Arial,sans-serif}.ui-bar-e .ui-link-inherit{color:#333}.ui-bar-e .ui-link{color:#2489ce;font-weight:bold}.ui-body-e{border:1px solid #f7c942;color:#333;text-shadow:0 1px 0 #fff;background:#faeb9e;background-image:-moz-linear-gradient(top,#fff,#faeb9e);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#fff),color-stop(1,#faeb9e));-msfilter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#ffffff', EndColorStr='#faeb9e')"}.ui-body-e,.ui-body-e input,.ui-body-e select,.ui-body-e textarea,.ui-body-e button{font-family:Helvetica,Arial,sans-serif}.ui-body-e .ui-link-inherit{color:#333}.ui-body-e .ui-link{color:#2489ce;font-weight:bold}.ui-btn-up-e{border:1px solid #f7c942;background:#fadb4e;font-weight:bold;color:#333;cursor:pointer;text-shadow:0 1px 1px #fe3;text-decoration:none;text-shadow:0 1px 0 #fff;background-image:-moz-linear-gradient(top,#fceda7,#fadb4e);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#fceda7),color-stop(1,#fadb4e));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#fceda7', EndColorStr='#fadb4e')"}
 .ui-btn-up-e a.ui-link-inherit{color:#333}.ui-btn-hover-e{border:1px solid #e79952;background:#fbe26f;font-weight:bold;color:#111;text-decoration:none;text-shadow:0 1px 1px #fff;background-image:-moz-linear-gradient(top,#fcf0b5,#fbe26f);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#fcf0b5),color-stop(1,#fbe26f));-msfilter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#fcf0b5', EndColorStr='#fbe26f')"}.ui-btn-hover-e a.ui-link-inherit{color:#333}.ui-btn-down-e{border:1px solid #f7c942;background:#fceda7;font-weight:bold;color:#111;text-shadow:0 1px 1px #fff;background-image:-moz-linear-gradient(top,#fadb4e,#fceda7);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#fadb4e),color-stop(1,#fceda7));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#fadb4e', EndColorStr='#fceda7')"}.ui-btn-down-e a.ui-link-inherit{color:#333}.ui-btn-up-e,.ui-btn-hover-e,.ui-btn-down-e{font-family:Helvetica,Arial,sans-serif}a.ui-link-inherit{text-decoration:none!important}.ui-btn-active{border:1px solid #155678;background:#4596ce;font-weight:bold;color:#fff;cursor:pointer;text-shadow:0 -1px 1px #145072;text-decoration:none;background-image:-moz-linear-gradient(top,#85bae4,#5393c5);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#85bae4),color-stop(1,#5393c5));-msfilter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#85bae4', EndColorStr='#5393c5')";outline:0}.ui-btn-active a.ui-link-inherit{color:#fff}.ui-btn-inner{border-top:1px solid #fff;border-color:rgba(255,255,255,.3)}.ui-corner-tl{-moz-border-radius-topleft:.6em;-webkit-border-top-left-radius:.6em;border-top-left-radius:.6em}.ui-corner-tr{-moz-border-radius-topright:.6em;-webkit-border-top-right-radius:.6em;border-top-right-radius:.6em}.ui-corner-bl{-moz-border-radius-bottomleft:.6em;-webkit-border-bottom-left-radius:.6em;border-bottom-left-radius:.6em}.ui-corner-br{-moz-border-radius-bottomright:.6em;-webkit-border-bottom-right-radius:.6em;border-bottom-right-radius:.6em}.ui-corner-top{-moz-border-radius-topleft:.6em;-webkit-border-top-left-radius:.6em;border-top-left-radius:.6em;-moz-border-radius-topright:.6em;-webkit-border-top-right-radius:.6em;border-top-right-radius:.6em}.ui-corner-bottom{-moz-border-radius-bottomleft:.6em;-webkit-border-bottom-left-radius:.6em;border-bottom-left-radius:.6em;-moz-border-radius-bottomright:.6em;-webkit-border-bottom-right-radius:.6em;border-bottom-right-radius:.6em}.ui-corner-right{-moz-border-radius-topright:.6em;-webkit-border-top-right-radius:.6em;border-top-right-radius:.6em;-moz-border-radius-bottomright:.6em;-webkit-border-bottom-right-radius:.6em;border-bottom-right-radius:.6em}.ui-corner-left{-moz-border-radius-topleft:.6em;-webkit-border-top-left-radius:.6em;border-top-left-radius:.6em;-moz-border-radius-bottomleft:.6em;-webkit-border-bottom-left-radius:.6em;border-bottom-left-radius:.6em}.ui-corner-all{-moz-border-radius:.6em;-webkit-border-radius:.6em;border-radius:.6em}.ui-disabled{opacity:.3}.ui-disabled,.ui-disabled a{cursor:default!important}.ui-icon{background-image:url(images/icons-18-white.png);background-repeat:no-repeat;background-color:#666;background-color:rgba(0,0,0,.4);-moz-border-radius:9px;-webkit-border-radius:9px;border-radius:9px}.ui-icon-disc{background-color:#666;background-color:rgba(0,0,0,.3);-moz-border-radius:9px;-webkit-border-radius:9px;border-radius:9px}.ui-icon-black{background-image:url(images/icons-18-black.png)}.ui-icon-black-disc{background-color:#fff;background-color:rgba(255,255,255,.3);-moz-border-radius:9px;-webkit-border-radius:9px;border-radius:9px}@media screen and (-webkit-min-device-pixel-ratio:2),screen and (max--moz-device-pixel-ratio:2){.ui-icon{background-image:url(images/icons-36-white.png);background-size:630px 18px}.ui-icon-black{background-image:url(images/icons-36-black.png)}}.ui-icon-plus{background-position:-0 0}
 .ui-icon-minus{background-position:-36px 0}.ui-icon-delete{background-position:-72px 0}.ui-icon-arrow-r{background-position:-108px 0}.ui-icon-arrow-l{background-position:-144px 0}.ui-icon-arrow-u{background-position:-180px 0}.ui-icon-arrow-d{background-position:-216px 0}.ui-icon-check{background-position:-252px 0}.ui-icon-gear{background-position:-288px 0}.ui-icon-refresh{background-position:-324px 0}.ui-icon-forward{background-position:-360px 0}.ui-icon-back{background-position:-396px 0}.ui-icon-grid{background-position:-432px 0}.ui-icon-star{background-position:-468px 0}.ui-icon-alert{background-position:-504px 0}.ui-icon-info{background-position:-540px 0}.ui-icon-home{background-position:-576px 0}.ui-icon-search{background-position:-612px 0}.ui-icon-checkbox-off,.ui-icon-checkbox-on,.ui-icon-radio-off,.ui-icon-radio-on{background-color:transparent;-moz-border-radius:0;-webkit-border-radius:0;border-radius:0;background-size:20px 20px}.ui-icon-checkbox-off{background-image:url(images/form-check-off.png)}.ui-icon-checkbox-on{background-image:url(images/form-check-on.png)}.ui-icon-radio-off{background-image:url(images/form-radio-off.png)}.ui-icon-radio-on{background-image:url(images/form-radio-on.png)}.ui-icon-searchfield{background-image:url(images/icon-search-black.png);background-size:16px 16px}.ui-icon-loading{background-image:url(images/ajax-loader.png);width:40px;height:40px;-moz-border-radius:20px;-webkit-border-radius:20px;border-radius:20px;background-size:35px 35px}.ui-btn-corner-tl{-moz-border-radius-topleft:1em;-webkit-border-top-left-radius:1em;border-top-left-radius:1em}.ui-btn-corner-tr{-moz-border-radius-topright:1em;-webkit-border-top-right-radius:1em;border-top-right-radius:1em}.ui-btn-corner-bl{-moz-border-radius-bottomleft:1em;-webkit-border-bottom-left-radius:1em;border-bottom-left-radius:1em}.ui-btn-corner-br{-moz-border-radius-bottomright:1em;-webkit-border-bottom-right-radius:1em;border-bottom-right-radius:1em}.ui-btn-corner-top{-moz-border-radius-topleft:1em;-webkit-border-top-left-radius:1em;border-top-left-radius:1em;-moz-border-radius-topright:1em;-webkit-border-top-right-radius:1em;border-top-right-radius:1em}.ui-btn-corner-bottom{-moz-border-radius-bottomleft:1em;-webkit-border-bottom-left-radius:1em;border-bottom-left-radius:1em;-moz-border-radius-bottomright:1em;-webkit-border-bottom-right-radius:1em;border-bottom-right-radius:1em}.ui-btn-corner-right{-moz-border-radius-topright:1em;-webkit-border-top-right-radius:1em;border-top-right-radius:1em;-moz-border-radius-bottomright:1em;-webkit-border-bottom-right-radius:1em;border-bottom-right-radius:1em}.ui-btn-corner-left{-moz-border-radius-topleft:1em;-webkit-border-top-left-radius:1em;border-top-left-radius:1em;-moz-border-radius-bottomleft:1em;-webkit-border-bottom-left-radius:1em;border-bottom-left-radius:1em}.ui-btn-corner-all{-moz-border-radius:1em;-webkit-border-radius:1em;border-radius:1em}.ui-corner-tl,.ui-corner-tr,.ui-corner-bl,.ui-corner-br,.ui-corner-top,.ui-corner-bottom,.ui-corner-right,.ui-corner-left,.ui-corner-all,.ui-btn-corner-tl,.ui-btn-corner-tr,.ui-btn-corner-bl,.ui-btn-corner-br,.ui-btn-corner-top,.ui-btn-corner-bottom,.ui-btn-corner-right,.ui-btn-corner-left,.ui-btn-corner-all{-webkit-background-clip:padding-box;-moz-background-clip:padding-box;background-clip:padding-box}.ui-overlay{background:#666;opacity:.5;filter:Alpha(Opacity=50);position:absolute;width:100%;height:100%}.ui-overlay-shadow{-moz-box-shadow:0 0 12px rgba(0,0,0,.6);-webkit-box-shadow:0 0 12px rgba(0,0,0,.6);box-shadow:0 0 12px rgba(0,0,0,.6)}.ui-shadow{-moz-box-shadow:0 1px 4px rgba(0,0,0,.3);-webkit-box-shadow:0 1px 4px rgba(0,0,0,.3);box-shadow:0 1px 4px rgba(0,0,0,.3)}.ui-bar-a .ui-shadow,.ui-bar-b .ui-shadow,.ui-bar-c .ui-shadow{-moz-box-shadow:0 1px 0 rgba(255,255,255,.3);-webkit-box-shadow:0 1px 0 rgba(255,255,255,.3);box-shadow:0 1px 0 rgba(255,255,255,.3)}
 .ui-shadow-inset{-moz-box-shadow:inset 0 1px 4px rgba(0,0,0,.2);-webkit-box-shadow:inset 0 1px 4px rgba(0,0,0,.2);box-shadow:inset 0 1px 4px rgba(0,0,0,.2)}.ui-icon-shadow{-moz-box-shadow:0 1px 0 rgba(255,255,255,.4);-webkit-box-shadow:0 1px 0 rgba(255,255,255,.4);box-shadow:0 1px 0 rgba(255,255,255,.4)}.ui-focus{-moz-box-shadow:0 0 12px #387bbe;-webkit-box-shadow:0 0 12px #387bbe;box-shadow:0 0 12px #387bbe}.ui-mobile-nosupport-boxshadow *{-moz-box-shadow:none!important;-webkit-box-shadow:none!important;box-shadow:none!important}.ui-mobile-nosupport-boxshadow .ui-focus{outline-width:2px}.ui-mobile fieldset,.ui-page{padding:0;margin:0}.ui-mobile a img,.ui-mobile fieldset{border:0}.ui-mobile-viewport{margin:0;overflow-x:hidden;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}[data-role=page],[data-role=dialog],.ui-page{top:0;left:0;width:100%;min-height:100%;position:absolute;display:none;border:0}.ui-page-active{display:block;overflow:visible}.portrait,.portrait .ui-page{min-height:480px}.landscape,.landscape .ui-page{min-height:320px}.ui-loading .ui-mobile-viewport{overflow:hidden!important}.ui-loading .ui-loader{display:block}.ui-loading .ui-page{overflow:hidden}.ui-loader{display:none;position:absolute;opacity:.85;z-index:10;left:50%;width:200px;margin-left:-130px;margin-top:-35px;padding:10px 30px}.ui-loader h1{font-size:15px;text-align:center}.ui-loader .ui-icon{position:static;display:block;opacity:.9;margin:0 auto;width:35px;height:35px;background-color:transparent}.ui-mobile-rendering>*{visibility:hidden}.ui-bar,.ui-body{position:relative;padding:.4em 15px;overflow:hidden;display:block;}.ui-bar{font-size:16px;margin:0}.ui-bar h1,.ui-bar h2,.ui-bar h3,.ui-bar h4,.ui-bar h5,.ui-bar h6{margin:0;padding:0;font-size:16px;display:inline-block}.ui-header,.ui-footer{display:block}.ui-page .ui-header,.ui-page .ui-footer{position:relative}.ui-header .ui-btn-left{position:absolute;left:10px;top:.4em}.ui-header .ui-title,.ui-footer .ui-title{text-align:center;font-size:20px;display:block;margin:.6em 90px .8em;padding:0;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;outline:0!important}.ui-header .ui-btn-right{position:absolute;right:10px;top:.4em}.ui-content{border-width:0;overflow:visible;overflow-x:hidden;padding:15px}.ui-page-fullscreen .ui-content{padding:0}.ui-icon{width:18px;height:18px}.ui-fullscreen img{max-width:100%}.ui-nojs{position:absolute;left:-9999px}.spin{-webkit-transform:rotate(360deg);-webkit-animation-name:spin;-webkit-animation-duration:1s;-webkit-animation-iteration-count:infinite}@-webkit-keyframes spin{from{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(360deg)}}.in,.out{-webkit-animation-timing-function:ease-in-out;-webkit-animation-duration:350ms}.slide.in{-webkit-transform:translateX(0);-webkit-animation-name:slideinfromright}.slide.out{-webkit-transform:translateX(-100%);-webkit-animation-name:slideouttoleft}.slide.in.reverse{-webkit-transform:translateX(0);-webkit-animation-name:slideinfromleft}.slide.out.reverse{-webkit-transform:translateX(100%);-webkit-animation-name:slideouttoright}.slideup.in{-webkit-transform:translateY(0);-webkit-animation-name:slideinfrombottom;z-index:10}.slideup.out{-webkit-animation-name:dontmove;z-index:0}.slideup.out.reverse{-webkit-transform:translateY(100%);z-index:10;-webkit-animation-name:slideouttobottom}.slideup.in.reverse{z-index:0;-webkit-animation-name:dontmove}.slidedown.in{-webkit-transform:translateY(0);-webkit-animation-name:slideinfromtop;z-index:10}.slidedown.out{-webkit-animation-name:dontmove;z-index:0}.slidedown.out.reverse{-webkit-transform:translateY(-100%);z-index:10;-webkit-animation-name:slideouttotop}
 .slidedown.in.reverse{z-index:0;-webkit-animation-name:dontmove}@-webkit-keyframes slideinfromright{from{-webkit-transform:translateX(100%)}to{-webkit-transform:translateX(0)}}@-webkit-keyframes slideinfromleft{from{-webkit-transform:translateX(-100%)}to{-webkit-transform:translateX(0)}}@-webkit-keyframes slideouttoleft{from{-webkit-transform:translateX(0)}to{-webkit-transform:translateX(-100%)}}@-webkit-keyframes slideouttoright{from{-webkit-transform:translateX(0)}to{-webkit-transform:translateX(100%)}}@-webkit-keyframes slideinfromtop{from{-webkit-transform:translateY(-100%)}to{-webkit-transform:translateY(0)}}@-webkit-keyframes slideinfrombottom{from{-webkit-transform:translateY(100%)}to{-webkit-transform:translateY(0)}}@-webkit-keyframes slideouttobottom{from{-webkit-transform:translateY(0)}to{-webkit-transform:translateY(100%)}}@-webkit-keyframes slideouttotop{from{-webkit-transform:translateY(0)}to{-webkit-transform:translateY(-100%)}}@-webkit-keyframes fadein{from{opacity:0}to{opacity:1}}@-webkit-keyframes fadeout{from{opacity:1}to{opacity:0}}.fade.in{opacity:1;z-index:10;-webkit-animation-name:fadein}.fade.out{z-index:0;-webkit-animation-name:fadeout}.ui-mobile-viewport-perspective{-webkit-perspective:1000;position:absolute}.ui-mobile-viewport-transitioning,.ui-mobile-viewport-transitioning .ui-page{width:100%;height:100%;overflow:hidden}.flip{-webkit-animation-duration:.65s;-webkit-backface-visibility:hidden;-webkit-transform:translateX(0)}.flip.in{-webkit-transform:rotateY(0) scale(1);-webkit-animation-name:flipinfromleft}.flip.out{-webkit-transform:rotateY(-180deg) scale(.8);-webkit-animation-name:flipouttoleft}.flip.in.reverse{-webkit-transform:rotateY(0) scale(1);-webkit-animation-name:flipinfromright}.flip.out.reverse{-webkit-transform:rotateY(180deg) scale(.8);-webkit-animation-name:flipouttoright}@-webkit-keyframes flipinfromright{from{-webkit-transform:rotateY(-180deg) scale(.8)}to{-webkit-transform:rotateY(0) scale(1)}}@-webkit-keyframes flipinfromleft{from{-webkit-transform:rotateY(180deg) scale(.8)}to{-webkit-transform:rotateY(0) scale(1)}}@-webkit-keyframes flipouttoleft{from{-webkit-transform:rotateY(0) scale(1)}to{-webkit-transform:rotateY(-180deg) scale(.8)}}@-webkit-keyframes flipouttoright{from{-webkit-transform:rotateY(0) scale(1)}to{-webkit-transform:rotateY(180deg) scale(.8)}}@-webkit-keyframes dontmove{from{opacity:1}to{opacity:1}}.pop{-webkit-transform-origin:50% 50%}.pop.in{-webkit-transform:scale(1);opacity:1;-webkit-animation-name:popin;z-index:10}.pop.out.reverse{-webkit-transform:scale(.2);opacity:0;-webkit-animation-name:popout;z-index:10}.pop.in.reverse{z-index:0;-webkit-animation-name:dontmove}@-webkit-keyframes popin{from{-webkit-transform:scale(.2);opacity:0}to{-webkit-transform:scale(1);opacity:1}}@-webkit-keyframes popout{from{-webkit-transform:scale(1);opacity:1}to{-webkit-transform:scale(.2);opacity:0}}.ui-grid-a,.ui-grid-b,.ui-grid-c,.ui-grid-d{overflow:hidden}.ui-block-a,.ui-block-b,.ui-block-c,.ui-block-d,.ui-block-e{margin:0;padding:0;border:0;float:left}.ui-grid-a .ui-block-a,.ui-grid-a .ui-block-b{width:50%}.ui-grid-a .ui-block-a{clear:left}.ui-grid-b .ui-block-a,.ui-grid-b .ui-block-b,.ui-grid-b .ui-block-c{width:33.333%}.ui-grid-b .ui-block-a{clear:left}.ui-grid-c .ui-block-a,.ui-grid-c .ui-block-b,.ui-grid-c .ui-block-c,.ui-grid-c .ui-block-d{width:25%}.ui-grid-c .ui-block-a{clear:left}.ui-grid-d .ui-block-a,.ui-grid-d .ui-block-b,.ui-grid-d .ui-block-c,.ui-grid-d .ui-block-d,.ui-grid-d .ui-block-e{width:20%}.ui-grid-d .ui-block-a{clear:left}.ui-header,.ui-footer,.ui-page-fullscreen .ui-header,.ui-page-fullscreen .ui-footer{position:absolute;overflow:hidden;width:100%;border-left-width:0;border-right-width:0}.ui-header-fixed,.ui-footer-fixed{z-index:1000;-webkit-transform:translateZ(0)}.ui-footer-duplicate,.ui-page-fullscreen .ui-fixed-inline{display:none}.ui-page-fullscreen .ui-header,.ui-page-fullscreen .ui-footer{opacity:.9}
 .ui-navbar{overflow:hidden}.ui-navbar ul,.ui-navbar-expanded ul{list-style:none;padding:0;margin:0;position:relative;display:block;border:0}.ui-navbar-collapsed ul{float:left;width:75%;margin-right:-2px}.ui-navbar-collapsed .ui-navbar-toggle{float:left;width:25%}.ui-navbar li.ui-navbar-truncate{position:absolute;left:-9999px;top:-9999px}.ui-navbar li .ui-btn,.ui-navbar .ui-navbar-toggle .ui-btn{display:block;font-size:12px;text-align:center;margin:0;border-right-width:0}.ui-navbar li .ui-btn{margin-right:-1px}.ui-navbar li .ui-btn:last-child{margin-right:0}.ui-header .ui-navbar li .ui-btn,.ui-header .ui-navbar .ui-navbar-toggle .ui-btn,.ui-footer .ui-navbar li .ui-btn,.ui-footer .ui-navbar .ui-navbar-toggle .ui-btn{border-top-width:0;border-bottom-width:0}.ui-navbar .ui-btn-inner{padding-left:2px;padding-right:2px}.ui-navbar-noicons li .ui-btn .ui-btn-inner,.ui-navbar-noicons .ui-navbar-toggle .ui-btn-inner{padding-top:.8em;padding-bottom:.9em}.ui-navbar-expanded .ui-btn{margin:0;font-size:14px}.ui-navbar-expanded .ui-btn-inner{padding-left:5px;padding-right:5px}.ui-navbar-expanded .ui-btn-icon-top .ui-btn-inner{padding:45px 5px 15px;text-align:center}.ui-navbar-expanded .ui-btn-icon-top .ui-icon{top:15px}.ui-navbar-expanded .ui-btn-icon-bottom .ui-btn-inner{padding:15px 5px 45px;text-align:center}.ui-navbar-expanded .ui-btn-icon-bottom .ui-icon{bottom:15px}.ui-navbar-expanded li .ui-btn .ui-btn-inner{min-height:2.5em}.ui-navbar-expanded .ui-navbar-noicons .ui-btn .ui-btn-inner{padding-top:1.8em;padding-bottom:1.9em}.ui-btn{display:block;text-align:center;cursor:pointer;position:relative;margin:.5em 5px;padding:0}.ui-btn:focus,.ui-btn:active{outline:0}.ui-header .ui-btn,.ui-footer .ui-btn,.ui-bar .ui-btn{display:inline-block;font-size:13px;margin:0}.ui-btn-inline{display:inline-block}.ui-btn-inner{padding:.6em 25px;display:block;height:100%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;position:relative}.ui-header .ui-btn-inner,.ui-footer .ui-btn-inner,.ui-bar .ui-btn-inner{padding:.4em 8px .5em}.ui-btn-icon-notext{display:inline-block;width:20px;height:20px;padding:2px 1px 2px 3px;text-indent:-9999px}.ui-btn-icon-notext .ui-btn-inner{padding:0}.ui-btn-icon-notext .ui-btn-text{position:absolute;left:-999px}.ui-btn-icon-left .ui-btn-inner{padding-left:33px}.ui-header .ui-btn-icon-left .ui-btn-inner,.ui-footer .ui-btn-icon-left .ui-btn-inner,.ui-bar .ui-btn-icon-left .ui-btn-inner{padding-left:27px}.ui-btn-icon-right .ui-btn-inner{padding-right:33px}.ui-header .ui-btn-icon-right .ui-btn-inner,.ui-footer .ui-btn-icon-right .ui-btn-inner,.ui-bar .ui-btn-icon-right .ui-btn-inner{padding-right:27px}.ui-btn-icon-top .ui-btn-inner{padding-top:33px}.ui-header .ui-btn-icon-top .ui-btn-inner,.ui-footer .ui-btn-icon-top .ui-btn-inner,.ui-bar .ui-btn-icon-top .ui-btn-inner{padding-top:27px}.ui-btn-icon-bottom .ui-btn-inner{padding-bottom:33px}.ui-header .ui-btn-icon-bottom .ui-btn-inner,.ui-footer .ui-btn-icon-bottom .ui-btn-inner,.ui-bar .ui-btn-icon-bottom .ui-btn-inner{padding-bottom:27px}.ui-btn-icon-notext .ui-icon{display:block}.ui-btn-icon-left .ui-icon,.ui-btn-icon-right .ui-icon{position:absolute;top:50%;margin-top:-9px}.ui-btn-icon-top .ui-icon,.ui-btn-icon-bottom .ui-icon{position:absolute;left:50%;margin-left:-9px}.ui-btn-icon-left .ui-icon{left:10px}.ui-btn-icon-right .ui-icon{right:10px}.ui-header .ui-btn-icon-left .ui-icon,.ui-footer .ui-btn-icon-left .ui-icon,.ui-bar .ui-btn-icon-left .ui-icon{left:4px}.ui-header .ui-btn-icon-right .ui-icon,.ui-footer .ui-btn-icon-right .ui-icon,.ui-bar .ui-btn-icon-right .ui-icon{right:4px}.ui-header .ui-btn-icon-top .ui-icon,.ui-footer .ui-btn-icon-top .ui-icon,.ui-bar .ui-btn-icon-top .ui-icon{top:4px}.ui-header .ui-btn-icon-bottom .ui-icon,.ui-footer .ui-btn-icon-bottom .ui-icon,.ui-bar .ui-btn-icon-bottom .ui-icon{bottom:4px}.ui-btn-icon-top .ui-icon{top:5px}.ui-btn-icon-bottom .ui-icon{bottom:5px}
 .ui-btn-hidden{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-appearance:button;opacity:0;cursor:pointer}.ui-collapsible-contain{margin:.5em 0}.ui-collapsible-heading{font-size:16px;display:block;margin:0 -8px;padding:0;border-width:0 0 1px 0;position:relative}.ui-collapsible-heading a{text-align:left;margin:0}.ui-collapsible-heading a .ui-btn-inner{padding-left:40px}.ui-collapsible-heading a span.ui-btn{position:absolute;left:6px;top:50%;margin:-12px 0 0 0;width:20px;height:20px;padding:1px 0 1px 2px;text-indent:-9999px}.ui-collapsible-heading a span.ui-btn .ui-btn-inner{padding:0}.ui-collapsible-heading a span.ui-btn .ui-icon{left:0;margin-top:-10px}.ui-collapsible-heading-status{position:absolute;left:-9999px}.ui-collapsible-content{display:block;padding:10px 0 10px 8px}.ui-collapsible-content-collapsed{display:none}.ui-collapsible-set{margin:.5em 0}.ui-collapsible-set .ui-collapsible-contain{margin:-1px 0 0}.ui-controlgroup,fieldset.ui-controlgroup{padding:0;margin:.5em 0 1em}.ui-bar .ui-controlgroup{margin:0 .3em}.ui-controlgroup-label{font-size:16px;line-height:1.4;font-weight:normal;margin:0 0 .3em}.ui-controlgroup-controls{display:block;width:95%}.ui-controlgroup li{list-style:none}.ui-controlgroup-vertical .ui-btn,.ui-controlgroup-vertical .ui-checkbox,.ui-controlgroup-vertical .ui-radio{margin:0;border-bottom-width:0}.ui-controlgroup-vertical .ui-controlgroup-last{border-bottom-width:1px}.ui-controlgroup-horizontal{padding:0}.ui-controlgroup-horizontal .ui-btn,.ui-controlgroup-horizontal .ui-checkbox,.ui-controlgroup-horizontal .ui-radio{margin:0 -5px 0 0;display:inline-block}.ui-controlgroup-horizontal .ui-checkbox .ui-btn,.ui-controlgroup-horizontal .ui-radio .ui-btn,.ui-controlgroup-horizontal .ui-checkbox:last-child,.ui-controlgroup-horizontal .ui-radio:last-child{margin-right:0}.ui-controlgroup-horizontal .ui-controlgroup-last{margin-right:0}.ui-controlgroup .ui-checkbox label,.ui-controlgroup .ui-radio label{font-size:20px}.min-width-480px .ui-controlgroup-label{vertical-align:top;display:inline-block;width:20%;margin:0 2% 0 0}.min-width-480px .ui-controlgroup-controls{width:60%;display:inline-block}.ui-dialog{min-height:480px}.ui-dialog .ui-header,.ui-dialog .ui-content,.ui-dialog .ui-footer{margin:15px;position:relative}.ui-dialog .ui-header,.ui-dialog .ui-footer{z-index:10;width:auto}.ui-dialog .ui-content,.ui-dialog .ui-footer{margin-top:-15px}.ui-checkbox,.ui-radio{position:relative;margin:.2em 0 .5em;z-index:1}.ui-checkbox .ui-btn,.ui-radio .ui-btn{margin:0;text-align:left;z-index:2}.ui-checkbox .ui-btn-icon-left .ui-btn-inner,.ui-radio .ui-btn-icon-left .ui-btn-inner{padding-left:45px}.ui-checkbox .ui-btn-icon-right .ui-btn-inner,.ui-radio .ui-btn-icon-right .ui-btn-inner{padding-right:45px}.ui-checkbox .ui-btn-icon-left .ui-icon,.ui-radio .ui-btn-icon-left .ui-icon{left:15px}.ui-checkbox .ui-btn-icon-right .ui-icon,.ui-radio .ui-btn-icon-right .ui-icon{right:15px}.ui-checkbox input,.ui-radio input{position:absolute;left:20px;top:50%;width:10px;height:10px;margin:-5px 0 0 0;outline:0!important;z-index:1}.ui-field-contain{background:0;padding:0.6em 0 0 1em;margin:0;border-bottom-width:1px;overflow:visible}.ui-field-contain:first-child{border-top-width:0}.min-width-480px .ui-field-contain{border-width:0;padding:0;margin:1em 0}.ui-select{display:block;position:relative}.ui-select select{position:absolute;left:-9999px;top:-9999px}.ui-select .ui-btn select{cursor:pointer;-webkit-appearance:button;left:0;top:0;width:100%;height:100%;opacity:.001}.ui-select .ui-btn select.ui-select-nativeonly{opacity:1}.ui-select .ui-btn-icon-right .ui-btn-inner{padding-right:45px}.ui-select .ui-btn-icon-right .ui-icon{right:15px}label.ui-select{font-size:16px;line-height:1.4;font-weight:normal;margin:0 0 .3em;display:block}.ui-select .ui-btn-text,.ui-selectmenu .ui-btn-text{display:inline-block;min-height:1em}.ui-select .ui-btn-text{text-overflow:ellipsis;overflow:hidden;width:85%}
 .ui-selectmenu{position:absolute;padding:0;z-index:100!important;width:80%;max-width:350px;padding:6px}.ui-selectmenu .ui-listview{margin:0}.ui-selectmenu .ui-btn.ui-li-divider{cursor:default}.ui-selectmenu-hidden{top:-9999px;left:-9999px}.ui-selectmenu-screen{position:absolute;top:0;left:0;width:100%;height:100%;z-index:99}.ui-screen-hidden,.ui-selectmenu-list .ui-li .ui-icon{display:none}.ui-selectmenu-list .ui-li .ui-icon{display:block}.ui-li.ui-selectmenu-placeholder{display:none}.min-width-480px label.ui-select{display:inline-block;width:20%;margin:0 2% 0 0}.min-width-480px .ui-select{width:60%;display:inline-block}.ui-selectmenu .ui-header h1:after{content:'.';visibility:hidden}label.ui-input-text{font-size:16px;line-height:1.4;display:block;font-weight:normal;margin:0 0 .3em}input.ui-input-text,textarea.ui-input-text{background-image:none;padding:.4em;line-height:1.4;font-size:16px;display:block;width:90%}input.ui-input-text{-webkit-appearance:none}textarea.ui-input-text{height:50px;-webkit-transition:height 200ms linear;-moz-transition:height 200ms linear;-o-transition:height 200ms linear;transition:height 200ms linear}.ui-input-search{padding:0 30px;width:77%;background-position:8px 50%;background-repeat:no-repeat;position:relative}.ui-input-search input.ui-input-text{border:0;width:98%;padding:.4em 0;margin:0;display:block;background:transparent none;outline:0!important}.ui-input-search .ui-input-clear{position:absolute;right:0;top:50%;margin-top:-14px}.ui-input-search .ui-input-clear-hidden{display:none}.min-width-480px label.ui-input-text{vertical-align:top}.min-width-480px label.ui-input-text{display:inline-block;width:20%;margin:0 2% 0 0}.min-width-480px input.ui-input-text,.min-width-480px textarea.ui-input-text,.min-width-480px .ui-input-search{width:60%;display:inline-block}.min-width-480px .ui-input-search{width:50%}.ui-listview{margin:0;counter-reset:listnumbering}.ui-content .ui-listview{margin:-15px}.ui-content .ui-listview-inset{margin:1em 0}.ui-listview,.ui-li{list-style:none;padding:0;zoom:1}.ui-li{display:block;margin:0;font-size: 13px;position:relative;overflow:hidden;text-align:left;border-width:0;border-top-width:1px}.ui-li .ui-btn-text{text-overflow:ellipsis;overflow:hidden;white-space:nowrap; display:block}.ui-li-divider,.ui-li-static{padding:.5em 15px;font-size:14px;font-weight:bold;counter-reset:listnumbering}ol.ui-listview .ui-link-inherit:before,.ui-li-dec{font-size:.8em;display:inline-block;padding-right:.3em;font-weight:normal;counter-increment:listnumbering;content:counter(listnumbering) ". "}ol.ui-listview .ui-li-jsnumbering:before{content:""!important}.ui-listview-inset .ui-li{border-right-width:0px;border-left-width:0px}.ui-li:last-child{border-bottom-width:1px}.ui-li .ui-btn-inner{display:block;position:relative;padding:.7em 75px .7em 15px}.ui-li-has-thumb .ui-btn-inner{min-height:60px;padding-left:100px}.ui-li-has-icon .ui-btn-inner{min-height:20px;padding-left:40px}.ui-li-heading{font-size:16px;font-weight:bold;display:block;margin:.6em 0;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.ui-li-desc{font-size:12px;font-weight:normal;display:block;margin:-.5em 0 .6em;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.ui-li-thumb,.ui-li-icon{position:absolute;left:1px;top:0;max-height:80px;max-width:80px}.ui-li-icon{max-height:40px;max-width:40px;left:10px;top:.9em}.ui-li-thumb,.ui-li-icon,.ui-li-content{float:left;margin-right:10px}.ui-li-aside{float:right;width:50%;text-align:right;margin:.3em 0}.min-width-480px .ui-li-aside{width:45%}.ui-li-has-alt .ui-btn-inner{padding-right:95px}.ui-li-count{position:absolute;font-size:11px;font-weight:bold;padding:.2em .5em;top:50%;margin-top:-.9em;right:38px}.ui-li-divider .ui-li-count{right:10px}.ui-li-has-alt .ui-li-count{right:55px}.ui-li-link-alt{position:absolute;width:40px;height:100%;border-width:0;border-left-width:1px;top:0;right:0;margin:0;padding:0}
 .bluebg {background:#4596ce !important; color:#fff;cursor:pointer;text-shadow:0 -1px 1px #145072;text-decoration:none;background-image:-moz-linear-gradient(top,#85bae4,#5393c5) !important;background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#85bae4),color-stop(1,#5393c5)) !important;-msfilter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#85bae4', EndColorStr='#5393c5') !important";outline:0}.ui-li-link-alt .ui-btn{overflow:hidden;position:absolute;right:8px;top:50%;margin:-11px 0 0 0;border-bottom-width:1px}.ui-li-link-alt .ui-btn-inner{padding:0;position:static}.ui-li-link-alt .ui-btn .ui-icon{right:50%;margin-right:-9px}.ui-listview-filter{border-width:0;overflow:hidden;margin:-15px -15px 15px -15px}.ui-listview-filter .ui-input-search{margin:5px;width:auto;display:block}@media only screen and (min-device-width:768px) and (max-device-width:1024px){.ui-li .ui-btn-text{overflow:visible}}label.ui-slider{display:block}input.ui-slider-input,.min-width-480px input.ui-slider-input{display:inline-block;width:50px}select.ui-slider-switch{display:none}div.ui-slider{position:relative;display:inline-block;overflow:visible;height:15px;padding:0;margin:0 2% 0 20px;top:4px;width:66%}a.ui-slider-handle{position:absolute;z-index:10;top:50%;width:28px;height:28px;margin-top:-15px;margin-left:-15px}a.ui-slider-handle .ui-btn-inner{padding-left:0;padding-right:0}.min-width-480px label.ui-slider{display:inline-block;width:20%;margin:0 2% 0 0}.min-width-480px div.ui-slider{width:45%}div.ui-slider-switch{height:32px;overflow:hidden;margin-left:0}div.ui-slider-inneroffset{margin-left:50%;position:absolute;top:1px;height:100%;width:50%}div.ui-slider-handle-snapping{-webkit-transition:left 100ms linear}div.ui-slider-labelbg{position:absolute;top:0;margin:0;border-width:0}div.ui-slider-switch div.ui-slider-labelbg-a{width:60%;height:100%;left:0}div.ui-slider-switch div.ui-slider-labelbg-b{width:60%;height:100%;right:0}.ui-slider-switch-a div.ui-slider-labelbg-a,.ui-slider-switch-b div.ui-slider-labelbg-b{z-index:1}.ui-slider-switch-a div.ui-slider-labelbg-b,.ui-slider-switch-b div.ui-slider-labelbg-a{z-index:10}div.ui-slider-switch a.ui-slider-handle{z-index:20;width:101%;height:32px;margin-top:-18px;margin-left:-101%}span.ui-slider-label{width:100%;position:absolute;height:32px;font-size:16px;text-align:center;line-height:2;background:0;border-color:transparent}span.ui-slider-label-a{left:-23%;margin-right:-1px;color:#999}span.ui-slider-label-b{right:-23%;margin-left:-1px}.anreise{font-size: 16px; color: #444444; display: inline-block;}.abreise{font-size: 16px; color:#008000}.clock, .clock2{float: right; font-size: 30px; right: -49px; position: relative; display:block; height: 1px; bottom: 84px;}.phone, .reactivate, .phone2 {bottom: 84px; display: block; float: right; height: 1px; margin: 0; position: relative; right: -40px;} .reactivate, .phone3{right: -5px} .grey, .grey a{background: #666 !important; color: #fff !important} .lightyellow {background: #D1D1D1} .label{padding: 5px; float: left; font-size: 12px; min-width: 70px;} #msg {color: #F00} *{padding: 0; margin: 0} .pxplogo{cursor: pointer;display:block; width: 210px; margin: 5px; height: 35px; top: -5%; right: 96px; position:absolute}.first-row{font-size: 21px}.preis{color: #F00; display: inline-block} .bewertung, .quittung {cursor:pointer; display: block; float: right; right: 20px; position: relative; bottom: 33px; height: 1px; margin-right: 60px} .logout{bottom: 40px; float: right; height: 1px; position: relative; width: 35px;cursor:pointer} .key{top: 4px; position:relative} .adm {position:absolute; top:19px; right: 43px; color:#a9a9a9; cursor: pointer} .atable td {min-width: 250px; max-width: 250px; display:inline-block} .totalprice{float:right; display:block; margin: 5px; font-size:16px } .priceright {text-align: right} .editbtn {bottom: 50px; display: block; float: right; height: 35px; position: relative; right: 130px; width: 35px; background: url('images/edit.png')}
 #sort {float: right; position: absolute; right: 330px; top: 35px; font-size: 20px} .stat {height: 57px; background: #A0F791} #hour, #terminal {width: 250px; left: 9%; top: 30%; height: 28px; display: inline-block; position: fixed; z-index: 2147483647; background: #EEEEEE; padding: 10px; border: 1px solid #B2B2B2;} #hour input, #terminal option, #terminal select {font-size: 16px; width: 100px; height: 20px} .shad {-moz-box-shadow:0 0 12px rgba(0,0,0,.6);-webkit-box-shadow:0 0 12px rgba(0,0,0,.6);box-shadow:0 0 12px rgba(0,0,0,.6)}.ui-btn table {font-size: 19px} .ui-li {height: 120px} .logged {position: absolute; top: 15px; left: 20px; color: white; text-shadow: none; font-weight: bold; font-size: 20px} #radiolist { height: 75px } .formsub { background-color: #FF0000 } .greyout {color: #999 !important} .edit-lower { bottom: 30px !important } .greenbg {background:#006633 !important; color:#fff;cursor:pointer;text-shadow:0 -1px 1px #145072;text-decoration:none;background-image:-moz-linear-gradient(top,#507551, #7CD200) !important;background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#507551),color-stop(1,#7CD200)) !important;-msfilter:"progid:DXImageTransform.Microsoft.gradient(startColorStr='#507551', EndColorStr='#7CD200') !important";outline:0}
      /* iPad overflow rule you highlighted */
      @media only screen and (min-device-width:768px) and (max-device-width:1024px){
        .ui-li .ui-btn-text { overflow: visible; }
      }
    `;
    root.appendChild(style);
    root.appendChild(container);
    setShadow(container);
  }, [shadow]);
  return React.createElement("div", { ref: hostRef }, shadow ? createPortal(children, shadow) : null);
}
import { createPortal } from "react-dom";
import Head from "next/head";

function PXHeader({
  username,
  tab,
  setTab,
  suchtext,
  setSuchtext,
  sort,
  setSort,
  onLogout,
  hideControls = false,
}) {

  return (
    <div style={{
      width: "100%",
      background: "linear-gradient(#222 85%,#eee 100%)",
      margin: 0,
      padding: 0,
      overflowX: "hidden"
    }}>
      <div style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: "0 0 0 24px",
        height: 56,
        background: "linear-gradient(#222,#222 85%,#222a 100%)",
        borderBottom: "1.5px solid #666",
        color: "#fff",
        fontSize: 28,
        fontWeight: "bold",
        letterSpacing: 0.5,
        fontFamily: "Arial, Helvetica, sans-serif"
      }}>
        <div style={{ fontSize: 28, fontWeight: "bold" }}>{username || ""}</div>
        <div style={{ flex: 1, textAlign: "center", fontWeight: "bold", fontSize: 28 }}>
          <span style={{ color: "#fff" }}>Valet</span>
          <span style={{ color: "#a2ff44" }}>X</span>
          <span style={{ color: "#fff" }}>press-</span>
          <span style={{ color: "#fff", fontWeight: 400, fontSize: 24 }}>Fahrerliste</span>
        </div>
        <div style={{ minWidth: 50, textAlign: "right", paddingRight: 28, display: onLogout ? "block" : "none" }}>
          <span
            style={{
              fontSize: 36,
              fontWeight: 200,
              color: "#fff",
              cursor: "pointer",
              userSelect: "none",
              transition: "color 0.2s"
            }}
            title="Abmelden"
            onClick={onLogout}
          >&#x23FB;</span>
        </div>
      </div>
      <div style={{
        background: "#ededed",
        width: "100%",
        minHeight: 68,
        display: hideControls ? "none" : "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1.5px solid #dedede"
      }}>
        <div style={{ display: "flex", alignItems: "center", marginLeft: 14, gap: 0 }}>
          <button
            onClick={() => setTab && setTab("heute")}
            style={{
              background: tab === "heute" ? "#6DB6E2" : "#fff",
              color: tab === "heute" ? "#fff" : "#222",
              fontWeight: "bold",
              fontSize: 24,
              padding: "7px 36px",
              border: "1px solid #ccc",
              borderRight: "none",
              borderRadius: "16px 0 0 16px",
              cursor: setTab ? "pointer" : "default"
            }}>Heute</button>
          <button
            onClick={() => setTab && setTab("2tage")}
            style={{
              background: tab === "2tage" ? "#6DB6E2" : "#fff",
              color: tab === "2tage" ? "#fff" : "#222",
              fontWeight: "bold",
              fontSize: 24,
              padding: "7px 36px",
              border: "1px solid #ccc",
              borderRight: "none",
              borderLeft: "none",
              borderRadius: 0,
              cursor: setTab ? "pointer" : "default"
            }}>2-Tage</button>
          <button
            onClick={() => setTab && setTab("alle")}
            style={{
              background: tab === "alle" ? "#6DB6E2" : "#fff",
              color: tab === "alle" ? "#fff" : "#222",
              fontWeight: "bold",
              fontSize: 24,
              padding: "7px 36px",
              border: "1px solid #ccc",
              borderLeft: "none",
              borderRadius: "0 16px 16px 0",
              cursor: setTab ? "pointer" : "default"
            }}>Alle</button>
        </div>
        <div style={{ flex: 1, display: tab === "alle" ? "none" : "flex", alignItems: "center", margin: "0 26px", maxWidth: 620 }}>
          <input
            type="text"
            value={suchtext || ""}
            onChange={e => setSuchtext && setSuchtext(e.target.value)}
            placeholder="Suche nach Kennzeichen"
            style={{
              width: "100%",
              fontSize: 18,
              padding: "7px 15px",
              borderRadius: 8,
              border: "1px solid #bbb",
              marginLeft: 16,
              marginRight: 16
            }}
            disabled={!setSuchtext}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 32, marginRight: 38 }}>
          <select
            value={sort || "abflugdatum"}
            onChange={e => setSort && setSort(e.target.value)}
            style={{
              color: "#1689ca",
              fontSize: 22,
              fontWeight: "bold",
              border: "none",
              background: "none",
              textDecoration: "underline",
              cursor: setSort ? "pointer" : "default",
              marginRight: 20
            }}
            disabled={!setSort}
          >
            <option value="abflugdatum">Sortieren: Abflugdatum</option>
            <option value="rueckflugdatum">Sortieren: Rückflugdatum</option>
            <option value="name">Sortieren: Name</option>
          </select>
          <img src="/images/Logo.png" alt="ValetXpress" height={58} style={{ marginLeft: 18, marginRight: 10 }} />
        </div>
      </div>
    </div>
  );
}

function parseDate(dt, time) {
  if (!dt) return new Date(0);
  return new Date(`${dt}T${(time || "00:00")}:00`);
}
function formatDE(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const tag = d.getDate().toString().padStart(2, '0');
  const monat = (d.getMonth() + 1).toString().padStart(2, '0');
  const jahr = d.getFullYear();
  return `${tag}.${monat}.${jahr}`;
}
function priceDisplay(row) {
  let val = row.betrag || row.preis;
  if (!val) return "";
  if (typeof val === "string") val = val.replace(",", ".");
  return `${parseFloat(val).toFixed(0)} €`;
}function dateOnlyISO(dt) {
  return (dt || "").slice(0, 10);
}
function isRueckHeuteOder2(b) {
  const today = new Date(); today.setHours(0,0,0,0);
  const rStr = dateOnlyISO(b.rueckflugdatum);
  if (!rStr) return false;
  const r = new Date(rStr);
  if (isNaN(r)) return false;
  r.setHours(0,0,0,0);
  const diffDays = Math.floor((r - today) / (1000*60*60*24));
  return diffDays >= 0 && diffDays <= 2;
}





function PXFooter() {
  return (
    <div
      style={{
        width: "100%",
        background: "linear-gradient(#000,#111)",
        borderTop: "1.5px solid #444",
        marginTop: 0
      }}
    >
      <div
        style={{
          maxWidth: 980,
          minWidth: 980,
          margin: "0 auto",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 28,
          fontWeight: "bold",
          letterSpacing: 0.5,
          fontFamily: "Arial, Helvetica, sans-serif"
        }}
      >
        ValetXpress Fahrerliste
      </div>
    </div>
  );
}


function PXEditFooter({ name }) {
  const label = (`Buchung ${name || ""}`).trim();
  return (
    <div
      style={{
        width: "100%",
        background: "linear-gradient(#000,#111)",
        borderTop: "1.5px solid #444",
        marginTop: 0
      }}
    >
      <div
        style={{
          maxWidth: 980,
          minWidth: 980,
          margin: "0 auto",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 28,
          fontWeight: "bold",
          letterSpacing: 0.5,
          fontFamily: "Arial, Helvetica, sans-serif"
        }}
      >
        {label}
      </div>
    </div>
  );
}


export default function FahrerListe() {
  const [tab, setTab] = useState("heute");
  const [list, setList] = useState([]);
  const [auth, setAuth] = useState("");
  // Beim Einloggen immer zuerst den "heute"-Tab zeigen
  useEffect(() => {
    if (auth) setTab("heute");
  }, [auth]);

  const [login, setLogin] = useState({ user: "", pass: "" });
  const [suchtext, setSuchtext] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sort, setSort] = useState("abflugdatum");
  const [username, setUsername] = useState("");
  // Pro-Benutzer "abgehakt"-Status (nur lokal sichtbar)
  const [doneByUser, setDoneByUser] = useState({});
  useEffect(() => {
    try {
      if (!username) return;
      const key = `vx_done_${username}`;
      const raw = localStorage.getItem(key);
      setDoneByUser(raw ? JSON.parse(raw) : {});
    } catch {}
  }, [username]);
  useEffect(() => {
    try {
      if (!username) return;
      const key = `vx_done_${username}`;
      localStorage.setItem(key, JSON.stringify(doneByUser || {}));
    } catch {}
  }, [username, doneByUser]);

  
  
  
  // Parkxpress: kein Auto-Scale, festes Layout wie Original

// Login aus localStorage wiederherstellen
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem("vx_auth");
      const savedUser = localStorage.getItem("vx_user") || "";
      if (savedAuth) { setAuth(savedAuth); setUsername(savedUser); }
    } catch {}
  }, []);
const [editBuchung, setEditBuchung] = useState(null);
  const [editSaving, setEditSaving] = useState(false);
  // --- Edit-Overlay: responsive Skalierung + Scroll-Lock (verhindert doppelte Scrollbalken) ---
  const designW = 1440;
  const [editScale, setEditScale] = useState(1);
  const [editLeft, setEditLeft] = useState(0);

  useEffect(() => {
    if (!editBuchung) return;
    const calc = () => {
      try {
        const w = window.innerWidth || document.documentElement.clientWidth || 0;
        const scale = Math.max(0.2, Math.min(1, w / designW));
        setEditScale(scale);
        const left = Math.max(0, Math.floor((w - designW * scale) / 2));
        setEditLeft(left);
      } catch {}
    };
    calc();
    window.addEventListener('resize', calc);
    window.addEventListener('orientationchange', calc);
    return () => {
      window.removeEventListener('resize', calc);
      window.removeEventListener('orientationchange', calc);
    };
  }, [editBuchung]);

  useEffect(() => {
    if (!editBuchung) return;
    const body = document.body;
    if (!body) return;
    const prevOverflow = body.style.overflow;
    const prevOverflowX = body.style.overflowX;
    const prevOverflowY = body.style.overflowY;
    try {
      body.style.overflow = 'hidden';
    } catch {}
    return () => {
      try {
        body.style.overflow = prevOverflow || '';
        body.style.overflowX = prevOverflowX || '';
        body.style.overflowY = prevOverflowY || '';
      } catch {}
    };
  }, [editBuchung]);

  const [alleShowAll, setAlleShowAll] = useState(false);
  // Sichtfeld für Notizen ohne Steuer‑Tags (CT/DX)
  const [editBemerkungPlain, setEditBemerkungPlain] = useState("");

  // Wenn eine Buchung zum Bearbeiten geöffnet wird, Notiz-Text ohne [CT:...] und [DX:...] anzeigen
  useEffect(() => {
    try {
      setEditBemerkungPlain(editBuchung ? stripAllTags(editBuchung.bemerkung || "") : "");
    } catch {}
  }, [editBuchung]);


  const rueckModus = tab === "heute" || tab === "2tage";
  // --- Timer/Call state for "Heute"-Tab ---
  const [callTimers, setCallTimers] = useState({});
  // Persistenz der Anruf-Timer über Reloads (global)
  useEffect(() => {
    try {
      const keyUser = "vx_callTimers";
      const raw = localStorage.getItem(keyUser);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          setCallTimers(parsed);
        }
      }
    } catch {}
    // Nur laden, wenn sich der Benutzer ändert / bekannt wird
  }, []);

  useEffect(() => {
    try {
      const keyUser = "vx_callTimers";
      localStorage.setItem(keyUser, JSON.stringify(callTimers));
    } catch {}
  }, [callTimers]);
 // { [buchungId]: startTimestampMs }
  const [timerTick, setTimerTick] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => {
      setTimerTick(t => (t + 1) % 3600); // trigger re-render each second
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  function timerElapsedSec(id) {
    const start = callTimers[id];
    if (!start) return 0;
    const diff = Math.floor((Date.now() - start) / 1000);
    return diff % 3600; // loop every hour
  }
  function formatMMSS(totalSec) {
    const mm = Math.floor(totalSec / 60);
    const ss = totalSec % 60;
    return String(mm).padStart(1, "0") + ":" + String(ss).padStart(2, "0");
  }
  // ---- Universal Timer via [CT:timestamp] Tag in bemerkung ----
  function parseCallTimerFromBem(bem) {
    const m = (bem || "").match(/\[CT:(\d{10,})\]/);
    return m ? parseInt(m[1], 10) : null;
  }
  function stripCallTimer(bem) {
    return (bem || "").replace(/\s*\[CT:\d{10,}\]\s*/g, "").trim();
  }
  function withCallTimer(bem, ts) {
    const base = stripCallTimer(bem);
    return `${base}${base ? " " : ""}[CT:${ts}]`;
  }



  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const encoded = btoa(`${login.user}:${login.pass}`);
      const testUrl = `/api/proxy?path=api/admin/buchungen&sort=abflugdatum&dir=asc&limit=1`;
      const res = await fetch(testUrl, { headers: { Authorization: `Basic ${encoded}` } });
      if (!res.ok) {
        setLoading(false);
        setError(res.status === 401 ? "Benutzername oder Passwort ist falsch." : `Login fehlgeschlagen (HTTP ${res.status}).`);
        return;
      }
      setAuth(encoded);
      setUsername(login.user);
      
      try { localStorage.setItem("vx_auth", encoded); localStorage.setItem("vx_user", login.user); } catch {}
setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Netzwerkfehler beim Login.");
    }
  }
  function handleLogout() {
    setAuth("");
    setUsername("");
    setLogin({ user: "", pass: "" });
  
  try { localStorage.removeItem("vx_auth"); localStorage.removeItem("vx_user"); } catch {}
}

// ---- Universal "Done" via [DX:username] Tag in bemerkung ----
function parseDXOwnerFromBem(bem) {
  const m = (bem || "").match(/\[DX:([^\]]+)\]/);
  return m ? m[1] : null;
}
function stripDXTag(bem) {
  return (bem || "").replace(/\s*\[DX:[^\]]+\]\s*/g, "").trim();
}
function withDXTag(bem, user) {
  const base = stripDXTag(bem);
  return `${base}${base ? " " : ""}[DX:${user}]`;
}
// Helper: alle Steuer-Tags (CT + DX) für die Anzeige ausblenden
function stripAllTags(bem) {
  return stripDXTag(stripCallTimer(bem));
}

// Hilfsfunktionen: vorhandene CT/DX-Tags beibehalten, wenn der sichtbare Notiztext geändert wird
function __extractBemerkungTags(bem) {
  const tags = [];
  const dx = (bem || "").match(/\[DX:[^\]]+\]/);
  if (dx) tags.push(dx[0]);
  const ct = (bem || "").match(/\[CT:\d{10,}\]/);
  if (ct) tags.push(ct[0]);
  return tags.join(" ").trim();
}
function __mergeBemerkungWithTags(plain, originalBem) {
  const tags = __extractBemerkungTags(originalBem);
  const base = (plain || "").trim();
  return tags ? (base ? (base + " " + tags) : tags) : base;
}


  useEffect(() => {
    if (!auth) return;
    setLoading(true);
    let url = `/api/proxy?path=api/admin/buchungen&sort=${sort}&dir=asc`;
    if (suchtext) url += `&suchtext=${encodeURIComponent(suchtext)}`;
    fetch(url, { headers: { Authorization: `Basic ${auth}` } })
      .then(r => r.json())
      .then(data => {
        const rows = data.buchungen || [];
        setList(rows);
        // Universal-CallTimer: aus Bemerkung [CT:...] in lokalen Zustand übernehmen
        const timers = {};
        for (const r of rows) {
          const ts = parseCallTimerFromBem(r.bemerkung);
          if (ts) timers[r.id] = ts;
        }
        setCallTimers(timers);
        setLoading(false);
      })
      .catch(() => { setError("Fehler beim Laden"); setLoading(false); });
  }, [auth, suchtext, sort]);

  useEffect(() => { if (tab !== "alle") setAlleShowAll(false); }, [tab]);
  // Ensure only ONE vertical scrollbar in "Alle Buchungen":
  // We make the window (body) the single scroll container when the "alle" tab is active.
  useEffect(() => {
    try {
      const html = document.documentElement;
      const body = document.body;
      if (!html || !body) return;

      const root = document.getElementById("vx-root");
      const prevHtmlY = html.style.overflowY;
      const prevBodyY = body.style.overflowY;
      const prevRootY = root ? root.style.overflowY : undefined;

      if (tab === "alle") {
        // Hide html scroll, use body scroll, keep inner containers visible
        html.style.overflowY = "hidden";
        body.style.overflowY = "auto";
        if (root) root.style.overflowY = "visible";
      } else {
        // Reset when leaving the tab
        html.style.overflowY = prevHtmlY || "";
        body.style.overflowY = prevBodyY || "";
        if (root && prevRootY !== undefined) root.style.overflowY = prevRootY || "";
      }

      return () => {
        // Cleanup on unmount or tab switch
        try {
          html.style.overflowY = prevHtmlY || "";
          body.style.overflowY = prevBodyY || "";
          if (root && prevRootY !== undefined) root.style.overflowY = prevRootY || "";
        } catch {}
      };
    } catch {}
  }, [tab, alleShowAll]);


  let filtered = list;
  const today = new Date();
  if (tab === "heute") {
  const isoToday = today.toISOString().slice(0, 10);
  filtered = filtered.filter(b => {
    const abflug = b.abflugdatum?.slice(0, 10);
    const rueck = b.rueckflugdatum?.slice(0, 10);
    return abflug === isoToday || rueck === isoToday;
  });

  filtered = filtered.filter(b => !(doneByUser && doneByUser[b.id]));

  
filtered = filtered.filter(b => {
  const owner = parseDXOwnerFromBem(b.bemerkung);
  return !owner || owner === username;
});

} else if (tab === "2tage") {
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(today.getDate() + 2);
  const isoTomorrow = tomorrow.toISOString().slice(0, 10);
  const isoDayAfter = dayAfter.toISOString().slice(0, 10);
  filtered = filtered.filter(b => {
    const abflug = b.abflugdatum?.slice(0, 10);
    const rueck = b.rueckflugdatum?.slice(0, 10);
    return (
      abflug === isoTomorrow || abflug === isoDayAfter ||
      rueck === isoTomorrow || rueck === isoDayAfter
    );
  });
}
  if (tab === "alle" && !alleShowAll) {
    const isoToday = today.toISOString().slice(0, 10);
    filtered = filtered.filter(b => {
      const abflug = (b.abflugdatum || "").slice(0, 10);
      const rueck = (b.rueckflugdatum || "").slice(0, 10);
      return abflug === isoToday || rueck === isoToday;
    });
  }

// Universal: Abgehakte Buchungen [DX:*] nur für den Ersteller sichtbar
if (tab === "alle") {
  filtered = filtered.filter(b => {
    const owner = parseDXOwnerFromBem(b.bemerkung);
    return !owner || owner === username;
  });
}

  if (suchtext) {
    const search = suchtext.toLowerCase();
    filtered = filtered.filter(b =>
      (b.vorname + " " + b.nachname).toLowerCase().includes(search) ||
      (b.kennzeichen || "").toLowerCase().includes(search) ||
      (b.flugnummerHin || "").toLowerCase().includes(search) ||
      (b.flugnummerRueck || "").toLowerCase().includes(search)
    );
  }
  filtered = [...filtered].sort((a, b) => {
    if (sort === "name") {
      const an = (a.nachname + a.vorname).toLowerCase();
      const bn = (b.nachname + b.vorname).toLowerCase();
      if (an < bn) return -1;
      if (an > bn) return 1;
    }
    const a1 = parseDate(a.abflugdatum, a.abflugUhrzeit);
    const b1 = parseDate(b.abflugdatum, b.abflugUhrzeit);
    if (a1 < b1) return -1;
    if (a1 > b1) return 1;
    const a2 = parseDate(a.rueckflugdatum, a.rueckflugUhrzeit);
    const b2 = parseDate(b.rueckflugdatum, b.rueckflugUhrzeit);
    return a2 - b2;
  });

  function cardColor(b) {
  if (tab === "alle") return (doneByUser && doneByUser[b.id]) ? "#666666" : "#e0e0e0";
  // Immer nur mit reinen Datumsanteilen rechnen (Zeitzonen-sicherer)
  const today = new Date(); today.setHours(0,0,0,0);
  const abflug = new Date((b.abflugdatum || "").slice(0,10)); abflug.setHours(0,0,0,0);
  const rueck  = new Date((b.rueckflugdatum || "").slice(0,10)); rueck.setHours(0,0,0,0);

  // Wie bisher: "heute/morgen/übermorgen" relativ zum Abflug -> weiß
  const diffTage = Math.floor((abflug - today) / (1000*60*60*24));
  if (diffTage >= 0 && diffTage <= 2) return "#fff";

  // In Heute- und 2-Tage-Tab nach dem Abflug immer dunkleres Grau,
  // damit die Karte dort konsistent so aussieht wie gewünscht.
  if (tab === "heute" || tab === "2tage") {
    if (today >= abflug) return "#e0e0e0";
  }

  // Fallback (z.B. Tab "Alle"): alte Logik beibehalten
  if (today < abflug) return "#fff";
  if (today >= abflug && today < rueck) return "#eee";
  return "#e0e0e0";
}

  // Gruppierung pro Tab: 
// - Heute: nach dem Datum gruppieren, das HEUTE ist (Rückflug ODER Abflug)
// - 2-Tage: nach dem Datum gruppieren, das in den beiden Tagen liegt (Rückflug bevorzugt, sonst Abflug)
// - Alle: immer nach Abflugdatum
const isoToday = new Date().toISOString().slice(0, 10);
const tomorrow = new Date(); tomorrow.setDate(new Date().getDate() + 1);
const dayAfter = new Date(); dayAfter.setDate(new Date().getDate() + 2);
const isoTomorrow = tomorrow.toISOString().slice(0, 10);
const isoDayAfter = dayAfter.toISOString().slice(0, 10);

function keyForTab(b) {
  const abf = dateOnlyISO(b.abflugdatum);
  const rue = dateOnlyISO(b.rueckflugdatum);
  if (tab === "heute") {
    if (rue === isoToday) return rue;
    return abf;
  } else if (tab === "2tage") {
    if (rue === isoTomorrow || rue === isoDayAfter) return rue;
    return abf;
  } else { // tab === "alle"
    // Gleiche Logik wie im Tab "Heute" (nur in der Standardansicht ohne "Alle Buchungen")
    if (!alleShowAll) {
      if (rue === isoToday) return rue;
      return abf;
    }
    // Bei "Alle Buchungen" weiterhin nach Abflugdatum gruppieren
    return abf;
  }
}

const groupsByDate = filtered.reduce((acc, b) => {
  const key = keyForTab(b);
  if (!key) return acc;
  (acc[key] ||= []).push(b);
  return acc;
}, {});
const dayKeys = Object.keys(groupsByDate).sort();


// --- Helper: Zeit für die jeweilige Tagesgruppe bestimmen (entspricht der Anzeige links) ---
function displayTimeForDay(row, dayKey) {
  // Wenn der Tagesheader dem Rückflugdatum entspricht -> Rückflug-Uhrzeit,
  // sonst (Abflug-Tag) -> Ankunftszeit am Parkplatz
  if (dateOnlyISO(row.rueckflugdatum) === dayKey) {
    return row.rueckflugUhrzeit || "";
  }
  return row.ankunftUhrzeit || "";
}
function timeToMinutes(t) {
  if (!t || typeof t !== "string") return 24*60+1; // fehlende Zeit -> ganz ans Ende
  const m = t.match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return 24*60+1;
  const hh = parseInt(m[1], 10);
  const mm = parseInt(m[2], 10);
  return hh*60 + mm;
}
// Alle Gruppen nach der oben definierten Anzeige-Zeit sortieren (00:00 -> 23:59)
for (const k of Object.keys(groupsByDate)) {
  groupsByDate[k].sort((a, b) => timeToMinutes(displayTimeForDay(a, k)) - timeToMinutes(displayTimeForDay(b, k)));
}


  return (
    <>
      <Head>
        <meta name="viewport" content="width=980, initial-scale=1, maximum-scale=1, user-scalable=no" />
              <style>{`
          html, body, #__next { margin: 0; padding: 0; width: 100%; }
          * { box-sizing: border-box; }
          html, body { overflow-x: hidden; }
          #__next { height: auto !important; overflow-y: visible !important; }
          
        
/* Parkxpress-like viewport rules */
body { -webkit-text-size-adjust: none; -ms-text-size-adjust: none; -webkit-tap-highlight-color: rgba(0,0,0,0); }

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) { .ui-li .ui-btn-text { overflow: visible; } }
`}</style>
      </Head>
      {!auth ? (
        <div id="vx-root"
          style={{
            maxWidth: "100%",
            minWidth: 0,
            background: "#fff",
            fontFamily: "Arial",
            margin: "0 auto",
            minHeight: "100vh",
            overflowX: "hidden"
          }}>
          <PXHeader
            username=""
            tab={tab}
            setTab={setTab}
            suchtext={suchtext}
            setSuchtext={setSuchtext}
            sort={sort}
            setSort={setSort}
            onLogout={() => setLogin({ user: "", pass: "" })} 
            hideControls={false}
          />

          {/* Login-Bereich im grauen Streifen wie im Screenshot */}
          <div style={{ background: "#ededed", borderBottom: "1.5px solid #dedede" }}>
            <div style={{ padding: "24px 28px 30px 28px" }}>
              <div style={{ fontSize: 36, fontWeight: "bold", color: "#333", marginBottom: 16 }}>
                Fahrerliste Login
              </div>
              <form onSubmit={handleLogin} style={{ maxWidth: 420 }}>
                <div style={{ marginBottom: 12 }}>
                  <input
                    type="text"
                    placeholder="Username"
                    value={login.user}
                    onChange={e => setLogin({ ...login, user: e.target.value })}
                    required
                    style={{
                      width: 260,
                      fontSize: 18,
                      padding: "8px 10px",
                      borderRadius: 4,
                      border: "1px solid #999",
                      boxShadow: "inset 0 1px 2px #0001",
                      background: "#fff"
                    }}
                  />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <input
                    type="password"
                    placeholder="Password"
                    value={login.pass}
                    onChange={e => setLogin({ ...login, pass: e.target.value })}
                    required
                    style={{
                      width: 260,
                      fontSize: 18,
                      padding: "8px 10px",
                      borderRadius: 4,
                      border: "1px solid #999",
                      boxShadow: "inset 0 1px 2px #0001",
                      background: "#fff"
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "10px 32px",
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#fff",
                    background: "linear-gradient(#444,#222)",
                    border: "1px solid #333",
                    borderRadius: 24,
                    boxShadow: "inset 0 1px 0 #777, 0 2px 6px #0002",
                    boxSizing: "border-box",
                    cursor: "pointer"
                  }}
                >
                  Login
                </button>
              </form>
              {error && <div style={{ color: "red", marginTop: 12 }}>{error}</div>}
            </div>
          </div>

          <PXFooter />
        </div>
      ) : (
        <div id="vx-root"
          style={{
            maxWidth: 980,
            minWidth: 980,
            background: "#fff",
            fontFamily: "Arial",
            margin: "0 auto",
            minHeight: "100vh",
            overflowX: "hidden"
          }}>
          <PXHeader
            username={username}
            tab={tab}
            setTab={setTab}
            suchtext={suchtext}
            setSuchtext={setSuchtext}
            sort={sort}
            setSort={setSort}
            onLogout={handleLogout}
          />
          <div style={{
            maxWidth: "100%",
            margin: "auto",
            marginTop: "auto",
            overflowX: "hidden"
          }}>

{tab === "alle" && (
  <div style={{ background: "#A6F4A5", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", margin: 0, position: "relative"}}>
    <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
      <input
        type="text"
        value={suchtext || ""}
        onChange={e => setSuchtext(e.target.value)}
        placeholder="Suche nach Kennzeichen"
        style={{ width: 250, fontSize: 18, padding: "7px 15px", borderRadius: 8, border: "1px solid #7cc67c" }}
      />
      <button
        onClick={() => setAlleShowAll(true)}
        style={{ fontSize: 18, padding: "7px 15px", fontWeight: "bold", borderRadius: 8, border: "1px solid #5ea35e", background: "#69d169", cursor: "pointer", width: "fit-content" }}
      >
        Alle Buchungen
      </button>
    </div>
    <span style={{ position: "absolute", right: 180, top: "50%", transform: "translateY(-50%)", fontSize: 20, cursor: "pointer" }} title="Bearbeiten">✏️</span>
  </div>
)}

            <div style={{ padding: 12, color: "#777", fontSize: 18, marginLeft: 10, display: "flex", alignItems: "center", height: 38, lineHeight: "22px" }}>
              {loading ? "Lade Daten..." : ""}
              <b> Anzahl Kunden: {filtered.length}</b>
            </div>

            {
/* NEU: gerenderte Liste mit Datumsbalken je Tag (jQuery Mobile gestylt, Shadow DOM scoped) */
<JQMScope>
  <div className="ui-page ui-body-c ui-overlay-c ui-mobile-viewport">
    <div className="ui-content" role="main">
      {dayKeys.length === 0 && (
        <div style={{ margin: 30, color: '#888', fontSize: 18 }}>Keine Fahrten gefunden.</div>
      )}

      <ul className="ui-listview" data-role="listview" data-inset="false" style={{ margin: 0 }}>
        {dayKeys.map(day => (
          <React.Fragment key={day}>
            <li className="ui-li ui-li-divider ui-bar-b" role="heading" style={{ textShadow: "0 1px 0 #000" }}>
              {day}
            </li>
            {groupsByDate[day].map(row => (
              <li key={row.id} className="ui-btn ui-btn-up-c ui-btn-icon-right ui-li">
                <div className="ui-btn-inner">
                  <div className="ui-btn-text">
                    <h3 className="ui-li-heading" style={{ fontWeight: "bold" }}>
                      {tab === "2tage"
                        ? (<>{(dateOnlyISO(row.rueckflugdatum) === day ? row.rueckflugUhrzeit : row.abflugUhrzeit)} | {row.typ.toUpperCase()} | {row.name} | {row.anzahl_personen ? (row.anzahl_personen + "/ ") : ""}{row.reiseziel} | <a href={`tel:${row.telefon}`} style={{ textDecoration: "underline" }}>{row.telefon}</a></>)
                        : (<>{row.abflugUhrzeit} | {row.typ.toUpperCase()} | {row.name} | {row.anzahl_personen ? (row.anzahl_personen + "/ ") : ""}{row.reiseziel} | <a href={`tel:${row.telefon}`} style={{ textDecoration: "underline" }}>{row.telefon}</a></>)
                      }
                    </h3>
                    <p className="ui-li-desc">
                      <b>Notizen:</b> {stripAllTags(row.bemerkung)}
                    </p>
                    <p className="ui-li-desc">
                      <span>{dateOnlyISO(row.abflugdatum)} {row.abflugUhrzeit} {row.flugnummerHin}</span>
                      {" "}|{" "}
                      <span>{dateOnlyISO(row.rueckflugdatum)} {row.rueckflugUhrzeit} {row.flugnummerRueck}</span>
                    </p>
                  </div>
                  <span className="ui-icon ui-icon-arrow-r ui-icon-shadow"></span>
                </div>
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
    </div>
  </div>
</JQMScope>
}
<PXFooter />

{editBuchung && createPortal((
<div style={{
              position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
              background: "#fff", zIndex: 10000, overflowY: "auto", overscrollBehavior: "contain", WebkitOverflowScrolling: "touch"
            }}>
              <div style={{
                width: 1440, minHeight: "100vh", fontFamily: "Arial", transformOrigin: "top left", transform: `scale(${editScale})`, position: "relative", left: `${editLeft}px`
              }}>
                {/* Header */}
                <div style={{
                  background: "#222", color: "#fff", padding: 10,
                  fontWeight: "bold", fontSize: 22, textAlign: "center",
                  borderRadius: "0 0 8px 8px", position: "relative"
                }}>
                  <button
                    onClick={() => setEditBuchung(null)}
                    style={{
                      position: "absolute", left: 12, top: 7, fontSize: 18,
                      background: "#222", color: "#fff", border: "none", borderRadius: 6,
                      padding: "4px 12px", cursor: "pointer"
                    }}
                  >▲ Zurück</button>
                  Buchung {editBuchung.nachname} bearbeiten
                </div>
                {/* Formular */}
                <form
  onSubmit={async e => {
    e.preventDefault();
    setEditSaving(true);

    // NEU: Datumsfelder ins richtige Format bringen!
    function toDateString(dateString) {
      if (!dateString) return "";
      return dateString.split("T")[0];
    }
    // Kopie von editBuchung bearbeiten:
    const dataToSend = { ...editBuchung };
    ["abflugdatum", "rueckflugdatum", "start", "end"].forEach(field => {
      if (dataToSend[field]) dataToSend[field] = toDateString(dataToSend[field]);
    });

    await fetch(`/api/proxy?path=api/admin/buchung/${editBuchung.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`
      },
      body: JSON.stringify(dataToSend)
    });
    setEditSaving(false);
    setEditBuchung(null);
    // Nach dem Speichern: Liste neu laden
    setLoading(true);
    let url = `/api/proxy?path=api/admin/buchungen&sort=${sort}&dir=asc`;
    if (suchtext) url += `&suchtext=${encodeURIComponent(suchtext)}`;
    fetch(url, { headers: { Authorization: `Basic ${auth}` } })
      .then(r => r.json())
      .then(data => {
        const rows = data.buchungen || [];
        setList(rows);
        const timers = {};
        for (const r of rows) {
          const ts = parseCallTimerFromBem(r.bemerkung);
          if (ts) timers[r.id] = ts;
        }
        setCallTimers(timers);
        setLoading(false);
      });
  }}
                  style={{
                    margin: "0 auto", maxWidth: 1300, background: "#f8f8f8",
                    borderRadius: 14, padding: 18, marginTop: 12
                  }}
                >

                  {/* Alle Felder wie im Screenshot */}
                  <div style={{ marginBottom: 10 }}>
                    <label>Firma:</label><br />
                    <input value={editBuchung.firma || ""} onChange={e => setEditBuchung({ ...editBuchung, firma: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                  </div>
                  <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                    <div style={{ flex: 1 }}>
                      <label>Vorname:</label><br />
                      <input value={editBuchung.vorname || ""} onChange={e => setEditBuchung({ ...editBuchung, vorname: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label>Nachname:</label><br />
                      <input value={editBuchung.nachname || ""} onChange={e => setEditBuchung({ ...editBuchung, nachname: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                    </div>
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>Straße / Hausnr.:</label><br />
                    <input value={editBuchung.strasse || ""} onChange={e => setEditBuchung({ ...editBuchung, strasse: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                  </div>
                  <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                    <div style={{ flex: 1 }}>
                      <label>PLZ:</label><br />
                      <input value={editBuchung.plz || ""} onChange={e => setEditBuchung({ ...editBuchung, plz: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                    </div>
                    <div style={{ flex: 2 }}>
                      <label>Ort:</label><br />
                      <input value={editBuchung.ort || ""} onChange={e => setEditBuchung({ ...editBuchung, ort: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                    </div>
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>Email:</label><br />
                    <input value={editBuchung.email || ""} onChange={e => setEditBuchung({ ...editBuchung, email: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>Telefon:</label><br />
                    <input value={editBuchung.telefon || ""} onChange={e => setEditBuchung({ ...editBuchung, telefon: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>Fahrzeugtyp/Modell:</label><br />
                    <input value={editBuchung.auto || ""} onChange={e => setEditBuchung({ ...editBuchung, auto: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>KFZ-Kennzeichen:</label><br />
                    <input value={editBuchung.kennzeichen || ""} onChange={e => setEditBuchung({ ...editBuchung, kennzeichen: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>Ankft Parkpl.:</label><br />
                    <input value={editBuchung.ankunftUhrzeit || ""} onChange={e => setEditBuchung({ ...editBuchung, ankunftUhrzeit: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                  </div>
                  {/* Abflugdatum und Uhrzeit */}
                  <div style={{ marginBottom: 10 }}>
                    <label>Abflug:</label><br />
                    <input
                      type="date"
                      value={editBuchung.abflugdatum ? editBuchung.abflugdatum.slice(0, 10) : ""}
                      onChange={e => setEditBuchung({ ...editBuchung, abflugdatum: e.target.value })}
                      style={{ fontSize: 20 }}
                    />
                    <input
                      type="time"
                      value={editBuchung.abflugUhrzeit || ""}
                      onChange={e => setEditBuchung({ ...editBuchung, abflugUhrzeit: e.target.value })}
                      style={{ fontSize: 20, marginLeft: 8 }}
                    />
                  </div>
                  {/* Rückflugdatum und Uhrzeit */}
                  <div style={{ marginBottom: 10 }}>
                    <label>Rückflug:</label><br />
                    <input
                      type="date"
                      value={editBuchung.rueckflugdatum ? editBuchung.rueckflugdatum.slice(0, 10) : ""}
                      onChange={e => setEditBuchung({ ...editBuchung, rueckflugdatum: e.target.value })}
                      style={{ fontSize: 20 }}
                    />
                    <input
                      type="time"
                      value={editBuchung.rueckflugUhrzeit || ""}
                      onChange={e => setEditBuchung({ ...editBuchung, rueckflugUhrzeit: e.target.value })}
                      style={{ fontSize: 20, marginLeft: 8 }}
                    />
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>Reiseziel:</label><br />
                    <input value={editBuchung.reiseziel || ""} onChange={e => setEditBuchung({ ...editBuchung, reiseziel: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>Fluggesellschaft:</label><br />
                    <input value={editBuchung.fluggesellschaft || ""} onChange={e => setEditBuchung({ ...editBuchung, fluggesellschaft: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>Flugnr. Abflug:</label><br />
                    <input value={editBuchung.flugnummerHin || ""} onChange={e => setEditBuchung({ ...editBuchung, flugnummerHin: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>Flugnr. Rückflug:</label><br />
                    <input value={editBuchung.flugnummerRueck || ""} onChange={e => setEditBuchung({ ...editBuchung, flugnummerRueck: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>Terminal:</label><br />
                    <input value={editBuchung.terminal || ""} onChange={e => setEditBuchung({ ...editBuchung, terminal: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>Anzahl Personen:</label><br />
                    <input type="number" min="1" max="10" value={editBuchung.anzahl_personen || ""} onChange={e => setEditBuchung({ ...editBuchung, anzahl_personen: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>
                      <input type="checkbox" checked={!!editBuchung.handgepaeck} onChange={e => setEditBuchung({ ...editBuchung, handgepaeck: e.target.checked ? 1 : 0 })} />
                      {" "}Handgepäck
                    </label>
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>Sperrgepäck/Notizen:</label><br />
                    <textarea value={editBemerkungPlain} onChange={e => {
                    const plain = e.target.value;
                    setEditBemerkungPlain(plain);
                    setEditBuchung(prev => ({ ...prev, bemerkung: __mergeBemerkungWithTags(plain, (prev && prev.bemerkung) || "") }));
                  }} style={{ width: "100%", fontSize: 18 }} />
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>Typ (valet/allinclusive):</label><br />
                    <input value={editBuchung.typ || ""} onChange={e => setEditBuchung({ ...editBuchung, typ: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>Preis (€):</label><br />
                    <input value={editBuchung.preis || ""} onChange={e => setEditBuchung({ ...editBuchung, preis: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={editSaving}
                      style={{
                        width: "100%", background: "red", color: "#fff",
                        fontWeight: "bold", fontSize: 20, padding: 10,
                        border: "none", borderRadius: 14, marginTop: 22
                      }}
                    >
                      {editSaving ? "Speichere..." : "Änderung speichern"}
                    </button>
                  </div>
                </form>
                            <PXEditFooter name={`${(editBuchung.vorname || "").trim()} ${(editBuchung.nachname || "").trim()}`.trim()} />

<div style={{
  position: "fixed", inset: 0, background: "#fff",
  zIndex: 10000, overflowY: "auto", WebkitOverflowScrolling: "touch"
}}>
  <div style={{ maxWidth: 980, margin: "0 auto", padding: 16 }}>
    {/* Dialog-Inhalt */}
  </div>
</div>

, (typeof document !== 'undefined' ? document.body : null))}
    </>
  );
}