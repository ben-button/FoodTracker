var btnsdk=function(e){"use strict";function t(e){const t=r.sanitizedInput(e,s.currentFillId);return!!t&&s.observeFields(window,t)}function n(e){const t=r.sanitizedInput(e,s.currentFillId,!0);return!!t&&(o.fillFields(s.addElementsToFields(t)),!0)}function i(e){if(s.startNewSession(e)){const t={url:e.location.href,title:e.document.title},n={fill_id:s.currentFillId,page_info:t,fields:s.removeElementsFromFields(s.currentFields)},i={ios:"BTNJSAutofillFieldsDetected",android:"onAutofillFieldsDetected"},l=e;r.postMessage(l,i,n,"ios")}}const l={info(...e){}},r={generateUUIDv4(){let e=(new Date).getTime();return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){const n=(e+16*Math.random())%16|0;return e=Math.floor(e/16),("x"===t?n:3&n|8).toString(16)})},postMessage(e,t,n,i){const r=t[i];"ios"===i?(l.info(e.webkit),l.info(e.webkit.messageHandlers),l.info(e.webkit.messageHandlers[r]),e.webkit.messageHandlers[r].postMessage(n)):"android"===i&&e[r](JSON.stringify(n))},sanitizedInput(e,t,n=!1){if(!e)return null;const i=e.fill_id;if(!i||i!==t)return null;const{fields:fields}=e;if(!fields||0===fields.length)return null;const l=[],r=fields.length;for(let e=0;e<r;e+=1){const t=fields[e];t.param&&"ignore"!==t.param&&(t.param&&t.pop_id&&(!n||t.value)&&t.input_type.match(/^(text|email)$/)&&l.push({param:t.param,pop_id:t.pop_id,value:t.value}))}return 0===l.length?null:l}},o={getLabelMappings(e){if(!e)return null;const t=e.getElementsByTagName("label"),n=t.length,i={};for(let e=0;e<n;e+=1){const n=t[e].htmlFor;""!==n&&(i[n]=t[e].textContent)}return i},getFields(e,t){const n=[],{forms:forms}=e,i=forms.length;if(0===i)return null;const l=this.getLabelMappings(e);for(let e=0;e<i;e+=1){const{elements:elements}=forms[e],t=elements.length;for(let e=0;e<t;e+=1){const t=elements[e];if("text"===t.type){const e={element:t,pop_id:r.generateUUIDv4(),id:t.id,name:t.name,placeholder:t.placeholder,tag_name:t.tagName,type:t.type,autocomplete:t.autocomplete,autocompletetype:t.autocompletetype,readonly:t.readonly,disabled:t.disabled};l&&(e.label=l[t.id]),n.push(e)}}}return{fillId:t,fields:n}},fillFields(e){const t=e.length;for(let n=0;n<t;n+=1){const{element:element,value:value}=e[n];element&&value&&(element.value=value)}}},s={currentFillId:void 0,currentFields:void 0,submittedFillId:void 0,submittedFields:void 0,_inputListener(e){const t=s.currentFields.length;for(let n=0;n<t;n+=1)s.currentFields[n].element===e.target&&(s.currentFields[n].inputValue=e.target.value,l.info("setting input value",e.target.value,s.currentFields))},startNewSession(e){s.currentFillId=r.generateUUIDv4(),s.currentFields=[],e.removeEventListener("input",s._inputListener);const t=o.getFields(e.document,s.currentFillId);return!(!t||!t.fields||t.fillId!==s.currentFillId||0===t.fields.length)&&(s.currentFields=t.fields,!0)},removeElementsFromFields(e){const t=[],n=e.length;for(let i=0;i<n;i+=1){const n=Object.assign({},e[i]);delete n.element,t.push(n)}return t},addElementsToFields(e){const t=[],n=e.length;for(let i=0;i<n;i+=1){const n=Object.assign({},e[i]),l=s.currentFields.filter(function(e){return e.pop_id===n.pop_id})[0];l&&(n.element=l.element),t.push(n)}return t},observeFields(e,t){const n=[],i=t.length,r=s.currentFields.length;for(let e=0;e<i;e+=1){const i=t[e];for(let o=0;o<r;o+=1){const r=s.currentFields[o];i.pop_id===r.pop_id?(l.info("found a match for field with param: ",i.param),n.push(Object.assign(i,r))):l.info("no match for field to observe with param: ",t[e].param)}}return s.currentFields=n,0!==n.length&&(e.addEventListener("input",s._inputListener),!0)},handleFormSubmission(){if(!s.currentFields||0===s.currentFields.length)return{};s.submittedFillId=s.currentFillId,s.submittedFields=s.currentFields.slice();const e=[],t=s.submittedFields.length;for(let n=0;n<t;n+=1){const t=s.submittedFields[n],{pop_id:pop_id,param:param,inputValue:inputValue}=t;pop_id&&param&&inputValue&&e.push({pop_id:pop_id,param:param,value:inputValue})}return{fill_id:s.submittedFillId,fields:e}}};return window.addEventListener("submit",()=>{const e=s.handleFormSubmission();if(!e||!e.fields||0===e.fields.length)return;const t={ios:"BTNJSAutofillFormSubmitted",android:"onAutofillFormSubmitted"};const n=window;r.postMessage(n,t,e,"ios")}),document.addEventListener("DOMContentLoaded",function(){i(window)}),e.observeFields=t,e.fillFields=n,e}({});
